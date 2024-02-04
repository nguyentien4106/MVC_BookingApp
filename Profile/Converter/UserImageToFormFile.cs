using AutoMapper;
using BookingApp.Common.Entities.Base;

namespace BookingApp.Profile.Converter
{
    public class UserImageToFormFile : IValueConverter<List<UserImage>, List<IFormFile>>
    {
        public List<IFormFile> Convert(List<UserImage> sourceMember, ResolutionContext context)
        {
            var result = new List<IFormFile>();

            foreach (var file in sourceMember)
            {
                var stream = new MemoryStream(file.Image);
                result.Add(new FormFile(stream, 0, file.Image.Length, file.Name ?? "name", file.Id.ToString()));
            }

            return result;
        }
    }
}
