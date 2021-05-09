import React from "react";
import NumberFormat from 'react-number-format';

interface PriceProps {
    value: number
}

// Made this a separate component because it seems like something that should be consistent across the broader app
const Price: React.FunctionComponent<PriceProps> = (props) => {
    return (
        <NumberFormat
            value={props.value}
            displayType="text"
            thousandSeparator={true}
            fixedDecimalScale={true}
            decimalScale={2}
        />
    );
}

export default Price;
