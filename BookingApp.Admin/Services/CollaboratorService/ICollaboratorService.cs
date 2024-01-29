using BookingApp.Admin.ViewModels;
using BookingApp.Common.Model.Result;

namespace BookingApp.Admin.Services.CollaboratorService
{
    public interface ICollaboratorService
    {
        Task<Result> Add(CollaboratorViewModel dto);

        Task<Result> GetAll();

        Task<Result> Update(CollaboratorViewModel dto);
    }
}
