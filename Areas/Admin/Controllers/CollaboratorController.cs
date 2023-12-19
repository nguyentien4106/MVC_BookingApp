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

namespace BookingApp.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class CollaboratorController : Controller
    {
        private readonly AppService<Collaborator, CollaboratorDTO> _service;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public CollaboratorController(IMapper mapper, ApplicationDbContext context)
        {
            _service = new AppService<Collaborator, CollaboratorDTO>(mapper, context);
        }

        // GET: Admin/Collaborators
        public async Task<IActionResult> Index()
        {
            var collaborators = await _service.GetAll();
            return View(collaborators);
        }

        // GET: Admin/Collaborators/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var collaborator = await _service.GetById(m => m.Id == id, "UserImages");
            if (collaborator == null)
            {
                return NotFound();
            }

            return View(collaborator);
        }

        // GET: Admin/Collaborators/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Admin/Collaborators/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CollaboratorDTO collaboratorDTO)
        {

            if (ModelState.IsValid)
            {
                var entity = _mapper.Map<CollaboratorDTO, Collaborator>(collaboratorDTO);
                foreach (var file in collaboratorDTO.UserImages)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            entity.UserImages?.Add(new Entities.Base.UserImage
                            {
                                Image = ms.ToArray()
                            });
                            // act on the Base64 data
                        }
                    }
                }

                _service.Add(collaboratorDTO);
                return RedirectToAction(nameof(Index));
            }

            return View(collaboratorDTO);
        }

        //// GET: Admin/Collaborators/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null || _context.Collaborators == null)
        //    {
        //        return NotFound();
        //    }

        //    var collaborator = await _context.Collaborators.FindAsync(id);
        //    if (collaborator == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(collaborator);
        //}

        //// POST: Admin/Collaborators/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("V1,V2,V3,Hobbies,School,Id,FirstName,LastName,Title,BirthDate,Description,PhoneNumber,Address")] Collaborator collaborator)
        //{
        //    if (id != collaborator.Id)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(collaborator);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!CollaboratorExists(collaborator.Id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(collaborator);
        //}

        //// GET: Admin/Collaborators/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null || _context.Collaborators == null)
        //    {
        //        return NotFound();
        //    }

        //    var collaborator = await _context.Collaborators
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (collaborator == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(collaborator);
        //}

        //// POST: Admin/Collaborators/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    if (_context.Collaborators == null)
        //    {
        //        return Problem("Entity set 'ApplicationDbContext.Collaborators'  is null.");
        //    }
        //    var collaborator = await _context.Collaborators.FindAsync(id);
        //    if (collaborator != null)
        //    {
        //        _context.Collaborators.Remove(collaborator);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        //private bool CollaboratorExists(int id)
        //{
        //  return (_context.Collaborators?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
