using System.Collections.Generic;
using System.ComponentModel;
using Common.Enums;

namespace Models.Dtos
{
    public class NewsPostUpdateManyDto
    {
        public List<long> NewsPostIds { get; set; }
        public bool? Value { get; set; }
        public MultipleTypeUpdate? Field { get; set; }
    }
}