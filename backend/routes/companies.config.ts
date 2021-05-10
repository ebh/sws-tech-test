import express from 'express';

import {CommonRoutesConfig} from '../common/common.routes.config';
import CompaniesController from '../controllers/companies';

export class CompaniesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CompaniesRoutes');
    }

    configureRoutes() {
        this.app.route('/companies')
            .get(CompaniesController.listCompanies);

        return this.app;
    }
}
