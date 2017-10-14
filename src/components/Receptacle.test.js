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
test('Style and content reflect box/trash props', () => {
	const receptacle = trash;
	const component = renderer.create(
		<Receptacle {...receptacle} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props = box;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.inline = true;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
