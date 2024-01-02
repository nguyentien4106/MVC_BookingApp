using AutoMapper;
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
        private readonly AppService<BookingInformation, BookingInformationDTO> _service;
        private readonly AppService<CollaboratorServices, CollaboratorServicesDTO> _collaboratorServices;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public BookingInformationController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<BookingInformation, BookingInformationDTO>(mapper, context);
            _collaboratorServices = new AppService<CollaboratorServices, CollaboratorServicesDTO>(mapper, context);
            _mapper = mapper;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetByCollaborator(Guid? id)
        {
            var bookings = await _service.GetAll(item => item.CollaboratorId == id, "CollaboratorServices");
            var result = bookings.FirstOrDefault();

            return Json(result == null ? Result.Fail("No booking information found") : Result.Success(result));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]BookingInformationDTO dto)
        {
            var exist = await _context.BookingInformations.Where(item => item.CollaboratorId == dto.CollaboratorId).FirstOrDefaultAsync();
            
            if(exist == null)
            {
                var result = await _service.Add(dto, item => item.CollaboratorServices);
                return Json(true);

            }
            else
            {
                foreach(var item in dto.CollaboratorServices)
                {
                    await _collaboratorServices.Add(item);
                }
                return Json("update");
            }
        }
    }
}
