import React from "react";
import {Grid, TextField} from "@material-ui/core";
import {MIN_OVERALL_SCORE, MAX_OVERALL_SCORE} from "./Companies";

interface OverallScoreFilterProps {
    minOverallScore: number
    setMinOverallScore: React.Dispatch<React.SetStateAction<number>>
    maxOverallScore: number
    setMaxOverallScore: React.Dispatch<React.SetStateAction<number>>
}

const OverallScoreFilter: React.FunctionComponent<OverallScoreFilterProps> = (props) => {

    const minErrorMessage = (): string => {
        if (props.minOverallScore < 0) return "Must be greater or equal to 0";
        if (props.minOverallScore > MAX_OVERALL_SCORE) return "Must be less than " + MAX_OVERALL_SCORE;
        if (props.minOverallScore >= props.maxOverallScore) return "Must be less than max overall score";
        return "";
    }

    const maxErrorMessage = (): string => {
        if (props.maxOverallScore > MAX_OVERALL_SCORE) return "Must be less than or equal to " + MAX_OVERALL_SCORE;
        if (props.maxOverallScore <= MIN_OVERALL_SCORE) return "Must be greater than " + MIN_OVERALL_SCORE;
        if (props.minOverallScore >= props.maxOverallScore) return "Must be greater than min overall score";
        return "";
    }

    const minError = (): boolean => minErrorMessage() != "";
    const maxError = (): boolean => maxErrorMessage() != "";

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setMinOverallScore(parseInt(event.target.value));
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setMaxOverallScore(parseInt(event.target.value));
    };

    return (
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    error={minError()}
                    helperText={minErrorMessage()}
                    label="Min Overall Score"
                    type="number"
                    defaultValue={props.minOverallScore}
                    onChange={handleMinChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    error={maxError()}
                    helperText={maxErrorMessage()}
                    label="Max Overall Score"
                    type="number"
                    defaultValue={props.maxOverallScore}
                    onChange={handleMaxChange}
                />
            </Grid>
        </Grid>
    )
}

export default OverallScoreFilter;