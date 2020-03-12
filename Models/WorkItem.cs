using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Academetrics.Models
{
    public class WorkItem
    {
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
            public string Team { get; set; }
            public string OriginofStory { get; set; }
            public DateTime DevStartDate { get; set; }
            public int Daysindevelopment { get; set; }
            public int DaysinTest { get; set; }
            public string ReproSteps { get; set; }
            public string Tags { get; set; }
        }

        public class Root
        {
            public int id { get; set; }
            public int rev { get; set; }
            public Fields fields { get; set; }
            public string url { get; set; }
        }
    }
}
