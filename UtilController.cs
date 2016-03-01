using System;
using EPiServer.Find;
using EPiServer.Find.Framework;
using LMSE.DataAbstraction.PageTypes;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Castle.Core.Internal;
using EPiServer;
using EPiServer.Core;
using EPiServer.Find.Statistics;
using EPiServer.Framework.Cache;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;

namespace LMSE.FindApi
{

    [EnableCors("*", "*", "*")]
    [RoutePrefix("api")]
    public class UtilController : ApiController
    {
        [Route("autocomplete")]
        [HttpGet]
        public List<string> autocomplete([FromUri] string term)
        {
            var client = SearchClient.Instance;

            var autoComplete = client.Statistics().GetAutocomplete(term);
            var resultList = autoComplete.Hits.Select(x => x.Query.Replace("+"," ").Trim()).Distinct().ToList();

            return resultList;
        }

        [Route("searchpage")]
        [HttpGet]
        public string searchpage([FromUri] string lang)
        {
            var cache = ServiceLocator.Current.GetInstance<ISynchronizedObjectInstanceCache>();

            var returnurl = cache.Get(lang);
            if (returnurl != null) return (string) returnurl;

            var repo = ServiceLocator.Current.GetInstance<IContentRepository>();
            var startpage = repo.Get<StartPageType>(ContentReference.StartPage);
            var findpage = repo.Get<FindPageType>(startpage.SettingsPage.SearchPageReference);

            var friendlyUrl = ServiceLocator.Current.GetInstance<UrlResolver>().GetVirtualPath(findpage.ContentLink, lang);

            cache.Insert(lang, friendlyUrl.GetUrl(), new CacheEvictionPolicy(null, new TimeSpan(0,0,10), CacheTimeoutType.Sliding));
            return friendlyUrl.GetUrl();
        }
    }
}
