using System;

namespace API.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public long Price { get; set; }
        public string ImagePath { get; set; }
    }
}

