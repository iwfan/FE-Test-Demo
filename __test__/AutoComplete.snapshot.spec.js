import React from 'react';
import AutoComplete from '../src/AutoComplete';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer'

describe('As a AutoComplete Component', () => {

    test('should match element', () => {
        const wrap = shallow(<AutoComplete/>);
        expect(wrap.name()).toEqual('form');
        expect(wrap.children().length).toEqual(2);
        expect(wrap.children().at(0).name()).toEqual('input');
        expect(wrap.children().at(1).name()).toEqual('ul');
    })


    test('should match snapshot', () => {
        const json = renderer.create(<AutoComplete/>).toJSON();
        expect(json).toMatchSnapshot();
    })

    test.skip('should match element', () => {
        const wrap = shallow(<AutoComplete/>);
        // expect(wrap.containsAllMatchingElements([
        //     <input type="text" className="search" placeholder="诗名 诗句 诗人"/>,
        // ])).toEqual(true);
        expect(wrap.containsMatchingElement(<ul/>)).toBeTruthy();
    })

})
