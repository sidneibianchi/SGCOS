using System.Threading.Tasks;
using SGCOS.Domain;

namespace SGCOS.Repository
{
    public interface ISGCOSRepository
    {
        #region Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
        #endregion

       /*
        #region Cliente
        Task<Cliente[]> GetAllClienteAsync();
        Task<Cliente> GetAllClienteAsyncById(int clienteId);
        Task<Cliente[]> GetAllClienteAsyncByNome(string clienteNome);
        #endregion

        #region Chamado
        Task<Chamado[]> GetAllChamadoAsync();
        Task<Chamado> GetAllChamadoAsyncById(int chamadoId);
        Task<Chamado> GetAllChamadoAsyncByClienteId(int clienteId);

        #endregion*/

        #region Equipamento
        Task<Equipamento[]> GetAllEquipamentoAsync();
        Task<Equipamento> GetAllEquipamentoAsyncById(int equipamentoId);
        Task<Equipamento[]> GetAllEquipamentoAsyncByNrSerie(string nrSerie);

        #endregion

        #region Servico
        Task<Servico[]> GetAllServicoAsync();
        Task<Servico> GetAllServicoAsyncById(int equipamentoId);
        Task<Servico[]> GetAllServicoAsyncByEquipamento(string equipamentoId);

        #endregion
    }
}