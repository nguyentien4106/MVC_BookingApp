using BookingApp.Common.Entities;
using BookingApp.Common.Entities.Base;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Common.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<UserImage> UserImages { get; set; }

        public DbSet<BookingApp.Common.Entities.Service> Services { get; set; }  

        public DbSet<CollaboratorServices> CollaboratorServices { get; set; }
        
        public DbSet<BookingInformation> BookingInformations { get; set; }
    }
}
