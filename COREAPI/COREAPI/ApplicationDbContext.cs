using COREAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COREAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Seed Departments Table
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 1, DepartmentName = "IT" });
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 2, DepartmentName = "HR" });
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 3, DepartmentName = "Payroll" });
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 4, DepartmentName = "Admin" });

            // Seed Employee Table
            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                EmployeeID = 1,
                FirstName = "John",
                LastName = "Hastings",
                Email = "David@pragimtech.com",
                DOB = new DateTime(1980, 10, 5),
                Gender = EnumGender.Male,
                Address = "London",
                DepartmentID = 1,
            });

            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                EmployeeID = 2,
                FirstName = "Sam",
                LastName = "Galloway",
                Email = "Sam@pragimtech.com",
                DOB = new DateTime(1981, 12, 22),
                Gender = EnumGender.Male,
                Address = "Dhaka",
                DepartmentID = 2,
            });

            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                EmployeeID = 3,
                FirstName = "Mary",
                LastName = "Smith",
                Email = "mary@pragimtech.com",
                DOB = new DateTime(1979, 11, 11),
                Gender = EnumGender.Female,
                DepartmentID = 1,
                Address = "Istambul",
            });

            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                EmployeeID = 4,
                FirstName = "Sara",
                LastName = "Longway",
                Email = "sara@pragimtech.com",
                DOB = new DateTime(1982, 9, 23),
                Gender = EnumGender.Female,
                DepartmentID = 3,
                Address ="New York"
            });
        }
    }
}
