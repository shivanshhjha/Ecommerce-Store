using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class cartController : BaseApiController
    {
        private readonly StoreContext _context;
        public cartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await RetrieveCart(GetUserId());

            if (cart == null) return NotFound();
            return cart.MapCartToDto();
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            var cart = await RetrieveCart(GetUserId());
            if (cart == null) cart = CreateCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCart", cart.MapCartToDto());
            return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await RetrieveCart(GetUserId());
            if (cart == null) return NotFound();
            cart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from cart" });
        }

        private async Task<Cart> RetrieveCart(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                Response.Cookies.Delete("userId");
                return null;
            }

            return await _context.Carts
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.UserId == userId);
        }

        private string GetUserId()
        {
            return User.Identity?.Name ?? Request.Cookies["userId"];
        }

        private Cart CreateCart()
        {
            var userId = User.Identity?.Name;
            if (string.IsNullOrEmpty(userId))
            {
                userId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("userId", userId, cookieOptions);
            }
            var cart = new Cart { UserId = userId };
            _context.Carts.Add(cart);
            return cart;
        }
    }
}