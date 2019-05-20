using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SGCOS.WebAPI.Dtos;
using SGCOS.Domain;
using SGCOS.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SGCOS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChamadoController: ControllerBase
    {
        public readonly ISGCOSRepository _repo;
        public readonly IMapper _mapper;
        public ChamadoController(ISGCOSRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
         // GET all
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var chamados = await _repo.GetAllChamadoAsync();

                var results = _mapper.Map<ChamadoDto[]>(chamados);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou : {ex.Message}");
            }
        }

         //GET Por Id
        [HttpGet("{ChamadoId}")]
        public async Task<IActionResult> Get(int ChamadoId)
        {
            try
            {
                var chamado = await _repo.GetAllChamadoAsyncById(ChamadoId);

                var results = _mapper.Map<ChamadoDto>(chamado);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }
    }
}