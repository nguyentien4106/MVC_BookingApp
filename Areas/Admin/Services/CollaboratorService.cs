using AutoMapper;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Services.Implement;

namespace BookingApp.Areas.Admin.Services
{
    public class CollaboratorService : AppService<Collaborator, CollaboratorDTO>
    {
        public CollaboratorService(IMapper mapper, ApplicationDbContext dbContext) : base(mapper, dbContext)
        {
        }
    }
}
