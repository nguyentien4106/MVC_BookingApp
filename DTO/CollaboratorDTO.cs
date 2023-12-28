using System.ComponentModel.DataAnnotations;

namespace BookingApp.DTO
{
    public class CollaboratorDTO
    {
        public Guid Id { get; set; }

        public int Code { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Title { get; set; }

        public string? BirthDate { get; set; }

        public string? Description { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public int V1 { get; set; }

        public int V2 { get; set; }

        public int V3 { get; set; }

        public string? Hobbies { get; set; }

        public string? School { get; set; }

        public List<IFormFile>? UserImages { get; set; } = new List<IFormFile>();

        public DateTime? Created { get; set; }

        public List<ServiceDTO>? Services { get; set; } = new List<ServiceDTO>();

        public double? Price { get; set; }

        public string? DisplayName { get; set; }

        public bool? IsVeryfied { get; set; }

        public int? Status { get; set; }

        public string? Information { get; set; }
    }
}
