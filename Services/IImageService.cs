namespace BookingApp.Services
{
    public interface IImageService
    {
        Task<MemoryStream> GetUserImagesById(Guid Id);

        Task<bool> RemoveUserImagesById(Guid Id);
    }
}
