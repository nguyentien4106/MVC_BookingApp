using BookingApp.Data;
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

        public async Task<Result> GetAll()
        {
            var collaborators = await _context.Collaborators.Include(item => item.BookingInformation)
                .ThenInclude(item => item.CollaboratorServices)
                .ThenInclude(item => item.Service).ToListAsync();
            
            return Result.Success(collaborators);
        }

        public async Task<MemoryStream> GetAvatar()
        {
            return await _imageService.GetAvatars();
        }
    }
}
