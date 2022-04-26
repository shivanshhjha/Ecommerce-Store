using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<CartItem> Items { get; set; } = new();
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.ProductId))
            {
                Items.Add(new CartItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ProductId);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}