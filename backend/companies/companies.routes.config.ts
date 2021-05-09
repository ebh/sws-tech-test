import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class CompaniesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CompaniesRoutes');
    }

    configureRoutes() {
        this.app.route('/companies')
            .get((req: express.Request, resp: express.Response) => {
                resp.status(200).send('List of companies')
            });

        return this.app;
    }
}
