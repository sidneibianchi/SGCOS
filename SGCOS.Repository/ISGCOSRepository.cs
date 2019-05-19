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

       
        #region Cliente
        Task<Cliente[]> GetAllClienteAsync();
        Task<Cliente> GetAllClienteAsyncById(int clienteId);
        Task<Cliente[]> GetAllClienteAsyncByNome(string clienteNome);
        #endregion
    }
}