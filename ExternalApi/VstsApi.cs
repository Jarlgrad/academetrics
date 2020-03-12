using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Academetrics.ExternalApi
{
    public class VstsApi
    {
        public async Task<RootObject> GetWorkItemById(string id)
        {
            var uri = "https://academicwork.visualstudio.com/AW-IT//_apis/wit/workitems?ids=10759&ids=12308&ids=12434&ids=12376&ids=10766&api-version=4.1";
            var pat = "qrrka7lednr4hoji4pvvg4hvf2ucamu2bhu54xh6zyx4277fzlna";

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(
                        Encoding.ASCII.GetBytes(
                            string.Format("{0}:{1}", "", pat))));

                using (HttpResponseMessage response = await client.GetAsync(uri))
                {
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var noSystem = Regex.Replace(responseBody, @"(System\.)", "");
                    var noMicrosoft = Regex.Replace(noSystem, @"(Microsoft.VSTS.Common\.)", "");
                    var noKanban = Regex.Replace(noMicrosoft, @"(Kanban-\w+\.)", "");
                    var regexReplaced = Regex.Replace(noKanban, @"((\WWEF_\w+\.Column(\.Done)?\W:)(false|true|\W\w+\W|\W\w+( )\w+( )\w+\W),)", "");

                    Console.WriteLine(responseBody);
                    var dynamicResult = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    var result = JsonConvert.DeserializeObject<RootObject>(regexReplaced);
                    //var workItem = BuildWorkItem(result);
                    return result;
                }
            }
            //var response = await client.GetAsync(uri);
            //if (response.IsSuccessStatusCode)
            //{
            //    var rep = await response.Content.ReadAsStringAsync();
            //}
        }

        private object BuildWorkItem(object result)
        {
            throw new NotImplementedException();
        }
    }

    public class Fields
    {
        public string AreaPath { get; set; }
        public string TeamProject { get; set; }
        public string IterationPath { get; set; }
        public string WorkItemType { get; set; }
        public string State { get; set; }
        public string Reason { get; set; }
        public string AssignedTo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ChangedDate { get; set; }
        public string ChangedBy { get; set; }
        public string Title { get; set; }
        public string BoardColumn { get; set; }
        public bool BoardColumnDone { get; set; }
        public int Priority { get; set; }
        public DateTime StateChangeDate { get; set; }
        public DateTime ClosedDate { get; set; }
        public string Severity { get; set; }
        public string ValueArea { get; set; }
        public string ClosedBy { get; set; }
        public DateTime ActivatedDate { get; set; }
        public string ActivatedBy { get; set; }
        public DateTime ResolvedDate { get; set; }
        public string ResolvedBy { get; set; }
        public string ResolvedReason { get; set; }
        public string StackRank { get; set; }
        //public string Column { get; set; }
        //public bool Column.Done { get; set; }
        //public string Column { get; set; }
        //public bool Column.Done { get; set; }
        //public string Column { get; set; }
        //public bool Column.Done { get; set; }
        public string EstimatedSize { get; set; }
        public string Team { get; set; }
        public string OriginofStory { get; set; }
        public DateTime DevStartDate { get; set; }
        public int Daysindevelopment { get; set; }
        public int DaysinTest { get; set; }
        public string ReproSteps { get; set; }
        public string Tags { get; set; }
    }

    public class Value
    {
        public int id { get; set; }
        public int rev { get; set; }
        public Fields fields { get; set; }
        public string url { get; set; }
    }

    public class RootObject
    {
        public int count { get; set; }
        public List<Value> value { get; set; }
    }
}
