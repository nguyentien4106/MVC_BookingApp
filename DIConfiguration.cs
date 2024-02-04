using BookingApp.Admin.Model.DTO;
using BookingApp.Admin.Services.CollaboratorService;
using BookingApp.Common.Entities;
using BookingApp.Common.Model.DTO;
using BookingApp.Common.Service;
using BookingApp.Common.Services;
using BookingApp.Common.Services.Implement;
using BookingApp.Services;
using BookingApp.Services.Implement;

namespace BookingApp
{
    public static class DIConfiguration
    {
        public static IServiceCollection AddDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IAppService<Collaborator, CollaboratorDTO>, AppService<Collaborator, CollaboratorDTO>>();
            services.AddScoped<IAppService<Service, ServiceDTO>, AppService<Service, ServiceDTO>>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IHomeService, HomeService>();
            services.AddScoped<ICollaboratorService, CollaboratorService>();

            return services;
        }
    }
}
