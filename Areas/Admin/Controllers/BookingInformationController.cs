using AutoMapper;
using BookingApp.Areas.Admin.Services.BookingInformation;
using BookingApp.Areas.Admin.Services.CollaboratorService;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Models.Result;
using BookingApp.Services.Implement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    //[Authorize(Roles = "Admin")]
    [AllowAnonymous]
    public class BookingInformationController : Controller
    {
        private readonly IBookingInformationService _service;
        public BookingInformationController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new BookingInformationService(mapper, context);

        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetByCollaborator(Guid? id)
        {
            return Json(await _service.GetByCollaborator(id));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]BookingInformationDTO dto)
        {
            return Json(await _service.AddOrUpdate(dto));
        }
    }
}
