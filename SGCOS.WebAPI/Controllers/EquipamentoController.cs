using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SGCOS.Domain;
using SGCOS.Repository;
using SGCOS.WebAPI.Dtos;

namespace SGCOS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipamentoController : ControllerBase
    {
        public readonly ISGCOSRepository _repo;
        public readonly IMapper _mapper;
        public EquipamentoController(ISGCOSRepository repo, IMapper mapper)
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
                var equipamentos = await _repo.GetAllEquipamentoAsync();

                var results = _mapper.Map<IEnumerable<EquipamentoDto>>(equipamentos);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou : {ex.Message}");
            }
        }

        //GET Por Id
        [HttpGet("{EquipamentoId}")]
        public async Task<IActionResult> Get(int EquipamentoId)
        {
            try
            {
                var equipamento = await _repo.GetAllEquipamentoAsyncById(EquipamentoId);

                var results = _mapper.Map<EquipamentoDto>(equipamento);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //GET Por Nome
        [HttpGet("getByNrSerie/{nrSerie}")]
        public async Task<IActionResult> Get(string nrSerie)
        {
            try
            {
                var equipamento = await _repo.GetAllEquipamentoAsyncByNrSerie(nrSerie);

                var results = _mapper.Map<IEnumerable<EquipamentoDto>>(equipamento);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //GET Por Equipamento
        [HttpGet("getByCliente/{ClienteId}")]
        public async Task<IActionResult> Get(long ClienteId)
        {
            try
            {   
                var equipamento = await _repo.GetAllEquipamentoByCliente(ClienteId);

                var results = _mapper.Map<IEnumerable<EquipamentoDto>>(equipamento);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }


        //Post Equipamento
        [HttpPost]
        public async Task<IActionResult> Post(EquipamentoDto model)
        {
            try
            {
                var equipamento = _mapper.Map<Equipamento>(model);    

                _repo.Add(equipamento);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/equipamento/{model.Id}", _mapper.Map<EquipamentoDto>(equipamento));
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
        [HttpPut("{EquipamentoId}")]
        public async Task<IActionResult> Put(int EquipamentoId, EquipamentoDto model)
        {
            try
            {
                var equipamento = await _repo.GetAllEquipamentoAsyncById(EquipamentoId);
                if (equipamento == null) return NotFound();

                _mapper.Map(model, equipamento);

                _repo.Update(equipamento);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/equipamento/{model.Id}", _mapper.Map<EquipamentoDto>(equipamento));
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
        [HttpDelete("{EquipamentoId}")]
        public async Task<IActionResult> Delete(int EquipamentoId)
        {
            try
            {
                var equipamento = await _repo.GetAllEquipamentoAsyncById(EquipamentoId);
                if (equipamento == null) return NotFound();

                _repo.Delete(equipamento);

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
        }


    }
}