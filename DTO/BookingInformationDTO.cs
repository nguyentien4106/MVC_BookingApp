using BookingApp.Entities;

namespace BookingApp.DTO
{
    public class BookingInformationDTO
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public ICollection<CollaboratorServicesDTO>? CollaboratorServices { get; set; }

        public string? DisplayName { get; set; }

        public bool? IsVeryfied { get; set; }

        public int? Status { get; set; }

        public string? Information { get; set; }
    }
}
