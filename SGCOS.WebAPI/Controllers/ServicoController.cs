using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SGCOS.Domain;
using SGCOS.Repository;
using SGCOS.WebAPI.Dtos;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

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

                //this.EnviaEmail();
                var servico = await _repo.GetAllServicoAsyncById(ServicoId);
                if (servico == null) return NotFound();

                /*
                _repo.Delete(servico);

                if (await _repo.SaveChangesAsync())
                { */
                    return Ok();
                /* } */
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de dados falhou: {ex.Message}");
            }

           // return BadRequest();
        }


        [HttpPost("enviaEmail/{destinatario}")]
        public IActionResult EnviaEmail(string destinatario, ServicoDto model)
        {
            try
            {
               var message = new MimeMessage();
               message.From.Add( new MailboxAddress("SGCOS","contato@mab.servicos.ws"));
               message.To.Add( new MailboxAddress("SGCOS",destinatario));
               message.Subject = "teste email 4 ";

               var bodyBuilder = new BodyBuilder ();
               bodyBuilder.HtmlBody = "$<h1>This is some html text</h1>" +
                "<table>" +
                    "<tbody>"+
                    "<tr>"+
                        "<td><b>Nr Ordem :</b></td>"+
                        $"<td>{model.NrOrdem}</td>" +
                        "<td><b>Data de Atendimento :</b></td>" +
                        $"<td>{model.DtAtendimento}</td>" +
                        "<td><b>Dias de Garantia :</b></td>" +
                        $"<td>{model.QtdDiasGarantia}</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td><b>Defeito :</b></td>" +
                        $"<td colspan='5'>{model.Defeito}</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td><b>Serviços Executados :</b></td>" +
                        $"<td colspan='5'{model.ServicosExecutados}</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td><b>Peças Substituidas :</b></td>" +
                        $"<td colspan='5'>{model.PecasSubstituidas}</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td><b>Observações :</b></td>" +
                        $"<td colspan='5'>{model.Observacao}</td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td><b>Valor :</b></td>" +
                        $"<td colspan='5'>{model.ValorServico}</td>" +
                    "</tr>" +
                    "</tbody>" +
                "</table>";
 
               bodyBuilder.TextBody = "This is some plain text";

               message.Body = bodyBuilder.ToMessageBody ();

               using(var client = new SmtpClient()){
                   client.Connect("email-ssl.com.br",587,false);
                   client.Authenticate("contato@mab.servicos.ws","@Simmasa0603");
                   client.Send(message);
                   client.Disconnect(true);
               }

                return Ok();
                
            }
            catch (System.Exception)
            {                
                throw;
            }
        }
    }


    

}