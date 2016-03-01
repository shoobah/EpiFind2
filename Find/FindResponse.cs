using System;
using System.Collections.Generic;
using EPiServer.Find.UnifiedSearch;

namespace LMSE.FindApi.Find
{
    public class FindResponse
    {
        public bool Success { get; set; }
        public string StatusMessage { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public int Total { get; set; }
        public int Taken { get; set; }
        public int Skipped { get; set; }
        public IEnumerable<CommonSearchHit> Hits { get; set; }
        public int PageTotal { get; set; }
        public int DocTotal { get; set; }
    }
}