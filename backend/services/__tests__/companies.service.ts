import {CompaniesService} from '../companies.service'
import {PriceRow} from "../../daos/companies.dao";

describe('latestPrice', () => {
    it('should return null when empty array received', () => {
        const result = CompaniesService.latestPrice([]);
        expect(result).toEqual(null);
    })

    it('should return price when array length 1 received', () => {
        const input: PriceRow[] = [
            {
                company_id: 'abc',
                date: '2020-01-01',
                price: 1,
            }
        ]
        const result = CompaniesService.latestPrice(input);
        expect(result).toEqual(1);
    })

    it('should return price when array with many elements already sorted received', () => {
        const input: PriceRow[] = [
            {
                company_id: 'abc',
                date: '2020-01-01',
                price: 1,
            },
            {
                company_id: 'abc',
                date: '2020-01-02',
                price: 2,
            },
            {
                company_id: 'abc',
                date: '2020-01-03',
                price: 3,
            },
        ]
        const result = CompaniesService.latestPrice(input);
        expect(result).toEqual(3);
    })

    it('should return price when array with many elements not sorted received', () => {
        const input: PriceRow[] = [
            {
                company_id: 'abc',
                date: '2020-01-01',
                price: 1,
            },
            {
                company_id: 'abc',
                date: '2020-01-03',
                price: 3,
            },
            {
                company_id: 'abc',
                date: '2020-01-02',
                price: 2,
            },

        ]
        const result = CompaniesService.latestPrice(input);
        expect(result).toEqual(3);
    })
})
