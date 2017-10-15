import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Cupcakes from './Cupcakes';

test('Initial render', () => {
	const cupcakeArr = [{id:123}];
	const component = renderer.create(
		<Cupcakes cupcakes={cupcakeArr} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

jest.useFakeTimers();

test('Calls onInterval every second for specified # of times', () => {
	const count = 4;
	const mockFn = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(
		<Cupcakes
		cupcakes={[]}
		addCupcake={mockFn}
		count={count} />
	);
	jest.runAllTimers();
	expect(mockFn.mock.calls.length).toBe(count);
});
