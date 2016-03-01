using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Caching;
using System.Web;

namespace LMSE.FindApi
{

    public static class Util
    {
        public static StatisticsRootObject GetStatistics(DateTime from, DateTime to, string lang, int count = 15)
        {
            if (MemoryCache.Default["GetStat_"+lang] != null)
                return MemoryCache.Default["GetStat_" + lang] as StatisticsRootObject;
            string basePath = GetPath();
            //Alla
            //http://localhost:83/secret/Find/proxy/_stats/query/top?from=2016-02-23T09%3A00%3A00Z&to=2016-02-24T09%3A00%3A00Z&interval=day&type=top&size=30&dojo.preventCache=1456301878242
            //Utan träffar
            //http://localhost:83/secret/Find/proxy/_stats/query/top?from=2016-02-23T09%3A00%3A00Z&to=2016-02-24T09%3A00%3A00Z&interval=day&type=null&size=30&dojo.preventCache=1456301993480
            //Utan relevanta träffar (dvs ingen klickad på ...)
            //http://localhost:83/secret/Find/proxy/_stats/query/top?from=2016-02-23T09%3A00%3A00Z&to=2016-02-24T09%3A00%3A00Z&interval=day&type=nullclick&extended=true&size=25&dojo.preventCache=1456302059188
            var requestAll = (HttpWebRequest)WebRequest.Create(basePath + "_stats/query/top?from=" + from.ToString("yyyy-MM-dd") + "&to=" + to.AddDays(1).ToString("yyyy-MM-dd") + "&interval=day&type=top&tags=language%3A"+lang+"&size=" + count + "&dojo.preventCache=" + DateTime.Now.Ticks);
            var responseAll = (HttpWebResponse)requestAll.GetResponse();
            var responseString = new StreamReader(responseAll.GetResponseStream()).ReadToEnd();

            var requestNull = (HttpWebRequest)WebRequest.Create(basePath + "_stats/query/top?from=" + from.ToString("yyyy-MM-dd") + "&to=" + to.AddDays(1).ToString("yyyy-MM-dd") + "&interval=day&type=null&tags=language%3A" + lang + "&size=" + count + "&dojo.preventCache=" + DateTime.Now.Ticks);
            var responseNull = (HttpWebResponse)requestNull.GetResponse();
            var responseStringNull = new StreamReader(responseNull.GetResponseStream()).ReadToEnd();

            var resultAll = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString, typeof(StatisticsRootObject));
            var resultNull = Newtonsoft.Json.JsonConvert.DeserializeObject(responseStringNull, typeof(StatisticsRootObject));
            List<Hit> modifiedHitList = new List<Hit>();
            if (resultAll != null && resultNull != null)
            {
                modifiedHitList = ((StatisticsRootObject)resultAll).hits.Except(((StatisticsRootObject)resultNull).hits).ToList();
                ((StatisticsRootObject)resultAll).hits = modifiedHitList;
            }

            //Insert data cache item with sliding timeout using changeMonitors
            CacheItemPolicy itemPolicy = new CacheItemPolicy();
            itemPolicy.SlidingExpiration = new TimeSpan(0, 5, 0);
            MemoryCache.Default.Add("GetStat_" + lang, resultAll as StatisticsRootObject, itemPolicy, null);

            return resultAll as StatisticsRootObject;
        }

        private static string GetPath()
        {
            EPiServer.Find.Configuration section = ConfigurationManager.GetSection("episerver.find") as EPiServer.Find.Configuration;
            return section.ServiceUrl + section.DefaultIndex + "/";
        }

        public class Hit
        {
            public string query { get; set; }
            public int count { get; set; }
            public string size { get; set; }
        }

        public class StatisticsRootObject
        {
            public string status { get; set; }
            public int total { get; set; }
            public List<Hit> hits { get; set; }
        }
    }

}