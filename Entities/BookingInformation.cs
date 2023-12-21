namespace BookingApp.Entities
{
    public class BookingInformation
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public List<Service>? Services { get; set; }
    }
}
