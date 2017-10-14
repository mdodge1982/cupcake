import React from 'react';
import renderer from 'react-test-renderer';
import FrostingBlob from './FrostingBlob';

test('Style reflects props', () => {
	const blob = {
		xPos: 22,
		yPos: 34,
		width: 45,
		height: 82,
		angle: 1.6
	};
	const component = renderer.create(
		<FrostingBlob {...blob} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.yPos = 0;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
