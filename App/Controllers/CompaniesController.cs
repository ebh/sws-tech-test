using System.Linq;
using App.Dtos;
using App.Repositories;
using App.Utils;
using Microsoft.AspNetCore.Mvc;
using Company = App.Dtos.Company;

namespace App.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly CompaniesRepository _db;

        public CompaniesController(CompaniesRepository db)
        {
            _db = db;
        }

        [HttpGet]
        public Company[] Get(bool includePrices)
        {
            return includePrices
                ? GetWithPrices()
                : GetWithoutPrices();
        }
        
        private Company[] GetWithoutPrices()
        {
            var companies = _db.Companies;

            return companies.Select(company => new Company
                {
                    Name = company.Name,
                    Symbol = company.UniqueSymbol,
                    ExchangeSymbol = company.ExchangeSymbol,
                    DividendScore = company.Score.Dividend,
                    FutureScore = company.Score.Future,
                    HealthScore = company.Score.Health,
                    PastScore = company.Score.Past,
                    ValueScore = company.Score.Value,
                    TotalScore = company.Score.Total,
                })
                .ToArray();
        }

        private Company[] GetWithPrices()
        {
            var companies = _db.Companies;

            return companies.Select(company => new Company
                {
                    Name = company.Name,
                    Symbol = company.UniqueSymbol,
                    ExchangeSymbol = company.ExchangeSymbol,

                    
                    Price = company.CompanyPriceCloses.OrderBy(x => x.Date).Last().Price,
                    Volatility = company.CompanyPriceCloses.Count == 0
                        ? 0
                        : Statistics.StandardDeviation(company.CompanyPriceCloses.Select(x => x.Price).ToArray()),
                    // Note: Skipped limiting volatility cal to last 90 days
                    // because the data in the DB supplied is 12 months old

                    DividendScore = company.Score.Dividend,
                    FutureScore = company.Score.Future,
                    HealthScore = company.Score.Health,
                    PastScore = company.Score.Past,
                    ValueScore = company.Score.Value,
                    TotalScore = company.Score.Total,
                })
                .ToArray();
        }
    }
}