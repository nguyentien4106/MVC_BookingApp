using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Service;
using BookingApp.Services;
using BookingApp.Services.Implement;

namespace BookingApp
{
    public static class DIConfiguration
    {
        public static IServiceCollection AddDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IAppService<Collaborator, CollaboratorDTO>, AppService<Collaborator, CollaboratorDTO>>();
            services.AddScoped<IAppService<BookingApp.Entities.Service, ServiceDTO>, AppService<BookingApp.Entities.Service, ServiceDTO>>();
            services.AddScoped<IImageService, ImageService>();

            return services;
        }
    }
}
