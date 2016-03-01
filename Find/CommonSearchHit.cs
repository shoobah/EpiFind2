using System.Collections.Generic;
using EPiServer.Find.UnifiedSearch;

namespace LMSE.FindApi.Find
{
    public class CommonSearchHit : UnifiedSearchHit
    {
        public List<BreadCrumbItem> Breadcrumb { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public bool IsBestBet { get; set; }
        public bool HasBestBetStyle { get; set; }
        public List<List<BreadCrumbItem>> PageBreadcrumbs { get; set; }
        public string Id { get; set; }
    }
}