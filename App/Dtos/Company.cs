namespace App.Dtos
{
    public class Company
    {
        public string Name { get; init; }
        public string ExchangeSymbol { get; init; }
        public string Symbol { get; init; }
        public double? Price { get; init; }
        public double? Volatility { get; init; }
        public int DividendScore { get; init; }
        public int FutureScore { get; init; }
        public int HealthScore { get; init; }
        public int PastScore { get; init; }
        public int ValueScore { get; init; }
        public int TotalScore { get; init; }
    }
}