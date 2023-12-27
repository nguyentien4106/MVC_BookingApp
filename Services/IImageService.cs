using BookingApp.Entities.Base;

namespace BookingApp.Services
{
    public interface IImageService
    {
        Task<MemoryStream> GetUserImagesById(Guid Id);

        Task<bool> RemoveUserImagesById(Guid Id);

        Task<bool> AddImageToUser(Guid id, List<IFormFile> images);
    }
}
