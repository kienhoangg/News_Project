using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    public class DocumentDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime PublishedDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string FilePath { get; set; }
    }
}

