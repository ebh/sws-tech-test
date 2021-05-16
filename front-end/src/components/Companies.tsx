import axios from "axios";
import React, {useEffect, useState} from "react";
import {CompanyDto} from "../../../common/dtos/CompanyDto";
import CompaniesList from "./CompaniesList";
import CompaniesSearch from "./CompaniesSearch";

const getExchanges = (companies: CompanyDto[]): string[] => {
    return companies.map(x => x.exchangeSymbol)
        .filter((value, index, self) => self.indexOf(value) === index);
};

export const MIN_OVERALL_SCORE = 0;
export const MIX_INDIVIDUAL_SCORE = 6;
export const NUM_OF_SCORE_AXIS = 5;
export const MAX_OVERALL_SCORE = MIX_INDIVIDUAL_SCORE * NUM_OF_SCORE_AXIS;

const Companies: React.FunctionComponent = () => {
    const [companies, setCompanies] = useState<CompanyDto[]>([]);
    const [allExchanges, setAllExchanges] = useState<string[]>([]);
    const [filteredExchanges, setFilteredExchanges] = useState<string[]>([]);
    const [minOverallScore, setMinOverallScore] = useState<number>(MIN_OVERALL_SCORE);
    const [maxOverallScore, setMaxOverallScore] = useState<number>(MAX_OVERALL_SCORE);

    useEffect(() => {
        async function getMyData() {
            const resp = await axios.get("http://localhost:8000/Companies", {
                params: {includePrices: true},
            });

            const body = await resp.data;

            setCompanies(body);
            setAllExchanges(getExchanges(body));
            setFilteredExchanges(getExchanges(body));
        }

        getMyData();
    }, []);

    const filterCompanies = (): CompanyDto[] => {
        const withinOverallScoreRange = (value: number): boolean => minOverallScore <= value && value <= maxOverallScore;

        return companies
            .filter((value) => withinOverallScoreRange(value.totalScore))
            .filter((value) => filteredExchanges.indexOf(value.exchangeSymbol) > -1);
    };

    return (
        <React.Fragment>
            <CompaniesSearch
                exchanges={allExchanges}
                exchangeNames={filteredExchanges}
                setExchangeNames={setFilteredExchanges}
                minOverallScore={minOverallScore}
                setMinOverallScore={setMinOverallScore}
                maxOverallScore={maxOverallScore}
                setMaxOverallScore={setMaxOverallScore}
            />
            <CompaniesList companies={filterCompanies()}/>
        </React.Fragment>
    );
};

export default Companies;
