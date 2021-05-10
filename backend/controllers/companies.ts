import express from 'express';
// @ts-ignore
import {CompanyDto} from "../../common/dtos/CompanyDto";
import companiesService from '../services/companies.service'

export class CompaniesController {
    async listCompanies(req: express.Request, resp: express.Response) {
        let companies: CompanyDto[] = []

        if (CompaniesController.includePrice(req)) {
            companies = await companiesService.listWithPrice();
        } else {
            companies = await companiesService.listWithoutPrice();
        }
        resp.status(200).send(companies);
    }

    private static includePrice(req: express.Request): boolean {
        return req.query.includePrices === "true";
    }
}

export default new CompaniesController();
