using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class productsController : BaseApiController
    {
        private readonly StoreContext _context;

        public productsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Categories, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{productid}")]
        public async Task<ActionResult<Product>> GetProduct(int productid)
        {
            var product = await _context.Products.FindAsync(productid);

            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var categories = await _context.Products.Select(p => p.Category).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { categories, types });
        }
    }
}