using System;
using System.Collections.Generic;

namespace API.Entities.Order
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public long Total { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    }
}