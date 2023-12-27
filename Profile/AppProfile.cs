using AutoMapper;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Entities.Base;
using BookingApp.Profile.Converter;
using System.Collections;

namespace BookingApp.Profile
{
    public class AppProfile : AutoMapper.Profile
    {
        public AppProfile()
        {
            CreateMap<Collaborator, CollaboratorDTO>()
                .ForMember(item => item.UserImages, opt =>
                {
                    opt.MapFrom(item => item.UserImages);
                    opt.ConvertUsing(new UserImageToFormFile());
                })
                .ForMember(item => item.BirthDate, opt =>
                {
                    opt.MapFrom(item => item.BirthDate);
                    opt.ConvertUsing(new DateTimeToString());
                })
                ;

            CreateMap<CollaboratorDTO, Collaborator>()
                .ForMember(item => item.UserImages, opt =>
                {
                    opt.MapFrom(item => item.UserImages);
                    opt.ConvertUsing(new FormFilesToUserImage());
                })
                .ForMember(item => item.BirthDate, opt =>
                {
                    opt.MapFrom(item => item.BirthDate);
                    opt.ConvertUsing(new StringToDateTime());
                })
                ;
            CreateMap<BookingApp.Entities.Service, ServiceDTO>().ReverseMap();
        }
    }
}
