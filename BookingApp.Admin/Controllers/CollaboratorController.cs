//using Microsoft.AspNetCore.Mvc;
//using AutoMapper;
//using Microsoft.AspNetCore.Authorization;
//using BookingApp.Admin.Services.CollaboratorService;
//using BookingApp.Models.DTO;
//using BookingApp.Common.Services;
//using BookingApp.Common.Data;
//using BookingApp.Common.Model.Result;
//using BookingApp.Common.Services.Implement;
//using BookingApp.Common.Entities;
//using BookingApp.Admin.Model.DTO;

//namespace BookingApp.Admin.Controllers
//{
//    [Area("Admin")]
//    [Authorize(Roles = "Admin")]
//    //[AllowAnonymous]
//    public class CollaboratorController : Controller
//    {
//        private readonly AppService<Collaborator, CollaboratorDTO> _service;
//        private readonly AppService<BookingInformation, BookingInformationDTO> _bookingInformationService;
//        private readonly IImageService _imageService;
//        private readonly ICollaboratorService _collaboratorService;

//        public CollaboratorController(IMapper mapper, ApplicationDbContext context, IImageService imageService, ICollaboratorService collaboratorService)
//        {
//            _service = new AppService<Collaborator, CollaboratorDTO>(mapper, context);
//            _bookingInformationService = new AppService<BookingInformation, BookingInformationDTO>(mapper, context);
//            _imageService = imageService;
//            _collaboratorService = collaboratorService;
//        }

//        // GET: Admin/Collaborators
//        public async Task<IActionResult> Index()
//        {
//            var collaborators = await _service.GetAll();

//            return View(collaborators);
//        }

//        // GET: Admin/Collaborators
//        public async Task<IActionResult> GetAll()
//        {
//            var collaborators = await _service.GetAll();
//            //return Json(Result.Success(collaborators));
//        }

   
//        public async Task<IActionResult> GetUserImages(Guid? id)
//        {
//            if(id == null)
//            {
//                return Json(Result.Fail("Can not get the Collaborator Id."));
//            }

//            var memoryStream = await _imageService.GetUserImagesById((Guid)id);

//            return new FileContentResult(memoryStream.ToArray(), "application/zip");
//        }

//        [HttpPost]
//        public async Task<IActionResult> Add([FromForm]CollaboratorDTO collaboratorDTO)
//        {
//            var result = await _collaboratorService.Add(collaboratorDTO);

//            return Json(result == null ? Result.Fail("The result return null.") : Result.Success(collaboratorDTO));
//        }

//        [HttpPost] 
//        public async Task<JsonResult> Update([FromForm]CollaboratorDTO collaboratorDTO)
//        {
//            if(collaboratorDTO == null)
//            {
//                return Json(Result.Fail("Form data return null. Please check it again."));
//            }

//            if(collaboratorDTO.Id.Equals(new Guid()))
//            {
//                return Json(Result.Fail("Collaborator is 000000000."));
//            }

//            var result = await _collaboratorService.Update(collaboratorDTO);

//            return Json(Result.Success(result));

//        }

//        [HttpDelete]
//        public async Task<IActionResult> Delete(Guid? id)
//        {
//            if (id == null) return Json(Result.Fail("Can not get the Collaborator Id"));

//            var result = await _service.Delete((Guid)id);

//            return Json(result ? Result.Success(result) : Result.Fail("Can not delete with the id given, please check."));
//        }
        
//    }
//}
