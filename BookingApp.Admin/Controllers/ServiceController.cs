using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using BookingApp.Models.DTO;
using BookingApp.Common.Service;
using BookingApp.Common.Entities;
using BookingApp.Common.Model.DTO;
using BookingApp.Common.Model.Result;

namespace BookingApp.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    //[AllowAnonymous]
    public class ServiceController : Controller
    {
        private readonly IAppService<Service, ServiceDTO> _service;

        public ServiceController(IAppService<Service, ServiceDTO> service)
        {
            _service = service;
        }

        // GET: Admin/Service
        public IActionResult Index()
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
            if (id == null)
            {
                return Json(Result.Fail("id null"));
            }

            var result = await _service.Delete((Guid)id);

            return Json(result ? Result.Success() : Result.Fail("Check more"));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ServiceDTO serviceDTO)
        {
            var result = await _service.Add(serviceDTO);

            return Json(Result.Success(result));
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] ServiceDTO serviceDTO)
        {
            if (serviceDTO.Id == null)
            {
                return Json(Result.Fail("id null"));
            }

            var result = await _service.Update(serviceDTO, item => item.Id == serviceDTO.Id);

            return Json(Result.Success(result));
        }

    }
}
