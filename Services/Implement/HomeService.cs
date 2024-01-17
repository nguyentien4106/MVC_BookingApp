using BookingApp.Data;
using BookingApp.DTO.Home;
using BookingApp.Entities;
using BookingApp.Models.Enum;
using BookingApp.Models.Result;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace BookingApp.Services.Implement
{
    public class HomeService : IHomeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;

        public HomeService(ApplicationDbContext context, IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<Result> Filters(FilterModel model)
        {
            var collaborators = await _context.Collaborators.Include(item => item.BookingInformation)
                .ThenInclude(item => item.CollaboratorServices)
                .ThenInclude(item => item.Service)
                .Where(item => item.BookingInformation.Status == (int)Status.Ready)
                .ToListAsync();

            var filterByAge = collaborators.Where(item => FilterByAge(model, item));
            var filterByAddress = collaborators.Where(item => FilterByAddress(model, item));
            return Result.Success(filterByAddress);
        }

        private static bool FilterByAge(FilterModel model, Collaborator item)
        {
            var age = DateTime.Now.Year - item.BirthDate?.Year;
            return age > model.FromAge && age < model.ToAge;
        }

        private static bool FilterByAddress(FilterModel model, Collaborator item)
        {
            if (model.ProvinceName == "All") return true;

            if (model.DistrictName == "All") return item.Address.Contains(model.ProvinceName);

            return item.Address.Contains(model.ProvinceName) && item.Address.Contains(model.DistrictName);
        }

        public async Task<Result> GetAll()
        {
            var activeCollaborators = await _context.Collaborators.Include(item => item.BookingInformation)
                .ThenInclude(item => item.CollaboratorServices)
                .ThenInclude(item => item.Service)
                .Where(item => item.BookingInformation.Status == (int) Status.Ready)
                .ToListAsync();
            
            return Result.Success(activeCollaborators);
        }

        public async Task<MemoryStream> GetAvatar()
        {
            return await _imageService.GetAvatars();
        }
    }
}
