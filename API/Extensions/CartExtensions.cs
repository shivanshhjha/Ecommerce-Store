using System.Linq;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDto MapCartToDto(this Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImagePath = item.Product.ImagePath,
                    Category = item.Product.Category,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        public static IQueryable<Cart> RetrieveCartWithItems(this IQueryable<Cart> query, string userId)
        {
            return query.Include(i => i.Items)
                .ThenInclude(p => p.Product).Where(c => c.UserId == userId);
        }
    }
}