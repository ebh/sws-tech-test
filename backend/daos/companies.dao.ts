import connect, {sql} from '@databases/sqlite';

export interface CompanyRow {
    id: string
    name: string
    ticker_symbol: string
    exchange_symbol: string
    unique_symbol: string
    date_generated: string
    security_name: string
    exchange_country_iso: string
    listing_currency_iso: string
    canonical_url: string
    unique_symbol_slug: string
    score_id: number
    dividend: number
    future: number
    health: number
    management: number
    past: number
    value: number
    misc: number
    total: number
}

export interface PriceRow {
    company_id: string
    date: string
    price: number
}

class CompaniesDao {
    private readonly db: any;

    constructor() {
        this.db = connect('./sws.sqlite3.db');
    }

    async getCompaniesWithoutPrice(): Promise<any[]> {
        let result: any[] = [];

        // TODO - The below assumes 1:1 between tables which is the case with the current data
        const stmt = sql`
            SELECT
                c.id,
                c.name,
                c.exchange_symbol,
                c.unique_symbol,
                s.dividend,
                s.future,
                s.health,
                s.management,
                s.past,
                s.value,
                s.misc,
                s.total
            FROM swsCompany AS c JOIN swsCompanyScore AS s ON c.id = s.company_id;`

        for await (const record of this.db.queryStream(stmt)) {
            result.push(record);
        }

        return result;
    }

    async getPrices(company_id: number): Promise<PriceRow[]> {
        let result: PriceRow[] = [];

        const id = sql.value(company_id);

        const stmt = sql`
            SELECT
                company_id,
                date,
                price
            FROM swsCompanyPriceClose
            WHERE company_id = ${id};`;

        for await (const record of this.db.queryStream(stmt)) {
            result.push(record);
        }

        return result;
    }
}


export default new CompaniesDao();
