using BookingApp.Admin.Services.BookingInformation;
using BookingApp.Common;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookingApp.Common.Data;

namespace BookingApp.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    //[AllowAnonymous]
    public class BookingInformationController : Controller
    {
        private readonly IBookingInformationService _service;

        public BookingInformationController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new BookingInformationService(mapper, context);

        }

        public IActionResult Index()
        {
            return View("~/Areas/Admin/Views/Collaborator/Index.cshtml");
        }

        public async Task<IActionResult> GetByCollaborator(Guid? id)
        {
            return Json(await _service.GetByCollaborator(id));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]BookingInformationViewModel dto)
        {
            return Json(await _service.AddOrUpdate(dto));
        }
    }
}
