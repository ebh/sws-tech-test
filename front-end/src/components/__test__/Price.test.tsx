import {shallow} from "enzyme";
import React from 'react';
import Price from "components/Price";
import NumberFormat from 'react-number-format';

describe('Price', () => {
    it('show a NumberFormat', async () => {
        const component = shallow(<Price value={null} />)

        expect(component.find(NumberFormat).length).toEqual(1);
    })

    it('displays -- when value is null', async () => {
        const component = shallow(<Price value={null} />)

        expect(component.find(NumberFormat).prop('value')).toEqual('--')
    })

    it('rounds to 2 decimal paces', async () => {
        const component = shallow(<Price value={12.345} />)

        expect(component.find(NumberFormat).prop('decimalScale')).toEqual(2)
    })
})
