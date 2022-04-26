using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "user",
                    Email = "user@test.com",
                    PhoneNumber = "1234567890"
                };

                await userManager.CreateAsync(user, "P@ssw0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com",
                    PhoneNumber = "1234567890"
                };

                await userManager.CreateAsync(admin, "P@ssw0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Angular Speedster Board 2000",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    ImagePath = "/images/products/sb-ang1.png",
                    Category = "Angular",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "Green Angular Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    ImagePath = "/images/products/sb-ang2.png",
                    Category = "Angular",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "Core Board Speed Rush 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    ImagePath = "/images/products/sb-core1.png",
                    Category = "NetCore",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "Net Core Super Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    ImagePath = "/images/products/sb-core2.png",
                    Category = "NetCore",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "React Board Super Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    ImagePath = "/images/products/sb-react1.png",
                    Category = "React",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "Typescript Entry Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    ImagePath = "/images/products/sb-ts1.png",
                    Category = "TypeScript",
                    Type = "Boards"
                },
                new Product
                {
                    Name = "Core Blue Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    ImagePath = "/images/products/hat-core1.png",
                    Category = "NetCore",
                    Type = "Hats"
                },
                new Product
                {
                    Name = "Green React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    ImagePath = "/images/products/hat-react1.png",
                    Category = "React",
                    Type = "Hats"
                },
                new Product
                {
                    Name = "Purple React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    ImagePath = "/images/products/hat-react2.png",
                    Category = "React",
                    Type = "Hats"
                },
                new Product
                {
                    Name = "Blue Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    ImagePath = "/images/products/glove-code1.png",
                    Category = "VS Code",
                    Type = "Gloves"
                },
                new Product
                {
                    Name = "Green Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    ImagePath = "/images/products/glove-code2.png",
                    Category = "VS Code",
                    Type = "Gloves"
                },
                new Product
                {
                    Name = "Purple React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    ImagePath = "/images/products/glove-react1.png",
                    Category = "React",
                    Type = "Gloves"
                },
                new Product
                {
                    Name = "Green React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    ImagePath = "/images/products/glove-react2.png",
                    Category = "React",
                    Type = "Gloves"
                },
                new Product
                {
                    Name = "Redis Red Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    ImagePath = "/images/products/boot-redis1.png",
                    Category = "Redis",
                    Type = "Boots"
                },
                new Product
                {
                    Name = "Core Red Boots",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    ImagePath = "/images/products/boot-core2.png",
                    Category = "NetCore",
                    Type = "Boots"
                },
                new Product
                {
                    Name = "Core Purple Boots",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    ImagePath = "/images/products/boot-core1.png",
                    Category = "NetCore",
                    Type = "Boots"
                },
                new Product
                {
                    Name = "Angular Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    ImagePath = "/images/products/boot-ang2.png",
                    Category = "Angular",
                    Type = "Boots"
                },
                new Product
                {
                    Name = "Angular Blue Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    ImagePath = "/images/products/boot-ang1.png",
                    Category = "Angular",
                    Type = "Boots"
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}