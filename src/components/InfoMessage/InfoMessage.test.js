// @flow

import React from 'react';
import { shallow } from 'enzyme';
import InfoMessage from './InfoMessage';

describe('<InfoMessage />', () => {
  const props = { headline: 'Error' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<InfoMessage {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Display a message if there is one', () => {
    const wrapperNoMsg = shallow(<InfoMessage {...props} />);
    expect(wrapperNoMsg.find('.InfoMessage__message')).toHaveLength(0);

    const wrapperMsg = shallow(<InfoMessage {...props} message="Something went wrong" />);
    expect(wrapperMsg.find('.InfoMessage__message')).toHaveLength(1);
  });

  test('Display children if there are some', () => {
    const wrapperNoChildren = shallow(<InfoMessage {...props} />);
    expect(wrapperNoChildren.find('.child')).toHaveLength(0);

    const wrapperChildren = shallow(
      <InfoMessage {...props}>
        <p className="child">A child</p>
      </InfoMessage>
    );
    expect(wrapperChildren.find('.child')).toHaveLength(1);
  });
});
