using Common.Logging;
using News.API.Extensions;
using News.API.Persistence;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog(Serilogger.Configure);
Log.Information("Start News API up");

try
{
    builder.Host.AddAppConfigurations();
    // Add services to the container.
    builder.Services.AddInfrastructure(builder.Configuration);

    var app = builder.Build();
    app.UseInfrastructure();

    app.MigrateDatabase<NewsContext>((
        context, _) =>
    {
        NewsContextSeed.SeedProductAsync(
            context,
            Log.Logger)
                          .Wait();
    })
       .Run();
}
catch (Exception ex)
{
    var type = ex.GetType().Name;
    if (type.Equals("StopTheHostException", StringComparison.Ordinal))
        throw;

    Log.Fatal(ex, $"Unhandled exception: {ex.Message}");
}
finally
{
    Log.Information("Shut down News API complete");
    Log.CloseAndFlush();
}