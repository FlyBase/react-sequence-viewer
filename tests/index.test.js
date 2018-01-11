import React from 'react';
import expect, {spyOn, createSpy} from 'expect';
import { mount } from 'enzyme';
import jquery from 'jquery';
window.jQuery = jquery;

import 'bootstrap/dist/css/bootstrap.min.css';

import Component from 'src/index';

describe('<Component />', () => {
  const sequence = 'ctcgatgctagtcgatgctagtcgtagcta';

  let seqViewer = document.createElement('div');
  seqViewer.id = 'test';

  beforeEach(() => {
    document.body.appendChild(seqViewer);
  });

  afterEach(() => {
    document.body.removeChild(seqViewer);
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
});

