using System.Collections.Generic;

#nullable disable

namespace App.Entities
{
    public partial class CompanyScore
    {
        public CompanyScore()
        {
            SwsCompanies = new HashSet<Company>();
        }

        public long Id { get; set; }
        public byte[] CompanyId { get; set; }
        public byte[] DateGenerated { get; set; }
        public int Dividend { get; set; }
        public int Future { get; set; }
        public int Health { get; set; }
        public int Management { get; set; }
        public int Past { get; set; }
        public int Value { get; set; }
        public int Misc { get; set; }
        public int Total { get; set; }
        public string Sentence { get; set; }

        public virtual Company Company { get; set; }
        public virtual ICollection<Company> SwsCompanies { get; set; }
    }
}