import {connect} from 'react-redux';
import {moveBag, stopBag, addFrosting} from '../actions';
import Bag from '../components/Bag';

const mapStateToProps = ({bag}) => {
	return {
		...bag
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onArrowDown: (direction) => dispatch(moveBag(direction)),
		onArrowUp: (direction) => dispatch(stopBag()),
		onSpacebarDown: () => dispatch(addFrosting())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bag);
