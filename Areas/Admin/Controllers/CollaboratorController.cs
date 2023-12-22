using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BookingApp.Data;
using BookingApp.Entities;
using BookingApp.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using BookingApp.Services.Implement;
using BookingApp.Service;
using BookingApp.Models.Result;
using System.IO.Compression;
using BookingApp.Entities.Base;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    //[Authorize(Roles = "Admin")]
    [AllowAnonymous]
    public class CollaboratorController : Controller
    {
        private readonly AppService<Collaborator, CollaboratorDTO> _service;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public CollaboratorController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<Collaborator, CollaboratorDTO>(mapper, context);
            _context = context;
            _mapper= mapper;
        }

        // GET: Admin/Collaborators
        public async Task<IActionResult> Index()
        {
            var collaborators = await _service.GetAll();
            return View(collaborators);
        }

        // GET: Admin/Collaborators
        public async Task<IActionResult> GetAll()
        {
            var collaborators = await _service.GetAll();
            return Result.Success(collaborators);
        }

        public async Task<IActionResult> Get(Guid? id)
        {
            var result = await _service.GetEntityById(m => m.Id == id);

            return result == null ? Result.Fail("Null") : Result.Success(result);
        }

        public async Task<IActionResult> GetUserImages(Guid? id)
        {
            // Create a memory stream to hold the zip file contents
            MemoryStream memoryStream = new MemoryStream();

            // Create a zip archive
            using (ZipArchive archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                // Retrieve images from the database
                var images = await _context.UserImages.Where(item => item.CollaboratorId == id).ToListAsync();


                // Add image files to the archive
                int i = 0;
                foreach (var image in images)
                {
                    // Assuming your byte[] property is called "ImageData"
                    var entry = archive.CreateEntry($"image_{i}.jpeg");
                    using (var entryStream = entry.Open())
                    {
                        entryStream.Write(image.Image, 0, image.Image.Length);
                    }
                    i++;
                }
            }

            memoryStream.Position = 0;

            // Return the zip file as the response
            return new FileContentResult(memoryStream.ToArray(), "application/zip");
        }

        [HttpPost]
        public async Task<IActionResult> Add(CollaboratorDTO collaboratorDTO)
        {
            var result = await _service.Add(collaboratorDTO);

            return result == null ? Result.Fail("Result Null") : Result.Success(collaboratorDTO);
        }

        [HttpPut] 
        public async Task<IActionResult> Update(Guid? id, CollaboratorDTO collaboratorDTO)
        {
            var result = await _service.Update(collaboratorDTO, item => item.Code, item => item.Id == id);    

            return Result.Success(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null) return Json(Result.Fail("Id null"));

            var result = await _service.Delete((Guid)id);

            return result ? Result.Success(result) : Result.Fail("Check more");
        }

        public async Task<IActionResult> Test(Guid? id)
        {

            // Create a memory stream to hold the zip file contents
            MemoryStream memoryStream = new MemoryStream();
            
                // Create a zip archive
                using (ZipArchive archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    // Retrieve images from the database
                    var images = await _context.UserImages.Where(item => item.CollaboratorId == id).ToListAsync();


                    // Add image files to the archive
                    int i = 0;
                    foreach (var image in images)
                    {
                        // Assuming your byte[] property is called "ImageData"
                        var entry = archive.CreateEntry($"image_{i}.jpeg");
                        using (var entryStream = entry.Open())
                        {
                            entryStream.Write(image.Image, 0, image.Image.Length);
                        }
                        i++;
                    }
                }

            memoryStream.Position = 0;

            // Return the zip file as the response
            return new FileContentResult(memoryStream.ToArray(), "application/zip");
            
        }

    }
}
