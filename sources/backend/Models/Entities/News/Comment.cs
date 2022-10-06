using System.ComponentModel.DataAnnotations.Schema;
using Contracts.Domains;

namespace Models.Entities.News
{
    public class Comment : EntityAuditBase<long>
    {
        public string Username { get; set; }

        public string Content { get; set; }

        public NewsPost NewsPost { get; set; }
    }
}
