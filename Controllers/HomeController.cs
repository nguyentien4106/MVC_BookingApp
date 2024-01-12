using BookingApp.Models;
using BookingApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHomeService _service;

        public HomeController(IHomeService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetCollaborators()
        {
            return Json(await _service.GetAll());
        }

        public async Task<IActionResult> GetAvatars()
        {
            var memoryStream = await _service.GetAvatar();
            return new FileContentResult(memoryStream.ToArray(), "application/zip");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
