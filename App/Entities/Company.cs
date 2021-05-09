using System.Collections.Generic;

#nullable disable

namespace App.Entities
{
    public partial class Company
    {
        public Company()
        {
            CompanyPriceCloses = new HashSet<CompanyPriceClose>();
            CompanyScores = new HashSet<CompanyScore>();
        }

        public byte[] Id { get; set; }
        public string Name { get; set; }
        public string TickerSymbol { get; set; }
        public string ExchangeSymbol { get; set; }
        public string UniqueSymbol { get; set; }
        public byte[] DateGenerated { get; set; }
        public string SecurityName { get; set; }
        public string ExchangeCountryIso { get; set; }
        public string ListingCurrencyIso { get; set; }
        public string CanonicalUrl { get; set; }
        public string UniqueSymbolSlug { get; set; }
        public long? ScoreId { get; set; }

        public virtual CompanyScore Score { get; set; }
        public virtual ICollection<CompanyPriceClose> CompanyPriceCloses { get; set; }
        public virtual ICollection<CompanyScore> CompanyScores { get; set; }
    }
}
