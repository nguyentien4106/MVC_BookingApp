using BookingApp.Common.Entities;

namespace BookingApp.Admin.Model.DTO
{
    public class BookingInformationDTO
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public ICollection<CollaboratorServices>? CollaboratorServices { get; set; }

        public string? DisplayName { get; set; }

        public bool? IsVeryfied { get; set; }

        public int? Status { get; set; }

        public string? Information { get; set; }
    }
}
