import React from 'react';
import frosting from './frosting';

let frostingState;

let frostingId = 1;
test('FROSTING_ADD', () => {
	const width = 24;
	const action = {
		type: 'FROSTING_ADD',
		id: frostingId,
		xPos: 345,
		yPos: 100,
		angle: 1.4
	};
	const xPos = action.xPos-(width/2);
	frostingState = frosting(frostingState,action);
	expect(frostingState).toMatchObject({
		byId: {
			[frostingId]: {
				id: frostingId,
				xPos,
				x0: xPos,
				y0: action.yPos,
				prevYPos: 1,
				yPos: 1,
				height: 40,
				width: width,
				angle: action.angle
			}
		},
		visibleIds: [frostingId],
		movingIds: [frostingId]
	});
	const blob = frostingState.byId[frostingId];
	expect(blob.startTime/1000).toBeCloseTo(new Date().getTime()/1000,1);
});

jest.useFakeTimers();

test('FROSTING_MOVE', () => {
	const DATE_TO_USE = new Date(new Date().getTime()+1000);
	const _Date = Date;
	global.Date = jest.fn(() => DATE_TO_USE);
	frostingState = frosting(frostingState,{
		type: 'FROSTING_MOVE',
		id: frostingId
	});
	expect(Math.floor(frostingState.byId[frostingId].xPos)).toBe(469);
	expect(Math.floor(frostingState.byId[frostingId].yPos)).toBe(388);
	global.Date = _Date;
});

test('FROSTING_REMOVE', () => {
	frostingState = frosting(frostingState,{type:'FROSTING_REMOVE',id:frostingId});
	expect(frostingState).toEqual({
		byId: {},
		visibleIds: [],
		movingIds: []
	});
});

test('FROSTING_START', () => {
	frostingState = frosting(frostingState,{
		type: 'FROSTING_ADD',
		id: frostingId,
		xPos: 345,
		yPos: 100,
		angle: 1.4
	});
	frostingState = frosting(frostingState,{type:'FROSTING_START',id:frostingId});
	expect(frostingState).toEqual({
		byId: {},
		visibleIds: [],
		movingIds: []
	});
});
