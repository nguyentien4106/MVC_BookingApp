﻿using BookingApp.Admin.Services.BookingInformation;
using AutoMapper;
using BookingApp.Common.Data;
using BookingApp.Admin.Model.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> Add([FromBody] BookingInformationDTO dto)
        {
            return Json(await _service.AddOrUpdate(dto));
        }
    }
}