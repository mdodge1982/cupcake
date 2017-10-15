import React from 'react';
import renderer from 'react-test-renderer';
import Cupcake from './Cupcake';

const cake = {
	frosted:'',
	yPos:134,
	xPos:345,
	width:42,
	height:56,
	wait:0
};

test('Initial render', () => {
	const component = renderer.create(
		<Cupcake {...cake} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Render with wait (after frosting hit)', () => {
	cake.wait = 18;
	const component = renderer.create(
		<Cupcake {...cake} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
