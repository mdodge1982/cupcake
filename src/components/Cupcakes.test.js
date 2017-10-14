import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Cupcakes from './Cupcakes';

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
