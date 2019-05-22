using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SGCOS.WebAPI.Dtos;
using SGCOS.Domain;
using SGCOS.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;

namespace SGCOS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        public readonly ISGCOSRepository _repo;
        public readonly IMapper _mapper;
        public ClienteController(ISGCOSRepository repo, IMapper mapper)
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
                var clientes = await _repo.GetAllClienteAsync();

                var results = _mapper.Map<ClienteDto[]>(clientes);

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
        public async Task<IActionResult> Get(int ClienteId)
        {
            try
            {
                var cliente = await _repo.GetAllClienteAsyncById(ClienteId);

                var results = _mapper.Map<ClienteDto>(cliente);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //GET Por Nome
        [HttpGet("getByNome/{nomeCliente}")]
        public async Task<IActionResult> Get(string nomeCliente)
        {
            try
            {
                var cliente = await _repo.GetAllClienteAsyncByNome(nomeCliente);

                var results = _mapper.Map<ClienteDto>(cliente);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }
        }

        //Post Cliente
        [HttpPost]
        public async Task<IActionResult> Post(ClienteDto model)
        {
            try
            {
                var cliente = _mapper.Map<Cliente>(model);    

                _repo.Add(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/cliente/{model.Id}", _mapper.Map<ClienteDto>(cliente));
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
        [HttpPut("{ClienteId}")]
        public async Task<IActionResult> Put(int ClienteId, ClienteDto model)
        {
            try
            {
                var cliente = await _repo.GetAllClienteAsyncById(ClienteId);
                if (cliente == null) return NotFound();

                _mapper.Map(model, cliente);

                _repo.Update(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/cliente/{model.Id}", _mapper.Map<ClienteDto>(cliente));
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
        [HttpDelete("{ClienteId}")]
        public async Task<IActionResult> Delete(int ClienteId)
        {
            try
            {
                var cliente = await _repo.GetAllClienteAsyncById(ClienteId);
                if (cliente == null) return NotFound();

                _repo.Delete(cliente);

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