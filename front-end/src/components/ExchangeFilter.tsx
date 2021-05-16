import {
    Checkbox,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Theme,
} from "@material-ui/core";
import React from "react";

interface ExchangeFilterProps {
    exchanges: string[]
    exchangeNames: string[]
    setExchangeNames: React.Dispatch<React.SetStateAction<string[]>>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
    }),
);

const ExchangeFilter: React.FunctionComponent<ExchangeFilterProps> = (props) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setExchangeNames(event.target.value as string[]);
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="exchange-label">Exchanges</InputLabel>
                <Select
                    labelId="exchange-label"
                    id="exchange"
                    multiple
                    value={props.exchangeNames}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={(selected) => (selected as string[]).join(", ")}
                    MenuProps={MenuProps}
                >
                    {props.exchanges.map((exchange) => (
                        <MenuItem key={exchange} value={exchange}>
                            <Checkbox checked={props.exchangeNames.indexOf(exchange) > -1}/>
                            <ListItemText primary={exchange}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

export default ExchangeFilter;
