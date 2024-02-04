using BookingApp.Admin.Model.DTO;
using BookingApp.Common.Model.Result;

namespace BookingApp.Admin.Services.BookingInformation
{
    public interface IBookingInformationService
    {
        Task<Result> AddOrUpdate(BookingInformationDTO dto);

        Task<Result> GetByCollaborator(Guid? id);
    }
}
