using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Castle.Components.DictionaryAdapter;
using EPiServer;
using EPiServer.Core;
using EPiServer.Find;
using EPiServer.Find.ClientConventions;
using EPiServer.Find.Cms;
using EPiServer.Find.Framework;
using EPiServer.Find.Framework.Statistics;
using EPiServer.Find.UnifiedSearch;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using LMSE.DataAbstraction.PageTypes;
using LMSE.FindApi.Find;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using EPiServer.Data;
using HtmlAgilityPack;
using System.IO;
using LMSE.DataAbstraction.Media;
using System.Globalization;

namespace LMSE.FindApi
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api")]
    public class ApiController : System.Web.Http.ApiController
    {
        private int searchroot = 0;
        [Route("find")]
        [HttpPost]
        public FindResponse Find([FromBody] QueryObject query)
        {
            //^[a-zA-ZåäöÅÄÖ\s]+\s(\d+|\*)\:\s?\d+$   gävle torp 7:3
            //^[a-zA-ZåäöÅÄÖ(\s|\+)]+(\s|\+)(\d+|\*)\:(\s|\+)?\d+$    gävle+torp+7:3
            if (Regex.Match(query.Text, @"^[a-zA-ZåäöÅÄÖ(\s|\+)]+(\s|\+)(\d+|\*)\:(\s|\+)?\d+$").Success)
            {
                query.Text = "fastighetsbeteckning";
            }
            var client = SearchClient.Instance;
            searchroot = query.SearchRoot;
            client.Conventions.ForInstancesOf<object>().FieldsOfType<string>().StripHtml();

            Language l = Language.Swedish;
            if (query.SearchLanguage != null && query.SearchLanguage == "en")
                l = Language.English;

            var search = client.UnifiedSearchFor(query.Text, l)
                .UsingSynonyms().WithAndAsDefaultOperator()
                .TermsFacetFor(x => x.SearchTitle)
                .Track();
            //ta bara från sökrot men inkludera alla Mediadata 
            search = search.Filter(p => (p as IContent).Ancestors().Match(query.SearchRoot.ToString())).OrFilter(x => x.MatchTypeHierarchy(typeof(MediaData)));

            if (!query.IncludeMediafiles)
            {
                search = search.Filter(x => !x.MatchTypeHierarchy(typeof(MediaData)));
            }
            if (!query.IncludeConnectors)
            {
                search = search.Filter(x => !x.MatchTypeHierarchy(typeof(WebContent)));
            }

            var docResult = search.Filter(x => x.MatchTypeHierarchy(typeof(MediaData))).ApplyBestBets().GetResult();
            var pageResult = search.Filter(x => x.MatchTypeHierarchy(typeof(PageData))).ApplyBestBets().GetResult();

            if (query.Type == "page")
            {
                search = search.Filter(x => x.MatchTypeHierarchy(typeof (PageData)));
            }

            if (query.Type == "doc")
            {
                search = search.Filter(x => x.MatchTypeHierarchy(typeof (MediaData)));
            }

            var hitSpecification = new HitSpecification { HighlightExcerpt = true, HighlightTitle = true };
            var result = search.Skip(query.Skip).Take(query.Take).ApplyBestBets().GetResult(hitSpecification);

            var output = result.Select(GetCommonSearchHit);
            var findresponse = new FindResponse
            {
                Created = DateTime.Now,
                Hits = output.ToList(),
                Total = result.TotalMatching,
                PageTotal = pageResult.TotalMatching,
                DocTotal = docResult.TotalMatching,
                Success = true,
                Tab = query.Type
            };
            return findresponse;
        }

        private CommonSearchHit GetCommonSearchHit(UnifiedSearchHit hit)
        {            
            string outHtml = ModifyExcerpt(hit);
            string url = ModifyUrl(hit);
            var pagebreadcrumbs = GetPageBreadcrumbs(hit);
            return new CommonSearchHit
            {
                Id = GetId(hit),
                HitTypeName = GetHittypename(hit),
                IsBestBet = hit.IsBestBet(),
                HasBestBetStyle = hit.HasBestBetStyle(),
                Excerpt = HttpUtility.HtmlDecode(outHtml),
                PublishDate = hit.PublishDate,
                UpdateDate = hit.UpdateDate,
                Title = HttpUtility.HtmlDecode(hit.Title),
                Url = url,
                Breadcrumb = GetBreadcrumb(hit),
                MetaData = hit.MetaData,
                PageBreadcrumbs = pagebreadcrumbs,
                FileExtension = hit.FileExtension,
                OriginalObjectType = hit.OriginalObjectType
            };
        }

        private string ModifyUrl(UnifiedSearchHit hit)
        {
            if (hit.HitTypeName == "page")
            {
                var original = hit.OriginalObjectGetter?.Invoke() as BasePageType;
                var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
                var parent = repo.Get<IContent>(original.ParentLink);
                if(parent.GetType().BaseType==typeof(ListPageType) && ((ListPageType)parent).ListType.ToLower() == "faq"){
                    var returnurl = UrlResolver.Current.GetUrl(parent.ContentLink);
                    var lasturlfragment = hit.Url.Split('/');
                    returnurl += "#faq:" + lasturlfragment[lasturlfragment.Length - 3];
                    return returnurl;
                }
            }
            return hit.Url;
        }

        private static string ModifyExcerpt(UnifiedSearchHit hit)
        {
            var decoded = (HttpUtility.HtmlDecode(hit.Excerpt));
            //fixes html in excerpt if broken
            HtmlDocument doc = new HtmlDocument();
            MemoryStream myStream = new MemoryStream(System.Text.Encoding.Default.GetBytes(decoded));
            doc.Load(myStream);
            var outHtml = doc.DocumentNode.OuterHtml;
            if (outHtml == "")
                outHtml = "Beskrivning saknas";
            else
            {
                if(outHtml.EndsWith("."))
                    outHtml += "..";
                else
                    outHtml += "...";
            }
            var original = hit.OriginalObjectGetter?.Invoke() as BasePageType;
            if (hit.HitTypeName == "page")
            {
                var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
                var parent = repo.Get<IContent>(original.ParentLink);
                if (((PageData)parent).Name.ToLower() == "nyheter" ||
                    ((PageData)parent).Name.ToLower() == "pressmeddelanden")
                {
                    outHtml = "<span class='searchhitdate'>[ " + original.StartPublish.ToString("yyyy-MM-dd") + " ]</span> " + outHtml;
                }
            }
            return outHtml;
        }

        private string GetId(UnifiedSearchHit hit)
        {
            return hit.GetIdentity()?.ExternalId.ToString() ?? Guid.NewGuid().ToString();
        }

        private List<List<BreadCrumbItem>> GetPageBreadcrumbs(UnifiedSearchHit hit)
        {
            try
            {
                if (hit.MetaData!= null && !hit.MetaData.ContainsKey("contentid_list"))
                    return new List<List<BreadCrumbItem>>();
                var contentIdList = hit.MetaData["contentid_list"];
                if (contentIdList == null) return new List<List<BreadCrumbItem>>();

                var listOfIds = JsonConvert.DeserializeObject<List<int>>(contentIdList.StringValue);
                if (listOfIds == null)
                        return new List<List<BreadCrumbItem>>();

                var tempbreadcrumblist = listOfIds.Select(x => GetBreadCrumbItems(x, searchroot, true)).Distinct().ToList();
                List<List<BreadCrumbItem>> breadcrumbs = new List<List<BreadCrumbItem>>();
                foreach(var bc in tempbreadcrumblist)
                {
                    if (bc.Count > 0)
                    {
                        breadcrumbs.Add(bc);
                    }
                }
                return breadcrumbs;
            }
            catch (NullReferenceException e)
            {
                return new EditableList<List<BreadCrumbItem>>();
            }
        }

        private string GetHittypename(UnifiedSearchHit hit)
        {
            return hit.OriginalObjectType.Name == "WebContent" ? "webcontent" : hit.HitTypeName;
        }

        private static List<BreadCrumbItem> GetBreadcrumb(UnifiedSearchHit hit)
        {
            if (hit.OriginalObjectType.Name == "WebContent") return new List<BreadCrumbItem>();

            var original = hit.OriginalObjectGetter?.Invoke() as BasePageType;

            var bcs = GetBreadCrumbItems(original, true);
            return bcs;
        }

        private static List<BreadCrumbItem> GetBreadCrumbItems(int id, int searchroot, bool includeMe = false)
        {
            var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
            var page = repo.Get<PageData>(new ContentReference(id));
            var anc = repo.GetAncestors(page.ContentLink).Select(s => s.ContentLink.ID);
            if (!anc.Contains(searchroot))
                return new List<BreadCrumbItem>();
            return GetBreadCrumbItems(page, includeMe);
        }

        private static List<BreadCrumbItem> GetBreadCrumbItems(PageData original, bool includeMe = false)
        {
            try
            {
                var bcs = new List<BreadCrumbItem>();
                if (original == null) return bcs;

                var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
                var parent = repo.Get<IContent>(original.ParentLink);
                if (includeMe)
                {
                    parent = repo.Get<IContent>(original.PageLink);
                }
                var first = true;
                while (parent.ContentLink != ContentReference.StartPage &&
                    parent.ContentLink != ContentReference.RootPage)
                {
                    if (first || ((PageData)parent).VisibleInMenu 
                        || ((PageData)parent).Name.ToLower() == "nyheter")
                    {
                        bcs.Add(new BreadCrumbItem
                        {
                            Name = parent.Name,
                            Url = UrlResolver.Current.GetUrl(parent)
                        });
                    }
                    parent = repo.Get<IContent>(parent.ParentLink);
                    first = false;
                }
                bcs.Reverse();
                return bcs;
            }
            catch (Exception)
            {
                return new List<BreadCrumbItem>();
            }
        }
    }
}