import React from 'react';
import renderer from 'react-test-renderer';
import Instructions from './Instructions';


test('Text changes when rendered small', () => {
	const component = renderer.create(
		<Instructions />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.small = true;
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
