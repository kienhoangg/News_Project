using System.Reflection;
using System.Text.Json.Serialization;
using Common.Interfaces;
using FluentValidation;
using Infrastructure.Implements;
using Microsoft.EntityFrameworkCore;
using News.API.Interfaces;
using News.API.Persistence;
using News.API.Services;

namespace News.API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection
        AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler =
                        ReferenceHandler.IgnoreCycles;
                });
            services.AddCors();
            services
                .Configure<RouteOptions>(options =>
                    options.LowercaseUrls = true);

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.ConfigureProductDbContext (configuration);
            services.AddInfrastructureServices();
            services.AddAutoMapper(cfg => cfg.AddProfile(new MappingFile()));
            return services;
        }

        private static IServiceCollection
        ConfigureProductDbContext(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            var connectionString =
                configuration.GetConnectionString("DefaultConnectionString");

            services
                .AddDbContext<NewsContext>(options =>
                {
                    options
                        .UseSqlServer(configuration
                            .GetConnectionString("DefaultConnectionString"),
                        builder =>
                            builder
                                .MigrationsAssembly(typeof (NewsContext)
                                    .Assembly
                                    .FullName));
                });
            return services;
        }

        private static IServiceCollection
        AddInfrastructureServices(this IServiceCollection services)
        {
            return services
                .AddScoped(typeof (IRepositoryBase<,,>),
                typeof (RepositoryBase<,,>))
                .AddScoped(typeof (IUnitOfWork<>), typeof (UnitOfWork<>))
                .AddScoped(typeof (ISerializeService),
                typeof (SerializeService))
                .AddScoped(typeof (IDocumentService), typeof (DocumentService))
                .AddScoped(serviceType: typeof (ICategoryNewsService),
                typeof (CategoryNewsService))
                .AddScoped(serviceType: typeof (IFieldNewsService),
                typeof (FieldNewsService))
                .AddScoped(serviceType: typeof (ISourceNewsService),
                typeof (SourceNewsService))
                .AddScoped(serviceType: typeof (INewsPostService),
                typeof (NewsPostService))
                .AddScoped(serviceType: typeof (ICollaboratorService),
                typeof (CollaboratorService));
        }
    }
}
