using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using COREAPI;
using COREAPI.Models;
using AutoMapper;
using Microsoft.AspNetCore.Cors;

namespace COREAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        IMapper _mapper;
        public EmployeesController(ApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<IEnumerable<EmployeeViewModel>> GetEmployees()
        {
            var employees = await _context.Employees.Include(i => i.Department).ToListAsync();
            var vmEmployees = _mapper.Map<List<Employee>,
                IEnumerable<EmployeeViewModel>>(employees);

            return vmEmployees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<Response> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return new Response { Status = StatusCodes.Status404NotFound, Message = "Employee not found." };
            }

            return new Response
            {
                Status = StatusCodes.Status200OK,
                Message = "Employee found.",
                Data = employee
            };
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Response> PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeID)
            {
                return new Response { Status = StatusCodes.Status404NotFound, Message = "Employee not found." };
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return new Response { Status = StatusCodes.Status404NotFound, Message = "Employee not found." };
                }
                else
                {
                    throw;
                }
            }
            return new Response
            {
                Status = StatusCodes.Status200OK,
                Message = "Employee update successfull."
            };

        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [EnableCors("AllowOrigin")]
        public async Task<Response> PostEmployee(EmployeeViewModel newemployee)
        {
            if (_context.Employees
               .Any(i => i.ContactNo
               .Equals(newemployee.ContactNo)))
            {
                return new Response
                {
                    Status = StatusCodes.Status400BadRequest,
                    Message = "This ContactNo is already exists."
                };
            }

            var employee = _mapper.Map<EmployeeViewModel, Employee>(newemployee);

            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new Response
                {
                    Status = StatusCodes.Status417ExpectationFailed,
                    Message = $"Employee is not added. Error: {ex.Message}",
                };
            }

            return new Response
            {
                Status = StatusCodes.Status201Created,
                Message = "Employee added successfully.",
                Data = employee
            };
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<Response> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return new Response
                {
                    Status = StatusCodes.Status404NotFound,
                    Message = "This Employee is not found."
                };
            }
            try
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return new Response
                {
                    Status = StatusCodes.Status417ExpectationFailed,
                    Message = "This Employee is not deleted."
                };
            }

            return new Response
            {
                Status = StatusCodes.Status200OK,
                Message = "This Employee is deleted successfully."
            };
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeID == id);
        }
    }
}
