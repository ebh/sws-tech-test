import {shallow, ShallowWrapper} from "enzyme";
import React from 'react';
import Companies from "components/Companies";
import CompaniesSearch from "components/CompaniesSearch";
import CompaniesList from "components/CompaniesList";


describe("Companies", () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(<Companies />);
    })

    it('shows a CompaniesSearch component', () => {
        expect(component.find(CompaniesSearch).length).toEqual(1);
    })

    it('shows a CompaniesList component', () => {
        expect(component.find(CompaniesList).length).toEqual(1);
    })
})