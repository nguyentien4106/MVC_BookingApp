namespace BookingApp.Entities.Base
{
    public class Person
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set;}

        public string? Title { get; set; }

        public DateTime? BirthDate { get; set; }

        public string? Description { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

    }
}
