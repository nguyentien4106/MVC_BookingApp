using BookingApp.Admin.ViewModels;
using BookingApp.Common.Model.Result;

namespace BookingApp.Admin.Services.BookingInformation
{
    public interface IBookingInformationService
    {
        Task<Result> AddOrUpdate(BookingInformationViewModel dto);

        Task<Result> GetByCollaborator(Guid? id);
    }
}
