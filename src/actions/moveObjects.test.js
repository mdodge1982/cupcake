import moveObjects from './moveObjects';

const state = {
	cupcakes: {
		movingIds: [],
		visibleIds: [],
		byId: {}
	},
	frosting: {
		movingIds: [],
		visibleIds: [],
		byId: {}
	},
	board: {
		trash: {
			xPos: 19,
			yPos: 11,
			width: 16,
			height: 18
			//trash dest = [23,20]
		},
		box: {
			xPos: 223,
			yPos: 13,
			width: 21,
			height: 12
			//box dest = [230,17]
		}
	}
};
const cakeId = 7;
const frostingId = 9;
const cupcakesMove = { type: 'CUPCAKES_MOVE', id: cakeId };
const frostingMove = { type: 'FROSTING_MOVE', id: frostingId };
const cupcakesRemove = { type: 'CUPCAKES_REMOVE', id: cakeId };
const makeMockCupcake = (data = {}) => {
	state.cupcakes.byId[cakeId] = {frosted:'',width:10,height:10,...data};
	state.cupcakes.movingIds.push(cakeId);
	state.cupcakes.visibleIds.push(cakeId);
};
const makeMockFrosting = (data = {}) => {
	state.frosting.byId[frostingId] = {width:10,height:10,...data};
	state.frosting.movingIds.push(frostingId);
	state.frosting.visibleIds.push(frostingId);
};

describe('moveObjects', () => {
	const fn = moveObjects();
	const getState = jest.fn();
	let dispatch = null;
	let calls = null;
	getState.mockReturnValue(state);

	beforeEach(() => {
		dispatch = jest.fn(cb => {
			if(typeof cb==='function'){
				cb(dispatch,getState);
			}else{
				return cb;
			}
		});
	});

	test('triggers no moves when no cupcakes or frosting exist', () => {
		fn(dispatch,getState);
		expect(dispatch).not.toHaveBeenCalled();
	});

	test('triggers cupcake move', () => {
		makeMockCupcake();
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(2);
		expect(calls[1][0]).toEqual({...cupcakesMove});
	});

	test('triggers cupcake move toward trash', () => {
		state.cupcakes.byId[cakeId].xPos = 22;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(3);
		expect(calls[1][0]).toEqual({ type: 'CUPCAKES_TRASH', id: cakeId });
		expect(calls[2][0]).toEqual({...cupcakesMove});
	});

	test('triggers cupcake removal into trash', () => {
		state.cupcakes.byId[cakeId].yPos = 18;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(4);
		expect(calls[2][0]).toEqual({...cupcakesRemove});
		expect(calls[3][0]).toEqual({ type: 'BOARD_REMOVECUPCAKE', status: 'trash' });
	});

	test('triggers cupcake removal into box', () => {
		state.cupcakes.byId[cakeId].xPos = 231;
		state.cupcakes.byId[cakeId].yPos = 16;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(4);
		expect(calls[2][0]).toEqual({...cupcakesRemove});
		expect(calls[3][0]).toEqual({ type: 'BOARD_REMOVECUPCAKE', status: 'box' });
	});

	test('no frosting move if blog exists but yPos is 0', () => {
		state.cupcakes = {
			movingIds: [],
			visibleIds: [],
			byId: {}
		};
		makeMockFrosting({yPos:0});
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(1);
	});

	test('triggers frosting move', () => {
		state.frosting.byId[frostingId].yPos = 1;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(2);
		expect(calls[1][0]).toEqual({...frostingMove});
	});

	test('detects no collision b/t frosting and cupcake', () => {
		makeMockCupcake({xPos:50,yPos:50});
		state.frosting.byId[frostingId].yPos = 91;
		state.frosting.byId[frostingId].xPos = 91;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(4);
		expect(calls[1][0]).toEqual({...frostingMove});
	});

	test('detects collision b/t frosting and cupcakes (fail)', () => {
		state.frosting.byId[frostingId].yPos = 51;
		state.frosting.byId[frostingId].xPos = 51;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(5);
		expect(calls[1][0]).toEqual({
			type:'CUPCAKES_FROST',
			success:false,
			destination:[23,20],
			id:cakeId
		});
	});

	test('detects collision b/t frosting and cupcakes (success)', () => {
		state.frosting.byId[frostingId].prevYPos = 52;
		fn(dispatch,getState);
		const calls = dispatch.mock.calls;
		expect(calls.length).toBe(5);
		expect(calls[1][0]).toEqual({
			type:'CUPCAKES_FROST',
			success:true,
			destination:[230,17],
			id:cakeId
		});
	});
});
