import React from 'react';
import expect, {spyOn, createSpy} from 'expect';
import { mount, shallow } from 'enzyme';

import Component from 'src/';

describe('<Component />', () => {
    const sequence = 'ctcgatgctagtcgatgctagtcgtagcta';

    let parent = document.createElement('div');
    parent.id = 'test';

    beforeEach(() => {
        document.body.appendChild(parent);
    });

    afterEach(() => {
        document.body.removeChild(parent);
    });

    it('calls componentDidMount', () => {
        const spy = spyOn(Component.prototype, 'componentDidMount');
        const wrapper = mount(<Component id="test" sequence="cgtagtcgatca" />);
        expect(spy).toHaveBeenCalled();
    });

    it('checking required props', () => {
        const wrapper = mount(<Component id="test" sequence={sequence} />);
        expect(wrapper.props().sequence).toEqual(sequence);
        expect(wrapper.props().id).toEqual("test");
    });

    /*it('charsPerLine onClick handler fired', () => {
        const spy = createSpy();
        const wrapper = mount(<Component id="test" sequence={sequence} toolbar={true} handleChange={spy} />);
        console.debug(wrapper.find('.sequenceToolbar'));
        wrapper.find('option[value="100"]').simulate('click');
        expect(spy).toHaveBeenCalled();
        });*/
});

