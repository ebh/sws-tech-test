import Companies from "components/Companies";
import CompaniesList from "components/CompaniesList";
import CompaniesSearch from "components/CompaniesSearch";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";


describe("Companies when first loaded", () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(<Companies/>);
    });

    it("shows a CompaniesSearch component", () => {
        expect(component.find(CompaniesSearch).length).toEqual(1);
    });

    it("shows a CompaniesList component", () => {
        expect(component.find(CompaniesList).length).toEqual(1);
    });

    it("has no companies when first loaded", () => {
        const abc = component.find(CompaniesList).prop("companies");

        expect(abc.length).toEqual(0);
    });

    it("has no exchanges when first loaded", () => {
        expect(component.find(CompaniesSearch).prop("exchanges").length).toEqual(0);
    });

    it("has no filtered exchanges when first loaded", () => {
        expect(component.find(CompaniesSearch).prop("exchangeNames").length).toEqual(0);
    });
});