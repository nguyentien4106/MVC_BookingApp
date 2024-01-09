using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Entities
{
    public class BookingInformation
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator? Collaborator { get; set; } = null!;

        public ICollection<CollaboratorServices>? CollaboratorServices { get; set; }

        public string? DisplayName { get; set; }

        public bool? IsVeryfied { get; set; }

        public int? Status { get; set; }
        
        public string? Information { get; set; }

    }
}
