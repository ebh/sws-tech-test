import Price from "components/Price";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import NumberFormat from "react-number-format";

describe("Price", () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(<Price value={null}/>);
    });

    it("shows a NumberFormat", async () => {
        expect(component.find(NumberFormat).length).toEqual(1);
    });

    it("uses commas to make large numbers easy to read", async () => {
        expect(component.find(NumberFormat).prop("thousandSeparator")).toEqual(true);
    });

    it("always shows 2 decimal places", async () => {
        expect(component.find(NumberFormat).prop("fixedDecimalScale")).toEqual(true);
    });

    it("rounds to 2 decimal paces", async () => {
        expect(component.find(NumberFormat).prop("decimalScale")).toEqual(2);
    });

    it("shows -- when value is null", async () => {
        expect(component.find(NumberFormat).prop("value")).toEqual("--");
    });

    it("shows number when value is NOT null", async () => {
        const value = 12.345;
        component = shallow(<Price value={value}/>);
        expect(component.find(NumberFormat).prop("value")).toEqual(value);
    });

    it("rounds to 2 decimal paces", async () => {
        expect(component.find(NumberFormat).prop("decimalScale")).toEqual(2);
    });
});
