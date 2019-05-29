using System;
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
    public class ServicoController : ControllerBase
    {
        public readonly ISGCOSRepository _repo;
        public readonly IMapper _mapper;
        public ServicoController(ISGCOSRepository repo, IMapper mapper)
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
                var servicos = await _repo.GetAllServicoAsync();

                var results = _mapper.Map<IEnumerable<ServicoDto>>(servicos);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou : {ex.Message}");
            }
        }

        //GET Por Id
        [HttpGet("{ServicoId}")]
        public async Task<IActionResult> Get(int ServicoId)
        {
            try
            {
                var servico = await _repo.GetAllServicoAsyncById(ServicoId);

                var results = _mapper.Map<ServicoDto>(servico);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //GET Por Equipamento
        [HttpGet("getByEquipamento/{EquipamentoId}")]
        public async Task<IActionResult> Get(string EquipamentoId)
        {
            try
            {   
                var servico = await _repo.GetAllServicoAsyncByEquipamento(EquipamentoId);

                var results = _mapper.Map<IEnumerable<ServicoDto>>(servico);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //Post Servico
        [HttpPost]
        public async Task<IActionResult> Post(ServicoDto model)
        {
            try
            {
                var servico = _mapper.Map<Servico>(model);    

                _repo.Add(servico);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/servico/{model.Id}", _mapper.Map<ServicoDto>(servico));
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
        [HttpPut("{ServicoId}")]
        public async Task<IActionResult> Put(int ServicoId, ServicoDto model)
        {
            try
            {
                var servico = await _repo.GetAllServicoAsyncById(ServicoId);
                if (servico == null) return NotFound();

                _mapper.Map(model, servico);

                _repo.Update(servico);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/servico/{model.Id}", _mapper.Map<ServicoDto>(servico));
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
        [HttpDelete("{ServicoId}")]
        public async Task<IActionResult> Delete(int ServicoId)
        {
            try
            {
                var servico = await _repo.GetAllServicoAsyncById(ServicoId);
                if (servico == null) return NotFound();

                _repo.Delete(servico);

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