using AutoMapper;
using COREAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COREAPI.ViewModel
{
    public class MapperConfig:Profile
    {
        public MapperConfig()
        {
            CreateMap<Department, DepartmentViewModel>()
                .ForMember(vm => vm.DepartmentName, map => map.MapFrom(m => m.DepartmentName));

            CreateMap<DepartmentViewModel, Department>();

            CreateMap<Employee, EmployeeViewModel>();
            CreateMap<EmployeeViewModel, Employee>();
        }
    }
}
