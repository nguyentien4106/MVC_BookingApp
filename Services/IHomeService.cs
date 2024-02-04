using BookingApp.Common.Model.Result;
using BookingApp.ViewModels;


namespace BookingApp.Services
{
    public interface IHomeService
    {
        Task<Result> GetAll();

        Task<MemoryStream> GetAvatar();

        Task<Result> Filters(FilterViewModel model);
    }
}
