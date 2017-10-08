import {connect} from 'react-redux';
import {moveBag, stopBag} from '../actions';
import Arrow from '../components/Arrow';

let int;
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMouseDown: () => {
			int = setInterval(() => {
				dispatch(moveBag(ownProps.direction));
			},50);
		},
		onMouseUp: () => {
			clearInterval(int);
			dispatch(stopBag());
		}
	};
}

const MoveArrow = connect(
	() => {
		return {};
	},
	mapDispatchToProps
)(Arrow);

export default MoveArrow;
