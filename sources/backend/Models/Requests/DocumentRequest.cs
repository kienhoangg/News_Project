using System;
using Infrastructure.Shared.SeedWork;
using Models.Entities;

namespace Models.Requests
{
    public class DocumentRequest : ApiResult<Document>
    {
        public string Keyword { get; set; }
        public DateTime? PublishedDate { get; set; }
        public DateTime? ExpiredDate { get; set; }

    }
}

