using AutoMapper;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Entities.Base;
using System.Collections;

namespace BookingApp.Profile
{
    public class CollaboratorDTOConverter : IValueConverter<List<IFormFile>, List<UserImage>>
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
                    result.Add(new Entities.Base.UserImage
                    {
                        Image = ms.ToArray(),
                    });
                }
            }

            return result;
        }
       
    }

    public class CollaboratorConverter : IValueConverter<List<UserImage>, List<IFormFile>>
    {
        public List<IFormFile> Convert(List<UserImage> sourceMember, ResolutionContext context)
        {
            var result = new List<IFormFile>();

            foreach(var file in sourceMember)
            {
                var stream = new MemoryStream(file.Image);
                result.Add(new FormFile(stream, 0, file.Image.Length, "name", "fileName"));
            }

            return result;
        }
    }
    public class AppProfile : AutoMapper.Profile
    {
        public AppProfile()
        {
            CreateMap<Collaborator, CollaboratorDTO>()
                .ForMember(item => item.UserImages, opt =>
                {
                    opt.MapFrom(item => item.UserImages);
                    opt.ConvertUsing(new CollaboratorConverter());
                });

            CreateMap<CollaboratorDTO, Collaborator>()
                .ForMember(item => item.UserImages, opt =>
                {
                    opt.MapFrom(item => item.UserImages);
                    opt.ConvertUsing(new CollaboratorDTOConverter());
                });
        }
    }
}
