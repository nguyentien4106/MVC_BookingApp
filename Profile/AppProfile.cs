using AutoMapper;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Entities.Base;

namespace BookingApp.Profile
{
    public class FormFileConverter : ITypeConverter<List<IFormFile>, List<UserImage>>
    {
        public List<UserImage> Convert(List<IFormFile> source, List<UserImage> destination, ResolutionContext context)
        {
            var result = new List<UserImage>();

            foreach (var file in source)
            {
                if (file.Length > 0)
                {
                    using var ms = new MemoryStream();

                    file.CopyTo(ms);
                    result.Add(new Entities.Base.UserImage
                    {
                        Image = ms.ToArray(),
                    });
                }
            }

            return result;
        }

    }
    public class AppProfile : AutoMapper.Profile
    {
        public AppProfile()
        {
            CreateMap<Collaborator, CollaboratorDTO>()
                .ForMember(item => item.UserImages, opt => opt.Ignore());

            CreateMap<CollaboratorDTO, Collaborator>()
                .ForMember(item => item.UserImages, opt => opt.ConvertUsing(new FormFileConverter()));
        }
    }
}
