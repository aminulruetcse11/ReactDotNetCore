using AutoMapper;
using COREAPI.Models;

namespace COREAPI
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<DepartmentViewModel, Department>();
            CreateMap<Department, DepartmentViewModel>();

            CreateMap<Employee, EmployeeViewModel>()
                .ForMember(vm => vm.DepartmentName, map => map.MapFrom(m => m.Department.DepartmentName))
                .ForMember(vm => vm.DOB, map => map.MapFrom(m => m.DOB.ToString("dd MMM yyyy")))
                ;
            CreateMap<EmployeeViewModel, Employee>();
        }
    }
}