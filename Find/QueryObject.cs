using EPiServer.Find;
using System;
using System.Collections.Generic;

namespace LMSE.FindApi.Find
{
    public class QueryObject
    {
        public string Text { get; set; }
        public int Take { get; set; }
        public int Skip { get; set; }
        public string Order { get; set; }
        public DateTime MinDate { get; set; }
        public string Type { get; set; }
        public List<string> Extensions { get; set; }
        public string Subsection { get; set; }
        public string Section { get; set; }
        public string Category { get; set; }
        public string BasePageId { get; set; }
        public bool IncludeMediafiles { get; set; }
        public bool IncludeConnectors { get; set; }
        public int SearchRoot { get; set; }
        public string SearchLanguage { get; set; }
    }
}