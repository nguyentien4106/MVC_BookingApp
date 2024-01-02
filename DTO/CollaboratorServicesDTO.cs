using BookingApp.Entities;

namespace BookingApp.DTO
{
    public class CollaboratorServicesDTO
    {
        public Guid Id { get; set; }

        public Guid BookingInformationId { get; set; }

        public Guid ServiceId { get; set; }

        public double? Prices { get; set; }

        public string? AdditionalInformation { get; set; }

        public CollaboratorDTO? Collaborator { get; set; }

        public ServiceDTO? Service { get; set; }

    }
}
