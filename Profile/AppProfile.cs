using AutoMapper;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Entities.Base;
using BookingApp.Models.Enum;
using BookingApp.Profile.Converter;
using Microsoft.VisualBasic;
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
                .ForMember(item => item.DisplayName, opt => opt.MapFrom(src => src.BookingInformation.DisplayName))
                .ForMember(item => item.IsVeryfied, opt => opt.MapFrom(src => src.BookingInformation.IsVeryfied))
                .ForMember(item => item.Status, opt => opt.MapFrom(src => src.BookingInformation.Status))
                .ForMember(item => item.Information, opt => opt.MapFrom(src => src.BookingInformation.Information))
                .ForMember(item => item.Services, opt => opt.MapFrom(src => src.BookingInformation.Services))
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
                .ForMember(item => item.BookingInformation, opt =>
                {
                    opt.MapFrom(src => new BookingInformation
                    {
                        DisplayName = src.DisplayName,
                        IsVeryfied = true,
                        Status = src.Status,
                        Information = src.Information,
                        Services = src.Services.Select(service => service.ToServiceEntity()).ToList()
                    });
                })
                ;
            CreateMap<BookingApp.Entities.Service, ServiceDTO>().ReverseMap();
        }
    }
}
