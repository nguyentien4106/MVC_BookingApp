using BookingApp.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Entities
{
    public class Collaborator : Person
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]   
        public int? Code { get; set; }

        public int V1 { get; set; }

        public int V2 { get; set; }

        public int V3 { get; set; }

        public string? Hobbies { get; set; }

        public List<UserImage>? UserImages { get; set; } = new List<UserImage>();

        public string? School { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? Created { get; set; }
    }
}
