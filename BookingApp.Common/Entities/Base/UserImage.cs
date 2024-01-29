using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Common.Entities.Base
{
    public class UserImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } 

        public Guid CollaboratorId { get; set; }

        public byte[]? Image { get; set; }

        public string? Name { get; set; }

        public Collaborator? Collaborator { get; set; } 
    }
}
