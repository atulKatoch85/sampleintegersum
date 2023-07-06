using Microsoft.AspNetCore.Mvc;

namespace Integers_Sum.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddController : ControllerBase
    {
        public int Post(IntegerModel request)
        {
            if (request.FirstInteger == 0 || request.SecondInteger == 0)
                throw new ArgumentNullException("FirstNumber or SecondNumber is required");
            return request.FirstInteger + request.SecondInteger;
        }
    }
}