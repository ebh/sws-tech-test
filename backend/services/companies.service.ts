import {CompanyDto} from '../../common/dtos/CompanyDto'
import CompaniesDao, {CompanyRow, PriceRow} from '../daos/companies.dao'
import {std} from 'mathjs';

export class CompaniesService {
    async listWithoutPrice(): Promise<CompanyDto[]> {

        const rows = await CompaniesDao.getCompaniesWithoutPrice();

        return rows.map(row => CompaniesService.ConvertToDtoWithoutPrice(row));
    }

    async listWithPrice(): Promise<CompanyDto[]> {
        const companyRows = await CompaniesDao.getCompaniesWithoutPrice();

        const result: CompanyDto[] = [];

        for await (const row of companyRows) {
            const dto = CompaniesService.ConvertToDtoWithoutPrice(row)

            const prices = await CompaniesDao.getPrices(row.id);

            result.push(CompaniesService.EnrichDto(dto,
                CompaniesService.latestPrice(prices),
                CompaniesService.Volatility(prices)));
        }

        return result;
    }

    public static ConvertToDtoWithoutPrice(input: CompanyRow): CompanyDto {
        return {
            symbol: input.unique_symbol,
            name: input.name,
            exchangeSymbol: input.exchange_symbol,
            price: null, // TODO - Work this out
            volatility: null, // TODO - Work this out
            dividendScore: input.dividend, // TODO - Work this out
            futureScore: input.future, // TODO - Work this out
            healthScore: input.health, // TODO - Work this out
            managementScore: input.management, // TODO - Work this out
            pastScore: input.past, // TODO - Work this out
            valueScore: input.value, // TODO - Work this out
            miscScore: input.misc, // TODO - Work this out
            totalScore: input.total, // TODO - Work this out
        }
    }

    private static EnrichDto(dto: CompanyDto, price: number | null, volatility: number): CompanyDto {
        dto.price = price;
        dto.volatility = volatility;
        return dto;
    }

    public static latestPrice(prices: PriceRow[]): number | null {
        if (prices.length == 0) return null;
        const sortedPrices = prices.sort((a: PriceRow, b: PriceRow) => a.date.localeCompare(b.date));
        return sortedPrices[prices.length-1].price;
    }

    public static Volatility(prices: PriceRow[]): number {
        return std(prices.map(p => p.price));
    }
}

export default new CompaniesService();
