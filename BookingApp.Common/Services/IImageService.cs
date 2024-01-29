using BookingApp.Common.Entities.Base;
using Microsoft.AspNetCore.Http;

namespace BookingApp.Common.Services
{
    public interface IImageService
    {
        Task<MemoryStream> GetUserImagesById(Guid Id);

        Task<bool> RemoveUserImagesById(Guid Id);

        Task<bool> AddImageToUser(Guid id, List<IFormFile> images);

        Task<MemoryStream> GetAvatars();
    }
}
