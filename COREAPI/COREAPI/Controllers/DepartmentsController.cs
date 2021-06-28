using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using COREAPI;
using COREAPI.Models;
using Microsoft.AspNetCore.Cors;
using AutoMapper;
using System.Net;

namespace COREAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        IMapper _mapper;
        public DepartmentsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<List<DepartmentViewModel>>> GetDepartments()
        {
            var departments = await (from d in _context.Departments
                                     select new DepartmentViewModel
                                     {
                                         DepartmentID = d.DepartmentID,
                                         DepartmentName = d.DepartmentName
                                     }).ToListAsync();
            return departments;
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<Response> GetDepartment(int id)
        {
            var department = _mapper.Map<Department, DepartmentViewModel>
                (await _context.Departments.FindAsync(id));

            if (department == null)
            {
                return new Response { Status = StatusCodes.Status404NotFound, Message = "Department not found." };
            }

            return new Response
            {
                Status = StatusCodes.Status200OK,
                Message = "Department found.",
                Data = department
            };
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [EnableCors("AllowOrigin")]
        public async Task<Response> PutDepartment(int id, Department department)
        {
            if (id != department.DepartmentID)
            {
                return new Response { Status = StatusCodes.Status404NotFound, Message = "Department not found." };
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return new Response { Status = StatusCodes.Status404NotFound, Message = "Department not found." };
                }
                else
                {
                    throw;
                }
            }

            return new Response { Status = StatusCodes.Status200OK, Message = "Department update successfull." };
        }

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public async Task<object> PostDepartment(DepartmentViewModel newDepartment)
        {
            if (_context.Departments
                .Any(i => i.DepartmentName.ToLower()
                .Equals(newDepartment.DepartmentName.ToLower())))
            {
                return new Response
                {
                    Status = StatusCodes.Status400BadRequest,
                    Message = "This Department is already exists."
                };
            }
            Department dept = new Department();

            try
            {
                dept.DepartmentName = newDepartment.DepartmentName;
                _context.Departments.Add(dept);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new Response
                {
                    Status = StatusCodes.Status417ExpectationFailed,
                    Message = "Department added failed.",
                };
            }

            return new Response
            {
                Status = StatusCodes.Status201Created,
                Message = "Department added successfully.",
                Data = dept
            };
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        [EnableCors("AllowOrigin")]
        public async Task<object> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return new Response
                {
                    Status = StatusCodes.Status404NotFound,
                    Message = "This Department is not found."
                };
            }

            try
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new Response
                {
                    Status = StatusCodes.Status417ExpectationFailed,
                    Message = "This Department is not deleted."
                };
            }

            return new Response
            {
                Status = StatusCodes.Status200OK,
                Message = "This Department is deleted successfully."
            };
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentID == id);
        }
    }
}
