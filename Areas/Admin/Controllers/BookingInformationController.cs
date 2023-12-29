using AutoMapper;
using BookingApp.Data;
using BookingApp.DTO;
using BookingApp.Entities;
using BookingApp.Models.Result;
using BookingApp.Services.Implement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    //[Authorize(Roles = "Admin")]
    [AllowAnonymous]
    public class BookingInformationController : Controller
    {
        private readonly AppService<BookingInformation, BookingInformationDTO> _service;

        public BookingInformationController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<BookingInformation, BookingInformationDTO>(mapper, context);
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetByCollaborator(Guid? id)
        {
            var bookings = await _service.GetAll(item => item.CollaboratorId == id, "Services");
            var result = bookings.FirstOrDefault();

            return Json(result == null ? Result.Fail("No booking information found") : Result.Success(result));
        }

        public async Task<IActionResult> Add(Guid? id, BookingInformationDTO dto)
        {
            if(id == null) return Json(Result.Fail("Id null"));
            
            dto.CollaboratorId = (Guid)id;

            var result = await _service.Add(dto);

            return Json(Result.Success(result));
        }
    }
}
