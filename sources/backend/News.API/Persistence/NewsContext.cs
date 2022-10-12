using System.Reflection;
using Contracts.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace News.API.Persistence
{
    public class NewsContext : DbContext
    {
        public NewsContext(DbContextOptions options) :
            base(options)
        {
        }

        public DbSet<CategoryNews> CategoryNews { get; set; }

        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<FieldNews> FieldNews { get; set; }

        public DbSet<NewsPost> NewsPosts { get; set; }

        public DbSet<SourceNews> SourceNews { get; set; }

        public DbSet<Document> Documents { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<DocumentField> DocumentFields { get; set; }
        public DbSet<DocumentDepartment> DocumentDepartments { get; set; }
        public DbSet<DocumentSignPerson> DocumentSignPersons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfigurationsFromAssembly(Assembly
                    .GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }

        public override Task<int>
        SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var modified =
                ChangeTracker
                    .Entries()
                    .Where(e =>
                        e.State == EntityState.Modified ||
                        e.State == EntityState.Added ||
                        e.State == EntityState.Deleted);

            foreach (var item in modified)
                switch (item.State)
                {
                    case EntityState.Added:
                        if (item.Entity is IDateTracking addedEntity)
                        {
                            addedEntity.CreatedDate = DateTime.UtcNow;
                            item.State = EntityState.Added;
                        }

                        break;
                    case EntityState.Modified:
                        Entry(item.Entity).Property("Id").IsModified = false;
                        if (item.Entity is IDateTracking modifiedEntity)
                        {
                            modifiedEntity.LastModifiedDate = DateTime.UtcNow;
                            item.State = EntityState.Modified;
                        }

                        break;
                }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
