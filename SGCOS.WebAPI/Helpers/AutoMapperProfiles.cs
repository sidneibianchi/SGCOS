using AutoMapper;
using SGCOS.WebAPI.Dtos;
using SGCOS.Domain;

namespace SGCOS.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Cliente, ClienteDto>().ReverseMap();
            CreateMap<Chamado, ChamadoDto>().ReverseMap();
            CreateMap<Endereco, EnderecoDto>().ReverseMap();
        }
    }
}