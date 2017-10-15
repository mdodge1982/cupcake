import React from 'react';
import bag from './bag';

let bagState;

test('Initial state', () => {
	bagState = bag(bagState,{});
	expect(bagState).toEqual({
		facing: 'front',
		xPos: 0,
		angle: 1.57,
		width: 46,
		height: 100
	});
});

const moveBag = {
	type:'BAG_MOVE',
	direction:'left',
	boardWidth: 700
};

test('BAG_MOVE', () => {
	bagState.xPos = 350;
	bagState = bag(bagState,{...moveBag});
	expect(bagState.xPos).toBe(340);
	expect(bagState.facing).toBe('left');
});

test('BAG_STOP', () => {
	bagState = bag(bagState,{type:'BAG_STOP'});
	expect(bagState.facing).toBe('front');
});

test('BAG_ANGLESHOOT', () => {
	const e = {
		nativeEvent: {
			offsetX: 99,
			offsetY: 106
		}
	}
	const board = {height:400};
	const angleShoot = {type:'BAG_ANGLESHOOT',e,board};
	bagState = bag(bagState,{type:'BAG_ANGLESHOOT',e,board});
	expect(bagState.angle).toBe(2);

	e.nativeEvent.offsetX = 340;
	bagState = bag(bagState,angleShoot);
	expect(bagState.angle.toFixed(2)).toBe('1.57');

	e.nativeEvent.offsetX = 370;
	bagState = bag(bagState,angleShoot);
	expect(bagState.angle.toFixed(2)).toBe('1.47');

	e.nativeEvent.offsetX = 570;
	bagState = bag(bagState,angleShoot);
	expect(bagState.angle).toBe(1.1);
});

test('BAG_UPRIGHT', () => {
	bagState = bag(bagState,{type:'BAG_UPRIGHT'});
	expect(bagState.angle).toBe(1.57);
});

test('BAG_RESIZE', () => {
	bagState = bag(bagState,{type:'BAG_RESIZE',width:360,boardMargin:15});
	expect(bagState.xPos).toBe(299);
});
