using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
    }
}