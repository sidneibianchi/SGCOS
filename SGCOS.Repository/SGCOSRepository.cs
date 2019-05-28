using System;
using System.Linq;
using System.Threading.Tasks;
using SGCOS.Domain;
using Microsoft.EntityFrameworkCore;

namespace SGCOS.Repository
{
    public class SGCOSRepository : ISGCOSRepository
    {
        public readonly SGCOSContext _context;
        public SGCOSRepository(SGCOSContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
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
        public async Task<bool> SaveChangesAsync()
        {
           return (await _context.SaveChangesAsync()) > 0;
        }
        
        #endregion

       /*  #region Cliente

        public async Task<Cliente[]> GetAllClienteAsync()
        {
            IQueryable<Cliente> query = _context.Clientes
                               .Include(c => c.Endereco)
                               .Include(c => c.Telefones);               
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Cliente> GetAllClienteAsyncById(int clienteId)
        {
            IQueryable<Cliente> query = _context.Clientes
                             .Include(c => c.Endereco)
                               .Include(c => c.Telefones);              
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == clienteId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Cliente[]> GetAllClienteAsyncByNome(string clienteNome)
        {
            IQueryable<Cliente> query = _context.Clientes
                .Include(c => c.Endereco)
                .Include(c => c.Telefones);             
            

            query = query.AsNoTracking()
                         .OrderBy(c => c.Nome);
                         

            return await query.ToArrayAsync();
        }

        #endregion

        #region Chamado 

        public async Task<Chamado[]> GetAllChamadoAsync()
        {
            IQueryable<Chamado> query = _context.Chamados
                               .Include(c => c.Cliente);               
               
            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Chamado> GetAllChamadoAsyncById(int chamadoId)
        {
            IQueryable<Chamado> query = _context.Chamados
                             .Include(c => c.Cliente);              
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == chamadoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Chamado> GetAllChamadoAsyncByClienteId(int clienteId)
        {
            IQueryable<Chamado> query = _context.Chamados
                             .Include(c => c.Cliente);              
               

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.ClienteId == clienteId);

            return await query.FirstOrDefaultAsync();
        }
        
        #endregion

*/
        #region Equipamento

        public async Task<Equipamento[]> GetAllEquipamentoAsync()
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                               .Include(e => e.Servicos);               
               
            query = query.AsNoTracking()
                        .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Equipamento> GetAllEquipamentoAsyncById(int equipamentoId)
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                             .Include(e => e.Servicos);              
               

            query = query.AsNoTracking()
                        .OrderBy(e => e.Id)
                        .Where(e => e.Id == equipamentoId);

            return await query.FirstOrDefaultAsync();
        }
        public async Task<Equipamento> GetAllEquipamentoAsyncByNrSerie(string nrSerie)
        {
            IQueryable<Equipamento> query = _context.Equipamentos
                .Include(e => e.Servicos);
                             
                query = query.AsNoTracking()
                         .OrderBy(e => e.Id)
                         .Where(e => e.NrSerie == nrSerie);
                         
            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region Servicos 
        public async Task<Servico[]> GetAllServicoAsync()
        {
            IQueryable<Servico> query = _context.Servicos;               
               
            query = query.AsNoTracking()
                        .OrderBy(s => s.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Servico> GetAllServicoAsyncById(int servicoId)
        {
           IQueryable<Servico> query = _context.Servicos;              
               

            query = query.AsNoTracking()
                        .OrderBy(e => e.Id)
                        .Where(e => e.Id == servicoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Servico[]> GetAllServicoAsyncByEquipamento(string equipamentoId)
        {
            IQueryable<Servico> query = _context.Servicos;
                             
                query = query.AsNoTracking()
                         .OrderBy(s => s.Id)
                         .Where(s => s.EquipamentoId == Convert.ToInt32(equipamentoId ));
                         
            return await query.ToArrayAsync();
        }

        #endregion
    }
}