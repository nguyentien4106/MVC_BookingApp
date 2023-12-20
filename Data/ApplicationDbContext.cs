using BookingApp.Entities;
using BookingApp.Entities.Base;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<UserImage> UserImages { get; set; }

        public DbSet<BookingApp.Entities.Service> Services { get; set; }  
        
        //public DbSet<BookingInformation> BookingInformations { get; set; }
    }
}
