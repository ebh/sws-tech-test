export interface CompanyDto {
    name: string
    symbol: string
    exchangeSymbol: string
    price: number | null
    volatility: number | null
    dividendScore: number
    futureScore: number
    healthScore: number
    managementScore: number
    pastScore: number
    valueScore: number
    miscScore: number
    totalScore: number
}
