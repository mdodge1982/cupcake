import React from 'react';
import renderer from 'react-test-renderer';
import Instructions from './Instructions';


test('Default render', () => {
	const component = renderer.create(
		<Instructions />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Small render', () => {
	const component = renderer.create(
		<Instructions small={true} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
