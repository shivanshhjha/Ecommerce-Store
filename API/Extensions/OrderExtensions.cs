using System.Linq;
using API.DTOs;
using API.Entities.Order;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    UserId = order.UserId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    Total = order.Total,
                    OrderStatus = order.OrderStatus.ToString(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        ProductId = item.ItemOrdered.ProductId,
                        Name = item.ItemOrdered.Name,
                        ImagePath = item.ItemOrdered.ImagePath,
                        Price = item.Price,
                        Quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}