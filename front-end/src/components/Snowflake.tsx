import React from "react";
import {ResponsiveRadar} from "@nivo/radar"
import {Box} from "@material-ui/core";
import {Company} from "../Dtos/Company";

interface SnowflakeProps {
    company: Company
}

const Snowflake: React.FunctionComponent<SnowflakeProps> = (props) => {
    const data = [
        {
            "axis": "Value",
            "score": props.company.valueScore,
        },
        {
            "axis": "Future",
            "score": props.company.futureScore,
        },
        {
            "axis": "Past",
            "score": props.company.pastScore,
        },
        {
            "axis": "Health",
            "score": props.company.healthScore,
        },
        {
            "axis": "Dividends",
            "score": props.company.dividendScore,
        },
    ]

    return (
        <Box height={40} width={40}>
            <ResponsiveRadar
                data={data}
                keys={['score']}
                indexBy="axis"
                maxValue={6}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{from: 'color'}}
                gridLevels={1}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots={true}
                dotSize={0}
                colors={{scheme: 'nivo'}}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={false}
                isInteractive={false}
            />
        </Box>
    );
}

export default Snowflake;
