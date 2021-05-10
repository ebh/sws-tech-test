import React, {useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import Snowflake from "./Snowflake";
import {Company} from "../Dtos/Company";
import Price from "./Price";

interface CompaniesListProps {
    companies: Company[]
}

type Order = "asc" | "desc";

interface EnhancedTableProps {
    order: Order
    orderBy: string
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Company) => void
}

function CompaniesListHeader(props: EnhancedTableProps) {

    const createSortHandler = (property: keyof Company) => (event: React.MouseEvent<unknown>) => {
        props.onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>


                <TableCell
                    key="price"
                    sortDirection={props.orderBy === "price" ? props.order : false}
                    align="right"
                >
                    <TableSortLabel
                        active={props.orderBy === "price"}
                        direction={props.orderBy === "price" ? props.order : 'asc'}
                        onClick={createSortHandler("volatility")}
                    >
                        Price
                        {props.orderBy === "price" ? (
                            <span>
                                {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>

                <TableCell
                    key="score"
                    sortDirection={props.orderBy === "score" ? props.order : false}
                >
                    <TableSortLabel
                        active={props.orderBy === "score"}
                        direction={props.orderBy === "score" ? props.order : 'asc'}
                        onClick={createSortHandler("totalScore")}
                    >
                        Score
                        {props.orderBy === "score" ? (
                            <span>
                                {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((elem, index) => [elem, index] as [T, number]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] = b[1];
    });
    return stabilizedThis.map((elem) => elem[0]);
}

const CompaniesList: React.FunctionComponent<CompaniesListProps> = (props) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Company>('totalScore');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Company) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const displayCompany = (company: Company) => {
        return (
            <TableRow>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.symbol}</TableCell>
                <TableCell align="right"><Price value={company.price}/></TableCell>
                <TableCell><Snowflake company={company}/></TableCell>
            </TableRow>
        );
    }

    return (
        <TableContainer>
            <Table>
                <CompaniesListHeader
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {stableSort(props.companies, getComparator(order, orderBy))
                        .map((row) => displayCompany(row))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CompaniesList;
