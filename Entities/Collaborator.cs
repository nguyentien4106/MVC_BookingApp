using BookingApp.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace BookingApp.Entities
{
    public class Collaborator : Person
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int Code { get; set; }

        public int V1 { get; set; }

        public int V2 { get; set; }

        public int V3 { get; set; }

        public string? Hobbies { get; set; }

        public List<UserImage>? UserImages { get; set; } = new List<UserImage>();

        public string? School { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? Created { get; set; }

        public BookingInformation? BookingInformation { get; set; }

        [NotMapped]
        public string? Avatar { get; set; }
    }
}
