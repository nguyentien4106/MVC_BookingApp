namespace BookingApp.Entities.Base
{
    public class UserImage
    {
        public int Id { get; set; } 

        public int CollaboratorId { get; set; }

        public byte[]? Image { get; set; }

        public Collaborator? Collaborator { get; set; } 
    }
}
