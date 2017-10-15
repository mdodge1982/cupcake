import React from 'react';
import cupcakes from './cupcakes';

let cupcakesState;

const cakeHeight = 54;
const width = 700;
const boxWidth = 100;
const board = {
	width: width,
	height: 440,
	margin: 10,
	trash: {
		height: 100
	}
}
const yPosArr = [120,248,376];

let cupcakeId = 1001;
test('CUPCAKES_ADD', () => {
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_ADD',
		id: cupcakeId,
		board
	});
	expect(cupcakesState).toMatchObject({
		byId: {
			[cupcakeId]: {
				id: cupcakeId,
				width: 40,
				height: cakeHeight,
				frosted: '',
				xPos: board.width,
				wait: 0
			}
		},
		visibleIds: [cupcakeId],
		movingIds: [cupcakeId]
	});
	const cake = cupcakesState.byId[cupcakeId];
	expect(cake.yPos).toBe(yPosArr[cake.row]);
});

test('CUPCAKES_REMOVE', () => {
	cupcakesState = cupcakes(cupcakesState,{type:'CUPCAKES_REMOVE',id:cupcakeId});
	expect(cupcakesState).toEqual({
		byId: {},
		visibleIds: [],
		movingIds: []
	});
});

test('CUPCAKES_MOVE (unfrosted)', () => {
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_ADD',
		id: cupcakeId,
		board
	});
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_MOVE',
		id: cupcakeId
	});
	expect(cupcakesState.byId[cupcakeId].xPos).toBe(697);
});

test('CUPCAKES_FROST (fail)', () => {
	const dest = [10,10];
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_FROST',
		id: cupcakeId,
		success: false,
		destination: dest
	});
	expect(cupcakesState.byId[cupcakeId]).toMatchObject({
		frosted: 'failed',
		destination: dest,
		wait: 20
	})
});

test('CUPCAKES_FROST (succeed)', () => {
	cupcakeId++;
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_ADD',
		id: cupcakeId,
		board
	});
	const dest = [700,10];
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_FROST',
		id: cupcakeId,
		success: true,
		destination: dest
	});
	expect(cupcakesState.byId[cupcakeId]).toMatchObject({
		frosted: 'frosted',
		destination: dest,
		wait: 20
	})
});

test('CUPCAKES_MOVE (frosted)', () => {
	let cake = cupcakesState.byId[cupcakeId];
	const origXPos = cake.xPos;
	const origYPos = cake.yPos;
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_MOVE',
		id: cupcakeId
	});
	//wait, no move
	cake = cupcakesState.byId[cupcakeId];
	expect(cake).toMatchObject({
		xPos: origXPos-3,
		yPos: origYPos,
		wait: 19
	});
	cake.wait = 0;
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_MOVE',
		id: cupcakeId
	});
	cake = cupcakesState.byId[cupcakeId];
	expect(Math.ceil(cake.xPos)).toBe(698);
	expect(Math.ceil(cake.yPos)).toBeLessThan(yPosArr[cake.row]);
	//failed
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_MOVE',
		id: cupcakeId-1
	});
	cake = cupcakesState.byId[cupcakeId-1];
	expect(Math.ceil(cake.xPos)).toBe(694);
});

test('CUPCAKES_TRASH', () => {
	cupcakeId++;
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_ADD',
		id: cupcakeId,
		board
	});
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_TRASH',
		id: cupcakeId
	});
	let cake = cupcakesState.byId[cupcakeId];
	expect(cake.trashed).toBe(true);
	const yPos = cake.yPos;
	cupcakesState = cupcakes(cupcakesState,{
		type: 'CUPCAKES_MOVE',
		id: cupcakeId
	});
	cake = cupcakesState.byId[cupcakeId];
	expect(cake.yPos).toBe(yPos-10);
});
