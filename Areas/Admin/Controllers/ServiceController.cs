using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookingApp.Data;
using BookingApp.Entities;
using Microsoft.AspNetCore.Authorization;
using BookingApp.Service;
using BookingApp.DTO;
using BookingApp.Models.Result;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AllowAnonymous]
    public class ServiceController : Controller
    {
        private readonly IAppService<BookingApp.Entities.Service, ServiceDTO> _service;

        public ServiceController(IAppService<BookingApp.Entities.Service, ServiceDTO> service)
        {
            _service = service;
        }

        // GET: Admin/Service
        public ViewResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetAll()
        {
            var services = await _service.GetAll();

            return Json(Result.Success(services));
        }

        public async Task<IActionResult> Get(Guid? id)
        {
            var services = await _service.GetById(item => item.Id == id);

            return Json(Result.Success(services));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid? id)
        {
            if(id == null)
            {
                return 
            }
            var result = await _service.Delete(id);
        }

    }
}
