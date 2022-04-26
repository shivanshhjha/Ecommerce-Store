namespace API.DTOs
{
    public class UserDto
    {
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
        public string Token { get; set; }
        public CartDto Cart { get; set; }
    }
}