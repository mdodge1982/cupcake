import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Frosting from './Frosting';

test('Triggers angleShoot on click', () => {
	const mockFn = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(<Frosting angleShoot={mockFn} frosting={[]} />);
	const ul = ReactTestUtils.findRenderedDOMComponentWithTag(component,'ul');
	ReactTestUtils.Simulate.click(ul);
	expect(mockFn.mock.calls.length).toBe(1);
});
