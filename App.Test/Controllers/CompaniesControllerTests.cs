using System.Linq;
using App.Controllers;
using App.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace App.Test.Controllers
{
    public class CompaniesControllerTests
    {
        private readonly CompaniesRepository _db;

        public CompaniesControllerTests()
        {
            var options = new DbContextOptionsBuilder<CompaniesRepository>()
                .UseSqlite("Data Source=../../../../App/sws.sqlite3.db;")
                .Options;
            _db = new CompaniesRepository(options);
        }
        
        [Fact]
        public void Get_WhenCalledWithIncludePricesFalse_DoesNotReturnPrices()
        {
            // Assemble
            var sut = new CompaniesController(_db);

            // Act
            var result = sut.Get(false);

            // Assert
            result.Should().HaveCount(12);
            result.All(x => x.Price is null).Should().BeTrue();
            result.All(x => x.Volatility is null).Should().BeTrue();
        }
        
        [Fact]
        public void Get_WhenCalledWithIncludePricesTrue_ReturnsPrices()
        {
            // Assemble
            var sut = new CompaniesController(_db);

            // Act
            var result = sut.Get(true);

            // Assert
            result.Should().HaveCount(12);
            result.All(x => x.Price is not null).Should().BeTrue();
            result.All(x => x.Volatility is not null).Should().BeTrue();
        }
    }
}