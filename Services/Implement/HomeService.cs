using BookingApp.Data;
using BookingApp.Models.Result;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Services.Implement
{
    public class HomeService : IHomeService
    {
        private readonly ApplicationDbContext _context;
        public HomeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result> GetAll()
        {
            var collaborators = await _context.Collaborators.Include(item => item.BookingInformation).ThenInclude(item => item.CollaboratorServices).ToListAsync();

            return Result.Success(collaborators);
        }
    }
}
