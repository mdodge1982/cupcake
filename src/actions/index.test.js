import {stopBag} from './index.js'

it('stops the bag', () => {
	expect(stopBag().type).toEqual('BAG_STOP');
});
