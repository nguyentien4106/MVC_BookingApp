using AutoMapper;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Models.Result;
using BookingApp.Entities;
using BookingApp.Services.Implement;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Areas.Admin.Services.BookingInformation
{
    public class BookingInformationService : IBookingInformationService
    {
        private readonly BookingApp.Services.Implement.AppService<BookingApp.Entities.BookingInformation, BookingInformationDTO> _service;
        private readonly ApplicationDbContext _context;

        public BookingInformationService(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<BookingApp.Entities.BookingInformation, BookingInformationDTO>(mapper, context);
            _context = context;
        }

        public async Task<Result> AddOrUpdate(BookingInformationDTO dto)
        {
            var booking = await _context.BookingInformations.Where(item => item.CollaboratorId == dto.CollaboratorId).FirstOrDefaultAsync();

            if (booking == null)
            {
                return Result.Fail("Booking is not exists");
            }

            booking.Status = dto.Status;
            booking.DisplayName = dto.DisplayName;
            booking.Information = dto.Information;
            booking.IsVeryfied = true;

            booking.CollaboratorServices = dto.CollaboratorServices;

            await _context.SaveChangesAsync();

            return Result.Success(booking);
        }

        public async Task<Result> GetByCollaborator(Guid? id)
        {
            var bookings = await _service.GetAll(item => item.CollaboratorId == id, "CollaboratorServices");
            var result = bookings.FirstOrDefault();

            return result == null ? Result.Fail("No booking information found") : Result.Success(result);
        }
    }
}
