using BookingApp.Admin.Services.CollaboratorService;
using BookingApp.Entities;
using BookingApp.Models.DTO;
using BookingApp.Service;
using BookingApp.Services;
using BookingApp.Services.Implement;

namespace BookingApp
{
    public static class DIConfiguration
    {
        public static IServiceCollection AddDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IAppService<Collaborator, CollaboratorViewModel>, AppService<Collaborator, CollaboratorViewModel>>();
            services.AddScoped<IAppService<BookingApp.Entities.Service, ServiceDTO>, AppService<BookingApp.Entities.Service, ServiceDTO>>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IHomeService, HomeService>();
            services.AddScoped<ICollaboratorService, CollaboratorService>();

            return services;
        }
    }
}
