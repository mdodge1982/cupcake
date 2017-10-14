import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import Controls from './Controls';

const reducer = (state = {}) => state;
const store = createStore(reducer);

test('Snapshot test', () => {
	const component = renderer.create(
		<Provider store={store}>
			<Controls />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.wait = 18;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('onClick test', () => {
	const mockFn = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(
		<Provider store={store}>
			<Controls addFrosting={mockFn} />
		</Provider>
	);
	const button = ReactTestUtils.findRenderedDOMComponentWithClass(component,'shoot');
	ReactTestUtils.Simulate.click(button);
	expect(mockFn.mock.calls.length).toBe(1);
});
