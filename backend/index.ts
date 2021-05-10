import express from 'express';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config'
import {CompaniesRoutes} from './routes/companies.config'

const PORT = 8000;

const app = express();
app.use(cors());

const routes: CommonRoutesConfig[] = [
    new CompaniesRoutes(app),
    // NOTE: More routes can easily be added here
]

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
