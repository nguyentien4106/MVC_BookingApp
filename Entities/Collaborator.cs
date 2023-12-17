using BookingApp.Entities.Base;

namespace BookingApp.Entities
{
    public class Collaborator : Person
    {
        public int Code { get; set; }

        public int V1 { get; set; }

        public int V2 { get; set; }

        public int V3 { get; set; }

        public string? Hobbies { get; set; }

        public List<UserImage>? UserImages { get; set; } = new List<UserImage>();

        public string? School { get; set; }

    }
}
