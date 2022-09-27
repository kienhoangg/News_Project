using System;
using News.API.Middlewares;

namespace News.API.Extensions
{
    public static class ApplicationExtensions
    {
        public static void UseInfrastructure(
            this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();
            // app.UseHttpsRedirection(); //for production only

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }
    }
}

