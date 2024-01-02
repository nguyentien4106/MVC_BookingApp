using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Entities
{
    public class CollaboratorServices
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid BookingInformationId { get; set; }

        public Guid ServiceId { get; set; }

        public double? Prices { get; set; } 

        public string? AdditionalInformation { get; set; }

        public Collaborator? Collaborator { get; set; }

        public Service? Service { get; set; }
    }
}
