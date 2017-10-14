import {
	startGame,
	resizeWindow,
	moveBag,
	stopBag,
	addCupcake,
	addFrosting,
	angleShoot
} from './index';

test('starts the game', () => {
	const fn = startGame();
	const dispatch = jest.fn();
	fn(dispatch);
	const calls = dispatch.mock.calls;
	expect(calls.length).toBe(2);
	expect(calls[0][0]).toEqual({type:'BOARD_START'});
	expect(calls[1][0]).toEqual({type:'FROSTING_START'});
});

test('resizes the board', () => {
	const root = document.createElement('div');
	root.setAttribute('id','root');
	document.body.appendChild(root);
	const fn = resizeWindow();
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValueOnce({board:{margin:9}});
	fn(dispatch,getState);
	const calls = dispatch.mock.calls;
	expect(calls[0][0]).toEqual({type:'BOARD_RESIZE',width:0});
	expect(calls[1][0]).toEqual({type:'BAG_RESIZE',width:0,boardMargin:9});
});

test('moves the bag', () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	const calls = dispatch.mock.calls;
	getState.mockReturnValue({board:{width:100,margin:25}});
	['right','left'].forEach((dir,i) => {
		const fn = moveBag(dir);
		fn(dispatch,getState);
		expect(calls[i][0]).toEqual({
			type:'BAG_MOVE',
			boardWidth:100,
			boardMargin:25,
			direction:dir,
			newXPos:false
		});
	});
	const fn2 = moveBag(28);
	fn2(dispatch,getState);
	expect(calls[2][0]).toEqual({
		type:'BAG_MOVE',
		boardWidth:100,
		boardMargin:25,
		direction:false,
		newXPos:28
	});
});

test('stops the bag', () => {
	expect(stopBag()).toEqual({type:'BAG_STOP'});
});

test('adds a cupcake', () => {
	const fn = addCupcake();
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValue({board:'foo'});
	fn(dispatch,getState);
	const calls = dispatch.mock.calls;
	expect(calls[0][0]).toEqual({type:'CUPCAKES_ADD',id:1001,board:'foo'});
	fn(dispatch,getState);
	expect(calls[1][0]).toEqual({type:'CUPCAKES_ADD',id:1002,board:'foo'});
});

test('adds a blob of frosting', () => {
	const fn = addFrosting();
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValueOnce({bag:{xPos:5,angle:1.3,height:85}});
	fn(dispatch,getState);
	const calls = dispatch.mock.calls;
	expect(calls[0][0]).toEqual({type:'FROSTING_ADD',id:1,xPos:5,angle:1.3,yPos:85});
});

jest.useFakeTimers();

test('shoots frosting at an angle', () => {
	const fn = angleShoot('foo');
	const dispatch = jest.fn();
	const getState = jest.fn();
	getState.mockReturnValueOnce({board:'bar'});
	fn(dispatch,getState);
	const calls = dispatch.mock.calls;
	expect(calls[0][0]).toEqual({
		type:'BAG_ANGLESHOOT',
		e:'foo',
		board:'bar'
	});
	expect(typeof calls[1][0]).toBe('function');
	// Fast-forward until all timers have been executed
	jest.runAllTimers();
	expect(calls[2][0]).toEqual({type:'BAG_UPRIGHT'});
});
