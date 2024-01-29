using AutoMapper;
using BookingApp.Common.Entities.Base;

namespace BookingApp.Profile.Converter
{
    public class FormFilesToUserImage : IValueConverter<List<IFormFile>, List<UserImage>>
    {
        public List<UserImage> Convert(List<IFormFile> sourceMember, ResolutionContext context)
        {
            var result = new List<UserImage>();

            foreach (var file in sourceMember)
            {
                if (file.Length > 0)
                {
                    using var ms = new MemoryStream();

                    file.CopyTo(ms);
                    result.Add(new UserImage
                    {
                        Image = ms.ToArray(),
                        Name = file.Name,
                    });
                }
            }

            return result;
        }

    }
}
