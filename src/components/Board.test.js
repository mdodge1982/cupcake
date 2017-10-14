import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import renderer from 'react-test-renderer';
import Board from './Board';

const board = {
	width: 667,
	height: 430,
	gameStarted: false,
	gameOver: false,
	trash: {count: 0},
	box: {count: 0}
};
const cupcakes = {
	byId: {},
	visibleIds: []
};
const frosting = {
	byId: {},
	visibleIds: []
};
const reducer = (state = {board,cupcakes,frosting}) => state;
const store = createStore(reducer);

const testSnapshot = () => {
	const component = renderer.create(
		<Provider store={store}>
			<Board {...board} />
		</Provider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
};

test('Snapshot test game not started', () => {
	testSnapshot();
});

test('Snapshot test game started', () => {
	board.width = 685;
	board.height = 398;
	board.gameStarted = true;
	testSnapshot();
});

test('Snapshot test game OVER', () => {
	board.gameOver = true;
	board.trash.count = 5;
	board.box.count = 14;
	testSnapshot();
});

jest.useFakeTimers();

test('onClick test', () => {
	const mockStart = jest.fn();
	const mockMove = jest.fn();
	board.gameOver = false;
	board.gameStarted = false;
	const component = ReactTestUtils.renderIntoDocument(
		<Board store={store} startGame={mockStart} moveObjects={mockMove} {...board} />
	);
	const button = ReactTestUtils.findRenderedDOMComponentWithClass(component,'play');
	ReactTestUtils.Simulate.click(button);
	jest.runTimersToTime(26);
	clearInterval(component.state.int);
	expect(mockStart.mock.calls.length).toBe(1);
	expect(mockMove.mock.calls.length).toBe(1);
});
