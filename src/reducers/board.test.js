import React from 'react';
import board from './board';

let boardState;
const width = 0;
const margin = 10;
const boxWidth = 100;

test('Initial state', () => {
	boardState = board(boardState,{});
	expect(boardState).toEqual({
		width: width,
		height: 440,
		cupcakeCount: 20,
		gameStarted: false,
		gameOver: false,
		margin: margin,
		trash: {
			width: 71,
			height: 100,
			xPos: margin,
			yPos: margin,
			type: 'trash',
			count: 0
		},
		box: {
			width: boxWidth,
			height: 88,
			xPos: width-boxWidth-margin,
			yPos: margin,
			type: 'box',
			count: 0
		}
	});
});

test('BOARD_START', () => {
	boardState = board(boardState,{type:'BOARD_START'});
	expect(boardState.gameStarted).toBe(true);
});

test('BOARD_RESIZE', () => {
	boardState = board(boardState,{
		type:'BOARD_RESIZE',
		width: 430
	});
	expect(boardState.width).toBe(430);
	expect(boardState.box.xPos).toBe(320);
});

test('BOARD_REMOVECUPCAKE', () => {
	boardState = board(boardState,{type:'BOARD_REMOVECUPCAKE',status:'trash'});
	expect(boardState.cupcakeCount).toBe(19);
	expect(boardState.trash.count).toBe(1);
	boardState = board(boardState,{type:'BOARD_REMOVECUPCAKE',status:'box'});
	expect(boardState.cupcakeCount).toBe(18);
	expect(boardState.box.count).toBe(1);
	boardState.cupcakeCount = 1;
	boardState = board(boardState,{type:'BOARD_REMOVECUPCAKE',status:'trash'});
	expect(boardState.cupcakeCount).toBe(0);
	expect(boardState.trash.count).toBe(2);
	expect(boardState.gameOver).toBe(true);
});
