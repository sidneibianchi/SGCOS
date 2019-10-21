using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SGCOS.Repository;

namespace SGCOS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public readonly ISGCOSRepository _repo;
        public readonly IMapper _mapper;
        public EmailController(ISGCOSRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
    }
}