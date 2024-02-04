using BookingApp.Admin.Model.DTO;
using BookingApp.Admin.ViewModels;
using BookingApp.Common.Model.Result;

namespace BookingApp.Admin.Services.CollaboratorService
{
    public interface ICollaboratorService
    {
        Task<Result> Add(CollaboratorDTO dto);

        Task<Result> GetAll();

        Task<Result> Update(CollaboratorDTO dto);
    }
}
