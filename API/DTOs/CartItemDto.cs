namespace API.DTOs
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public long Price { get; set; }
        public string ImagePath { get; set; }
        public int Quantity { get; set; }
    }
}