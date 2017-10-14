import React from 'react';
import renderer from 'react-test-renderer';
import Cupcake from './Cupcake';

test('Style reflects props', () => {
	const cake = {
		frosted:'',
		yPos:134,
		xPos:345,
		width:42,
		height:56,
		wait:0
	};
	const component = renderer.create(
		<Cupcake {...cake} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.wait = 18;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
