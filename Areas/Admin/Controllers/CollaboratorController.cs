using Microsoft.AspNetCore.Mvc;
using BookingApp.Data;
using BookingApp.Entities;
using BookingApp.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using BookingApp.Services.Implement;
using BookingApp.Models.Result;
using BookingApp.Services;

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    //[AllowAnonymous]
    public class CollaboratorController : Controller
    {
        private readonly AppService<Collaborator, CollaboratorDTO> _service;
        private readonly IImageService _imageService;

        public CollaboratorController(IMapper mapper, ApplicationDbContext context, IImageService imageService)
        {
            _service = new AppService<Collaborator, CollaboratorDTO>(mapper, context);
            _imageService = imageService;
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
            return Json(Result.Success(collaborators));
        }

        public async Task<IActionResult> Get(Guid? id)
        {
            var result = await _service.GetEntityById(m => m.Id == id);

            return Json(result == null ? Result.Fail("The result return null.") : Result.Success(result));
        }

        public async Task<IActionResult> GetUserImages(Guid? id)
        {
            if(id == null)
            {
                return Json(Result.Fail("Can not get the Collaborator Id."));
            }

            var memoryStream = await _imageService.GetUserImagesById((Guid)id);

            return new FileContentResult(memoryStream.ToArray(), "application/zip");
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm]CollaboratorDTO collaboratorDTO)
        {
            var result = await _service.Add(collaboratorDTO);

            return Json(result == null ? Result.Fail("The result return null.") : Result.Success(collaboratorDTO));
        }

        [HttpPost] 
        public async Task<JsonResult> Update([FromForm]CollaboratorDTO collaboratorDTO)
        {
            if(collaboratorDTO == null)
            {
                return Json(Result.Fail("Form data return null. Please check it again."));
            }

            if(collaboratorDTO.Id.Equals(new Guid()))
            {
                return Json(Result.Fail("Collaborator is 000000000."));
            }

            var result = await _service.Update(collaboratorDTO, identity: item => item.Code, item => item.Id == collaboratorDTO.Id);
            await _imageService.RemoveUserImagesById(collaboratorDTO.Id);
            await _imageService.AddImageToUser(collaboratorDTO.Id, collaboratorDTO.UserImages);

            return Json(Result.Success(result));

        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null) return Json(Result.Fail("Can not get the Collaborator Id"));

            var result = await _service.Delete((Guid)id);

            return Json(result ? Result.Success(result) : Result.Fail("Can not delete with the id given, please check."));
        }
    }
}
