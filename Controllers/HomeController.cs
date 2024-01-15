using BookingApp.Models;
using BookingApp.Models.Result;
using BookingApp.Services;
using BookingApp.Services.Implement;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHomeService _service;
        private readonly IImageService _imageService;
        public HomeController(IHomeService service, IImageService imageService)
        {
            _service = service;
            _imageService = imageService;
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

        public async Task<IActionResult> GetUserImages(Guid? id)
        {
            if (id == null)
            {
                return Json(Result.Fail("Can not get the Collaborator Id."));
            }

            var memoryStream = await _imageService.GetUserImagesById((Guid)id);

            return new FileContentResult(memoryStream.ToArray(), "application/zip");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
