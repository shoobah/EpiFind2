using EPiServer.Find;
using LMSE.FindApi.Find.RegexFilter;

namespace LMSE.FindApi.Find
{
    public static class Extensions
    {
        public static DelegateFilterBuilder MatchRegex(this string value, string regex)
        {
            return new DelegateFilterBuilder(field => new global::LMSE.FindApi.Find.RegexFilter.RegexFilter(field, regex));
        }
        public static DelegateFilterBuilder MatchNotRegex(this string value, string regex)
        {
            return new DelegateFilterBuilder(field => new NotRegexFilter(field, regex));
        }
    }
}