using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BookingApp.Common.Services.Implement;
using BookingApp.Common.Data;
using BookingApp.Common.Model.Result;
using BookingApp.Admin.ViewModels;

namespace BookingApp.Admin.Services.BookingInformation
{
    public class BookingInformationService : IBookingInformationService
    {
        private readonly AppService<BookingApp.Common.Entities.BookingInformation, BookingInformationViewModel> _service;
        private readonly ApplicationDbContext _context;

        public BookingInformationService(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<BookingApp.Common.Entities.BookingInformation, BookingInformationViewModel>(mapper, context);
            _context = context;
        }

        public async Task<Result> AddOrUpdate(BookingInformationViewModel dto)
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
