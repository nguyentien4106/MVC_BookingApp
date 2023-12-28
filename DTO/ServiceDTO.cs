namespace BookingApp.DTO
{
    public class ServiceDTO
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public double? Price { get; set; }

        public string? Description { get; set; }

        public Entities.Service ToServiceEntity()
        {
            return new Entities.Service { Id = Id, Name = Name, Price = Price, Description = Description };
        }
    }
}
