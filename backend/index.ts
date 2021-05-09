import express from 'express';
import {CommonRoutesConfig} from './common/common.routes.config'
import {CompaniesRoutes} from './companies/companies.routes.config'

const PORT = 8000;

const app = express();
const routes: CommonRoutesConfig[] = [
    new CompaniesRoutes(app),
]


app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
