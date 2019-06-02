using AutoMapper;
using SGCOS.WebAPI.Dtos;
using SGCOS.Domain;
using SGCOS.Domain.Identity;

namespace SGCOS.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Cliente, ClienteDto>().ReverseMap();
            CreateMap<Endereco, EnderecoDto>().ReverseMap();
            CreateMap<Telefone, TelefoneDto>().ReverseMap();
            CreateMap<Equipamento, EquipamentoDto>().ReverseMap();
            CreateMap<Servico, ServicoDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            
        }
    }
}