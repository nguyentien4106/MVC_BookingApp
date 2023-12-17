using BookingApp.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(Collaborator col)
        {
            var a = col.Address;
            return View();
        }
    }
}
