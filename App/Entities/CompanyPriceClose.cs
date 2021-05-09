using System;

#nullable disable

namespace App.Entities
{
    public partial class CompanyPriceClose
    {
        public DateTime Date { get; set; }
        public byte[] CompanyId { get; set; }
        public double Price { get; set; }
        public DateTime DateCreated { get; set; }

        public virtual Company Company { get; set; }
    }
}