using BookingApp.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Entities
{
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } 

        public string? Name { get; set; }

        public double? Price { get; set; }

        public string? Description { get; set; }

        public static explicit operator Service(ServiceDTO v)
        {
            throw new NotImplementedException();
        }
    }
}
