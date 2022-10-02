using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Contracts.Domains;

namespace Models.Entities
{
    public class Document : EntityAuditBase<long>
    {
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string Name { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime PublishedDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime ExpiredDate { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string FilePath { get; set; }
    }
}
