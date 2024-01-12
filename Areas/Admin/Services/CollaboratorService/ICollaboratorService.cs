using BookingApp.DTO;
using BookingApp.Models.Result;

namespace BookingApp.Areas.Admin.Services.CollaboratorService
{
    public interface ICollaboratorService
    {
        Task<Result> Add(CollaboratorDTO dto);

        Task<Result> GetAll();

        Task<Result> Update(CollaboratorDTO dto);
    }
}
