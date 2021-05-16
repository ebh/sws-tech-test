import {Checkbox, MenuItem, Select} from "@material-ui/core";
import {shallow} from "enzyme";
import React from "react";
import ExchangeFilter from "../ExchangeFilter";

describe("ExchangeFilter", () => {
    let setExchangeNames: React.Dispatch<React.SetStateAction<string[]>>;

    beforeEach(() => {
        setExchangeNames = jest.fn();
    });

    it("shows list of exchanges with none selected", () => {
        // assemble
        const exchanges = [
            "abc1",
            "abc2",
            "abc3",
        ];

        // Act
        const component = shallow(<ExchangeFilter
            exchanges={exchanges}
            exchangeNames={[]}
            setExchangeNames={setExchangeNames}/>);

        // assert
        expect(component.find(MenuItem).length).toEqual(3);
        expect(component.find(Checkbox).map(x => x.prop("checked"))).toEqual([false, false, false]);
    });

    it("shows list of exchanges with some selected", () => {
        // assemble
        const exchanges = [
            "abc1",
            "abc2",
            "abc3",
        ];
        const exchangeNames = [
            "abc2",
        ];

        // Act
        const component = shallow(<ExchangeFilter
            exchanges={exchanges}
            exchangeNames={exchangeNames}
            setExchangeNames={setExchangeNames}/>);

        // assert
        expect(component.find(MenuItem).length).toEqual(3);
        expect(component.find(Checkbox).map(x => x.prop("checked"))).toEqual([false, true, false]);
    });

    it("calls setExchangeNames() when item selected", () => {
        // assemble
        const exchanges = [
            "abc1",
            "abc2",
            "abc3",
        ];
        const exchangeNames = [
            "abc1",
            "abc2",
        ];

        // Act
        const component = shallow(<ExchangeFilter
            exchanges={exchanges}
            exchangeNames={exchangeNames}
            setExchangeNames={setExchangeNames}/>);

        component.find(Select).simulate("change", {
            target: {
                value: [
                    "abc1",
                    "abc2",
                    "abc3",
                ]
            }
        });

        // assert
        expect(component.find(MenuItem).length).toEqual(3);
        expect(setExchangeNames).toHaveBeenCalledWith([
            "abc1",
            "abc2",
            "abc3",
        ]);
    });
});