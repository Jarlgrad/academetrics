using System;
using System.Threading.Tasks;
using Academetrics.ExternalApi;
using Microsoft.AspNetCore.Mvc;

namespace Academetrics.Controllers
{
    [Route("api/[controller]")]
    public class MetricsController : Controller{

        [HttpGet]
        public async Task<IActionResult> Get() {
            var greeting = new 
            {
                greeting = "hello yes"
            };

            try
            {
                var vsts = new VstsApi();
                var item = await vsts.GetWorkItemById("that item though");
                return Ok(item);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("too bad :(   ", ex.ToString());
                throw;
            }
            
        }
    }
}