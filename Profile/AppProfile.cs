using BookingApp.Common.Entities;
using BookingApp.Models.DTO;
using BookingApp.Profile.Converter;

namespace BookingApp.Profile
{
    public class AppProfile : AutoMapper.Profile
    {
        public AppProfile()
        {
            CreateMap<Collaborator, CollaboratorViewModel>()
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
                .ForMember(item => item.DisplayName, opt => opt.MapFrom(src => src.BookingInformation.DisplayName))
                .ForMember(item => item.IsVeryfied, opt => opt.MapFrom(src => src.BookingInformation.IsVeryfied))
                .ForMember(item => item.Status, opt => opt.MapFrom(src => src.BookingInformation.Status))
                .ForMember(item => item.Information, opt => opt.MapFrom(src => src.BookingInformation.Information))
                ;

            CreateMap<CollaboratorViewModel, Collaborator>()
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
                .ForMember(item => item.BookingInformation, opt =>
                {
                    opt.MapFrom(src => new BookingInformation
                    {
                        DisplayName = src.DisplayName,
                        IsVeryfied = true,
                        Status = src.Status,
                        Information = src.Information,
                    });
                })
                ;


            CreateMap<Service, ServiceDTO>().ReverseMap();
            CreateMap<CollaboratorServices, CollaboratorServicesViewModel>();
            CreateMap<CollaboratorServicesViewModel, CollaboratorServices>()
                .ForMember(item => item.Collaborator, opt=> opt.Ignore())
                .ForMember(item => item.Service, opt=> opt.Ignore())
                ;
            CreateMap<BookingInformation, BookingInformationViewModel>().ReverseMap();
        }
    }
}
