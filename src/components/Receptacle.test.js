import React from 'react';
import renderer from 'react-test-renderer';
import Receptacle from './Receptacle';

const margin = 10;
const boxWidth = 67;

const trash = {
	width: 71,
	height: 100,
	xPos: margin,
	yPos: margin,
	type: 'trash',
	count: 5
};
const box = {
	width: boxWidth,
	height: 88,
	xPos: 525-boxWidth-margin,
	yPos: margin,
	type: 'box',
	count: 10
};
test('Initial render as trash', () => {
	const component = renderer.create(
		<Receptacle {...trash} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
test('Initial render as box', () => {
	const component = renderer.create(
		<Receptacle {...box} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Game over inline render', () => {
	const component = renderer.create(
		<Receptacle {...box} inline={true} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
