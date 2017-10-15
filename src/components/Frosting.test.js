import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Frosting from './Frosting';

test('Initial render', () => {
	const frostingArr = [{id:123}];
	const component = renderer.create(
		<Frosting frosting={frostingArr} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Triggers angleShoot on click', () => {
	const mockFn = jest.fn();
	const frostingArr = [{id:123}]
	const component = ReactTestUtils.renderIntoDocument(
		<Frosting angleShoot={mockFn} frosting={[]} />
	);
	const ul = ReactTestUtils.findRenderedDOMComponentWithTag(component,'ul');
	ReactTestUtils.Simulate.click(ul);
	expect(mockFn.mock.calls.length).toBe(1);
});
