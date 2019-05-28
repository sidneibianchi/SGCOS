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
    {/*
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
        [HttpGet("{ClienteId}")]
        public async Task<IActionResult> Get(int ClienteId, bool cliente = true )
        {
            try
            {
                var chamado = await _repo.GetAllChamadoAsyncByClienteId(ClienteId);

                var results = _mapper.Map<ChamadoDto>(chamado);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

         //Post Chamado
        [HttpPost]
        public async Task<IActionResult> Post(ChamadoDto model)
        {
            try
            {
                var chamado = _mapper.Map<Chamado>(model);    

                _repo.Add(chamado);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/chamado/{model.Id}", _mapper.Map<ChamadoDto>(chamado));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou : {ex.Message}");
            }

            return BadRequest();
        }

        //Put 
        [HttpPut("{ChamadoId}")]
        public async Task<IActionResult> Put(int ChamadoId, ChamadoDto model)
        {
            try
            {
                var chamado = await _repo.GetAllChamadoAsyncById(ChamadoId);
                if (chamado == null) return NotFound();

                _mapper.Map(model, chamado);

                _repo.Update(chamado);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/chamado/{model.Id}", _mapper.Map<ChamadoDto>(chamado));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }

            return BadRequest();
        }

        //Delete 
        [HttpDelete("{ChamadoId}")]
        public async Task<IActionResult> Delete(int ChamadoId)
        {
            try
            {
                var chamado = await _repo.GetAllChamadoAsyncById(ChamadoId);
                if (chamado == null) return NotFound();

                _repo.Delete(chamado);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }

            return BadRequest();
        }*/
    }
}