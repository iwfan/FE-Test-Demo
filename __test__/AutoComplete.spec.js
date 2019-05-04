import React from 'react';
import AutoComplete, {endPoint} from '../src/AutoComplete';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import axios from "axios";

describe('As a AutoComplete Component', () => {
    const result = {
        data: [{
            "detail_text": "寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。",
            "title": "行宫",
            "detail_translate_text": [
                "译文",
                "空旷冷落的古旧行宫，只有宫花寂寞地艳红。",
                "几个满头白发的宫女，闲坐无事谈论唐玄宗。",
                "注释",
                "（1）寥（liáo）落：寂寞冷落。",
                "（2）行宫：皇帝在京城之外的宫殿。这里指当时东都洛阳的皇帝行宫上阳宫。",
                "（3）宫花：行宫里的花。",
                "（4）白头宫女：据白居易《上阳白发人》，一些宫女天宝末年被“潜配”到上阳宫，在这冷宫里一闭四十多年，成了白发宫人。",
                "（5）说：谈论。",
                "（6）玄宗：指唐玄宗。"
            ],
            "detail_translate_note_text_title": ["译文及注释"],
            "detail_author": ["元稹"],
            "detail_dynasty": "唐代",
            "detail_background_text": ["　　元稹生活在中唐年代，正值唐朝经历过安史之乱不久，国力的各个方面都在走下坡路之时。该诗就是以小见大地点明了唐朝衰败的重要原因。"]
        }]
    };
    const promise = Promise.resolve(result);

    beforeEach(() => {
        sinon.stub(axios, 'get').withArgs(endPoint).returns(promise);
    })

    afterEach(() => {
        axios.get.restore();
    })

    test('get tangPoetry', () => {
        const wrap = shallow(<AutoComplete/>);
        expect(wrap.state().tangPoetry.length).toEqual(0);
        promise.then(() => {
            expect(wrap.state().tangPoetry.length).toEqual(1);
        })
    })

    test('Respond for the change event', (done) => {
        // sinon.spy(AutoComplete.prototype, 'onKeywordChange');
        const spy = jest.spyOn(AutoComplete.prototype, 'onKeywordChange');
        const wrap = mount(<AutoComplete/>);
        const inputEl = wrap.find('.search').at(0);
        inputEl.simulate('change', {
            target: {value: '王维'}
        })
        setTimeout(() => {
            // expect(AutoComplete.prototype.onKeywordChange.calledWith('王维')).toEqual(true);
            expect(spy).toHaveBeenCalledWith('王维')
            done()
        }, 300)
    })
})
