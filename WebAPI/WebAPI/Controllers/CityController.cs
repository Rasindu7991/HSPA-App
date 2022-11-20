using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Atlanta", "New york", "Madrid", "Milan", "Colombo", "Kviv" };
        }

        [HttpGet("{id}")]
        public string GetCity()
        {
            return "Colombo";
        }
    }
}
