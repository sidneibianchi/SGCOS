using System;
using System.Linq;
using System.Threading.Tasks;
using SGCOS.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace SGCOS.Repository
{
    public class SGCOSRepository : ISGCOSRepository
    {
        public readonly SGCOSContext _context;
        public readonly EmailSettings _emailSettings;
        public SGCOSRepository(SGCOSContext context, IOptions<EmailSettings> emailSettings)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            _emailSettings = emailSettings.Value;
        }
        
        #region Geral
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }


        public async Task<bool> SaveChangesAsync()
        {
           return (await _context.SaveChangesAsync()) > 0;
        }
        
        #endregion

        #region Cliente

        public async Task<Cliente[]> GetAllClienteAsync()
        {
            IQueryable<Cliente> query = _context.Clientes
                               .Include(c => c.Enderecos)
                               .Include(c => c.Telefones);               
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }
        public async Task<Cliente> GetAllClienteAsyncById(int clienteId)
        {
            IQueryable<Cliente> query = _context.Clientes
                               .Include(c => c.Enderecos)
                               .Include(c => c.Telefones);              
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Nome)
                        .Where(c => c.Id == clienteId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Cliente[]> GetAllClienteAsyncByNome(string clienteNome)
        {
            IQueryable<Cliente> query = _context.Clientes
                .Include(c => c.Enderecos)
                .Include(c => c.Telefones);             
            

            query = query.AsNoTracking()
                         .OrderBy(c => c.Nome);
                         

            return await query.ToArrayAsync();
        }
        
        public async Task<Cliente> GetAllClienteAsyncByCPFCNPJ(string clientecpfcnpj, bool buscar = true)
        {
            IQueryable<Cliente> query = _context.Clientes
                            .Include(c => c.Enderecos)
                            .Include(c => c.Telefones);              
               

            query = query.AsNoTracking()
                         .OrderBy(c => c.Nome)
                         .Where(c => c.CpfCnpj == clientecpfcnpj);

            return await query.FirstOrDefaultAsync();
        }

        #endregion
 
        #region Equipamento

        public async Task<Equipamento[]> GetAllEquipamentoAsync()
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                               .Include(e => e.Servicos);     
                                
            query = query.AsNoTracking()
                        .OrderBy(e => e.NrSerie);

            return await query.ToArrayAsync();
        }
        public async Task<Equipamento> GetAllEquipamentoAsyncById(int equipamentoId)
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                             .Include(e => e.Servicos);              
               

            query = query.AsNoTracking()
                        .OrderBy(e => e.NrSerie)
                        .Where(e => e.Id == equipamentoId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Equipamento[]> GetAllEquipamentoAsyncByNrSerie(string nrSerie)
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                .Include(e => e.Servicos);
                             
                query = query.AsNoTracking()
                         .OrderBy(e => e.NrSerie)
                         .Where(e => e.NrSerie == nrSerie);
                         
            return await query.ToArrayAsync();
        }
        public async Task<Equipamento[]> GetAllEquipamentoByCliente(long clienteId)
        {
            IQueryable<Equipamento> query = _context.Equipamentos;
                             
                query = query.AsNoTracking()
                         .OrderBy(s => s.NrSerie)
                         .Where(s => s.ClienteId == Convert.ToInt32(clienteId));
                         
            return await query.ToArrayAsync();

        }

        #endregion

        #region Servicos 
        public async Task<Servico[]> GetAllServicoAsync()
        {
            IQueryable<Servico> query = _context.Servicos;               
               
            query = query.AsNoTracking()
                        .OrderBy(s => s.NrOrdem);

            return await query.ToArrayAsync();
        }
        public async Task<Servico> GetAllServicoAsyncById(int servicoId)
        {
           IQueryable<Servico> query = _context.Servicos;              
               

            query = query.AsNoTracking()
                        .OrderBy(e => e.NrOrdem)
                        .Where(e => e.Id == servicoId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Servico[]> GetAllServicoAsyncByEquipamento(string equipamentoId)
        {
            IQueryable<Servico> query = _context.Servicos;
                             
                query = query.AsNoTracking()
                         .OrderBy(s => s.NrOrdem)
                         .Where(s => s.EquipamentoId == Convert.ToInt32(equipamentoId));
                         
            return await query.ToArrayAsync();

        }

        #endregion

        #region Email
        public Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                Execute(email, subject, message).Wait();
                return Task.FromResult(0);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task Execute(string email, string subject, string message)
        {
            try
            {
                string toEmail = string.IsNullOrEmpty(email) ? _emailSettings.ToEmail : email;

                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress(_emailSettings.UsernameEmail, "Sidnei Bianchi")
                };

                mail.To.Add(new MailAddress(toEmail));
                mail.CC.Add(new MailAddress(_emailSettings.CcEmail));

                mail.Subject = "Mab - " + subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                //outras opções
                //mail.Attachments.Add(new Attachment(arquivo));
                //

                using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
                {
                    smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail,_emailSettings.UsernamePassword);
                    smtp.EnableSsl = true;
                    await smtp.SendMailAsync(mail);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}