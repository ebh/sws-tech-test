export interface CompanyDto {
    name: string
    symbol: string
    exchangeSymbol: string
    price?: number
    volatility?: number
    dividendScore: number // TODO - remove optional null
    futureScore: number // TODO - remove optional null
    healthScore: number // TODO - remove optional null
    managementScore: number // TODO - remove optional null
    pastScore: number // TODO - remove optional null
    valueScore: number // TODO - remove optional null
    miscScore: number // TODO - remove optional null
    totalScore: number // TODO - remove optional null
}
