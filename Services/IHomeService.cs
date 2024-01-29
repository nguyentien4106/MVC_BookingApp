using BookingApp.Models.DTO.Home;
using BookingApp.Models.Result;
using BookingApp.Models.ViewModel;

namespace BookingApp.Services
{
    public interface IHomeService
    {
        Task<Result> GetAll();

        Task<MemoryStream> GetAvatar();

        Task<Result> Filters(FilterModel model);
    }
}
