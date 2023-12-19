namespace BookingApp.DTO
{
    using BookingApp.Entities;

    public class BookingInformationDTO : CollaboratorDTO
    {
        public List<Service>? Services { get; set; }
    }
}
