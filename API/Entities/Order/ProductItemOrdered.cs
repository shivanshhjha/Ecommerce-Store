using Microsoft.EntityFrameworkCore;

namespace API.Entities.Order
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
    }
}