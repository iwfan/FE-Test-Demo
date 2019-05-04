import React from 'react';
import AutoComplete from '../src/AutoComplete';
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

describe('As a AutoComplete Component', () => {
    test('1 + 1 equal to 2', () => {
        expect(1 + 1).toEqual(2);
    })

    test('should match snapshot', () => {
        const json = renderer.create(<AutoComplete/>).toJSON();
        expect(json).toMatchSnapshot();
    })

    beforeEach(() => {

    })

    afterEach(() => {

    })

    test('correct event', () => {
        jest.useFakeTimers();
        sinon.spy(AutoComplete.prototype, 'onKeywordChange');
        sinon.spy(AutoComplete.prototype, 'componentDidMount');
        const wrap = mount(<AutoComplete/>);

        expect(AutoComplete.prototype.componentDidMount.called).toEqual(true);
        const inputEl = wrap.find('.search').at(0);
        inputEl.simulate('change', '王维')
        // expect(setTimeout).toHaveBeenCalled();
        expect(AutoComplete.prototype.onKeywordChange.called).toEqual(true);

    })
})
