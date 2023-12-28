namespace BookingApp.Entities
{
    public class BookingInformation
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public List<Service>? Services { get; set; }

        public double? Price { get; set; }

        public string? DisplayName { get; set; }

        public bool? IsVeryfied { get; set; }

        public int? Status { get; set; }
        
        public string? Information { get; set; }

    }
}
