using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Entities
{
    public class CollaboratorServices
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Guid ServiceId { get; set; }

        public Collaborator? Collaborator { get; set; }

        public Service? Service { get; set; }
    }
}
