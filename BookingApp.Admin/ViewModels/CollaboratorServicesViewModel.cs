using BookingApp.Admin.ViewModels;
using BookingApp.Common.Model.DTO;

namespace BookingApp.Models.DTO
{
    public class CollaboratorServicesViewModel
    {
        public Guid Id { get; set; }

        public Guid BookingInformationId { get; set; }

        public Guid ServiceId { get; set; }

        public double? Prices { get; set; }

        public string? AdditionalInformation { get; set; }

        public CollaboratorViewModel? Collaborator { get; set; }

        public ServiceDTO? Service { get; set; }

    }
}
