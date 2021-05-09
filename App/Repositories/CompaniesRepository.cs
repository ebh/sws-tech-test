using App.Entities;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace App.Repositories
{
    public class CompaniesRepository : DbContext
    {
        public CompaniesRepository()
        {
        }

        public CompaniesRepository(DbContextOptions<CompaniesRepository> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompanyPriceClose> CompanyPriceCloses { get; set; }
        public virtual DbSet<CompanyScore> CompanyScores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                 optionsBuilder.UseSqlite("Data Source=sws.sqlite3.db;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("swsCompany");

                entity.Property(e => e.Id)
                    .HasColumnType("uniqueidentifier")
                    .HasColumnName("id");

                entity.Property(e => e.CanonicalUrl)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("canonical_url");

                entity.Property(e => e.DateGenerated)
                    .HasColumnType("datetime2(6)")
                    .HasColumnName("date_generated");

                entity.Property(e => e.ExchangeCountryIso)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("exchange_country_iso");

                entity.Property(e => e.ExchangeSymbol)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("exchange_symbol");

                entity.Property(e => e.ListingCurrencyIso)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("listing_currency_iso");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("name");

                entity.Property(e => e.ScoreId).HasColumnName("score_id");

                entity.Property(e => e.SecurityName)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("security_name");

                entity.Property(e => e.TickerSymbol)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("ticker_symbol");

                entity.Property(e => e.UniqueSymbol)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("unique_symbol");

                entity.Property(e => e.UniqueSymbolSlug)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("unique_symbol_slug");

                entity.HasOne(d => d.Score)
                    .WithMany(p => p.SwsCompanies)
                    .HasForeignKey(d => d.ScoreId);
            });

            modelBuilder.Entity<CompanyPriceClose>(entity =>
            {
                entity.HasKey(e => new {e.Date, e.CompanyId});

                entity.ToTable("swsCompanyPriceClose");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.CompanyId)
                    .HasColumnType("uniqueidentifier")
                    .HasColumnName("company_id");

                entity.Property(e => e.DateCreated)
                    .IsRequired()
                    .HasColumnType("datetime2")
                    .HasColumnName("date_created")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Price)
                    .HasColumnType("float")
                    .HasColumnName("price");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyPriceCloses)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<CompanyScore>(entity =>
            {
                entity.ToTable("swsCompanyScore");

                entity.Property(e => e.Id)
                    .HasColumnType("int identity")
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.CompanyId)
                    .IsRequired()
                    .HasColumnType("uniqueidentifier")
                    .HasColumnName("company_id");

                entity.Property(e => e.DateGenerated)
                    .IsRequired()
                    .HasColumnType("datetime2(6)")
                    .HasColumnName("date_generated");

                entity.Property(e => e.Dividend)
                    .HasColumnType("int")
                    .HasColumnName("dividend");

                entity.Property(e => e.Future)
                    .HasColumnType("int")
                    .HasColumnName("future");

                entity.Property(e => e.Health)
                    .HasColumnType("int")
                    .HasColumnName("health");

                entity.Property(e => e.Management)
                    .HasColumnType("int")
                    .HasColumnName("management");

                entity.Property(e => e.Misc)
                    .HasColumnType("int")
                    .HasColumnName("misc");

                entity.Property(e => e.Past)
                    .HasColumnType("int")
                    .HasColumnName("past");

                entity.Property(e => e.Sentence)
                    .HasColumnType("nvarchar(255)")
                    .HasColumnName("sentence");

                entity.Property(e => e.Total)
                    .HasColumnType("int")
                    .HasColumnName("total");

                entity.Property(e => e.Value)
                    .HasColumnType("int")
                    .HasColumnName("value");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyScores)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            // TODO - Find out more about this
            // OnModelCreatingPartial(modelBuilder);
        }

        private void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            throw new System.NotImplementedException();
        }
    }
}