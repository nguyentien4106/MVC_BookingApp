using AutoMapper;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Models.Result;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Areas.Admin.Services.CollaboratorService
{
    public class CollaboratorService : ICollaboratorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CollaboratorService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;   
        }

        public async Task<Result> Add(CollaboratorDTO dto)
        {
            var entity = _mapper.Map<Collaborator>(dto);
            _context.Add(entity);
            await _context.SaveChangesAsync();

            return Result.Success(entity);
        }


        public async Task<Result> GetAll()
        {
            var collaborators = await _context.Collaborators.ToListAsync();
            return Result.Success(collaborators);
        }

        public async Task<Result> Update(CollaboratorDTO dto)
        {
            var entity = _mapper.Map<Collaborator>(dto);
            _context.Entry(entity).Property(item => item.Code).IsModified = false;
            _context.Entry(entity).Navigation("BookingInformation").IsModified = false;

            _context.Update(entity);
            await _context.SaveChangesAsync();

            return Result.Success(entity);
        }
    }
}
