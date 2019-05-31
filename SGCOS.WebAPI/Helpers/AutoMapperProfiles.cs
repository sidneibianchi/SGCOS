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
            CreateMap<Endereco, EnderecoDto>().ReverseMap();
            CreateMap<Equipamento, EquipamentoDto>().ReverseMap();
            CreateMap<Telefone, TelefoneDto>().ReverseMap();
            CreateMap<Servico, ServicoDto>().ReverseMap();
            
        }
    }
}