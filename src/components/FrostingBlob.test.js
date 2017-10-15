import React from 'react';
import renderer from 'react-test-renderer';
import FrostingBlob from './FrostingBlob';

const blob = {
	xPos: 22,
	yPos: 34,
	width: 45,
	height: 82,
	angle: 1.6
};
test('Initial render', () => {
	const component = renderer.create(
		<FrostingBlob {...blob} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Splats when landing at the bottom', () => {
	blob.yPos = 0;
	const component = renderer.create(
		<FrostingBlob {...blob} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
