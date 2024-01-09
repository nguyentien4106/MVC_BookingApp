using BookingApp.Models.Result;

namespace BookingApp.Services
{
    public interface IHomeService
    {
        Task<Result> GetAll();
    }
}
