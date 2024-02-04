using AutoMapper;
using BookingApp.Admin.Model.DTO;
using BookingApp.Admin.ViewModels;
using BookingApp.Common.Data;
using BookingApp.Common.Entities;
using BookingApp.Common.Model.Result;
using BookingApp.Common.Services;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Admin.Services.CollaboratorService
{
    public class CollaboratorService : ICollaboratorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public CollaboratorService(ApplicationDbContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;   
            _imageService = imageService;
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
            var updateValue = _mapper.Map<Collaborator>(dto);
            var entity = await _context.Collaborators.SingleOrDefaultAsync(p => p.Id == dto.Id);
            entity.LastName = dto.LastName;
            entity.FirstName = dto.FirstName;
            entity.Title = dto.Title;
            DateTime.TryParse(dto.BirthDate, out DateTime birthDate);
            entity.BirthDate = birthDate;
            entity.Description = dto.Description;
            entity.PhoneNumber = dto.PhoneNumber;
            entity.Address = dto.Address;
            entity.V1 = dto.V1;
            entity.V2 = dto.V2;
            entity.V3 = dto.V3;
            entity.Hobbies = dto.Hobbies;
            entity.School = dto.School;
            await _context.SaveChangesAsync();

            _context.Entry(entity).Property(item => item.Code).IsModified = false;
            _context.Entry(entity).Reference(p => p.BookingInformation).Load();
            _context.Entry(entity.BookingInformation).State = EntityState.Unchanged;
            await _context.SaveChangesAsync();

            await _imageService.RemoveUserImagesById(entity.Id);
            await _imageService.AddImageToUser(entity.Id, dto.UserImages);

            return Result.Success(entity);
        }
    }
}
