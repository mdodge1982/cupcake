import {connect} from 'react-redux';
import {moveBag, stopBag, addFrosting} from '../actions';
import Bag from '../components/Bag';

const mapStateToProps = ({bag}) => {
	return {
		...bag
	};
};

export default connect(
	mapStateToProps,
	{moveBag,stopBag,addFrosting}
)(Bag);
