export interface CompanyDto {
    name: string
    symbol: string
    exchangeSymbol: string,
    price?: number
    volatility?: number,
    dividendScore: number
    futureScore: number
    healthScore: number
    managementScore: number
    pastScore: number
    valueScore: number
    miscScore: number
    totalScore: number
}
