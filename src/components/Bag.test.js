import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import Bag from './Bag';

const bag = {
	facing: 'front',
	angle: 0,
	xPos: 145,
	width: 50,
	height: 100
};
const reducer = (state = {bag}) => state;
const store = createStore(reducer);

test('Initial render', () => {
	const component = renderer.create(
		<Provider store={store}>
			<Bag {...bag} />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Render after moving', () => {
	bag.facing = 'left';
	bag.angle = 1.6;
	bag.xPos = 29;
	const component = renderer.create(
		<Provider store={store}>
			<Bag {...bag} />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


test('Keyboard events test', () => {
	const mockMove = jest.fn();
	const mockStop = jest.fn();
	const mockFrosting = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(
		<Bag
			store={store}
			bag={bag}
			moveBag={mockMove}
			stopBag={mockStop}
			addFrosting={mockFrosting}
		/>
	);
	// const button = ReactTestUtils.findRenderedDOMComponentWithClass(component,'shoot');
	// ReactTestUtils.Simulate.keyDown(document, {keyCode: 37, which: 37});
	const keyDown32 = new KeyboardEvent('keydown',{
		keyCode: 32
	});
	const keyDown37 = new KeyboardEvent('keydown',{
		keyCode: 37
	});
	const keyDown39 = new KeyboardEvent('keydown',{
		keyCode: 39
	});
	const keyUp37 = new KeyboardEvent('keyup',{
		keyCode: 37
	});
	const keyUp39 = new KeyboardEvent('keyup',{
		keyCode: 39
	});
	document.dispatchEvent(keyDown32);
	document.dispatchEvent(keyDown39);
	document.dispatchEvent(keyUp39);
	document.dispatchEvent(keyDown37);
	document.dispatchEvent(keyUp37);
	expect(mockFrosting.mock.calls.length).toBe(1);
	expect(mockMove.mock.calls.length).toBe(2);
	expect(mockStop.mock.calls.length).toBe(2);
});
