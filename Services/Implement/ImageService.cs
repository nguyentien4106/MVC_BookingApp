using AutoMapper;
using BookingApp.Data;
using BookingApp.Entities.Base;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;

namespace BookingApp.Services.Implement
{
    public class ImageService : IImageService
    {
        private readonly ApplicationDbContext _context;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        private List<UserImage> Convert(List<IFormFile> sourceMember)
        {
            var result = new List<UserImage>();

            foreach (var file in sourceMember)
            {
                if (file.Length > 0)
                {
                    using var ms = new MemoryStream();

                    file.CopyTo(ms);
                    result.Add(new Entities.Base.UserImage
                    {
                        Image = ms.ToArray(),
                        Name = file.Name,
                    });
                }
            }

            return result;
        }
        public async Task<bool> AddImageToUser(Guid id, List<IFormFile> images)
        {
            var entities = Convert(images).Select(item => new UserImage
            {
                CollaboratorId = id,
                Image = item.Image,
                Name = item.Name
            });

            await _context.AddRangeAsync(entities);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<MemoryStream> GetUserImagesById(Guid id)
        {

            // Create a memory stream to hold the zip file contents
            MemoryStream memoryStream = new();

            // Create a zip archive
            using (ZipArchive archive = new(memoryStream, ZipArchiveMode.Create, true))
            {
                // Retrieve images from the database
                var images = await _context.UserImages.Where(item => item.CollaboratorId == id).ToListAsync();

                // Add image files to the archive
                int i = 0;
                foreach (var image in images)
                {
                    // Assuming your byte[] property is called "ImageData"
                    var entry = archive.CreateEntry($"{image.Name}_{i}.jpeg");

                    using (var entryStream = entry.Open())
                    {
                        entryStream.Write(image.Image, 0, image.Image.Length);
                        //entryStream.
                    }
                    i++;
                }
            }

            memoryStream.Position = 0;

            return memoryStream;
        }

        public async Task<bool> RemoveUserImagesById(Guid id)
        {
            var images = await _context.UserImages.Where(item => item.CollaboratorId.Equals(id)).ToListAsync();
            
            if(images == null)
            {
                return false;
            }

            _context.RemoveRange(images);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
