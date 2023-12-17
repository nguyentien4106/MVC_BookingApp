using AutoMapper;
using BookingApp.DTO;
using BookingApp.Entities;

namespace BookingApp.Profile
{
    public class AppProfile : AutoMapper.Profile
    {
        public AppProfile()
        {
            CreateMap<Collaborator, CollaboratorDTO>()
                .ForMember(item => item.UserImages, opt => opt.Ignore());

            CreateMap<CollaboratorDTO, Collaborator>()
                .ForMember(item => item.UserImages, opt => opt.Ignore());
        }
    }
}
