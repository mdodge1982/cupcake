import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import Arrow from './Arrow';

const reducer = (state = {}) => state;
const store = createStore(reducer);

test('Render right arrow', () => {
	const component = renderer.create(
		<Provider store={store}>
			<Arrow direction="right" />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Render left arrow', () => {
	const component = renderer.create(
		<Provider store={store}>
			<Arrow direction="left" />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

jest.useFakeTimers();

test('Mouse event test', () => {
	const mockMove = jest.fn();
	const mockStop = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(
		<Arrow direction="left" store={store} moveBag={mockMove} stopBag={mockStop} />
	);
	const button = ReactTestUtils.findRenderedDOMComponentWithTag(component,'button');
	ReactTestUtils.Simulate.mouseDown(button);
	jest.runTimersToTime(51);
	ReactTestUtils.Simulate.mouseUp(button);
	expect(mockMove.mock.calls.length).toBe(1);
	expect(mockMove.mock.calls[0][0]).toBe('left');
	expect(mockStop.mock.calls.length).toBe(1);
});
