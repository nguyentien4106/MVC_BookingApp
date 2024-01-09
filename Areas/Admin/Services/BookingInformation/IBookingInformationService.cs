using BookingApp.DTO;
using BookingApp.Models.Result;

namespace BookingApp.Areas.Admin.Services.BookingInformation
{
    public interface IBookingInformationService
    {
        Task<Result> AddOrUpdate(BookingInformationDTO dto);

        Task<Result> GetByCollaborator(Guid? id);
    }
}
