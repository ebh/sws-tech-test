import React from "react";
import {Grid} from "@material-ui/core";
import ExchangeFilter from "./ExchangeFilter";
import OverallScoreFilter from "./OverallScoreFilter";

interface CompaniesSearchProps {
    exchanges: string[]
    exchangeNames: string[]
    setExchangeNames: React.Dispatch<React.SetStateAction<string[]>>
    minOverallScore: number
    setMinOverallScore: React.Dispatch<React.SetStateAction<number>>
    maxOverallScore: number
    setMaxOverallScore: React.Dispatch<React.SetStateAction<number>>
}

const CompaniesSearch: React.FunctionComponent<CompaniesSearchProps> = (props) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <ExchangeFilter
                    exchanges={props.exchanges}
                    exchangeNames={props.exchangeNames}
                    setExchangeNames={props.setExchangeNames}
                />
            </Grid>
            <Grid item xs={6}>
                <OverallScoreFilter
                    minOverallScore={props.minOverallScore}
                    setMinOverallScore={props.setMinOverallScore}
                    maxOverallScore={props.maxOverallScore}
                    setMaxOverallScore={props.setMaxOverallScore}
                />
            </Grid>
        </Grid>
    )
}

export default CompaniesSearch;
