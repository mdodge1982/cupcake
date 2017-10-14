import {connect} from 'react-redux';
import {addCupcake} from '../actions';
import {getVisibleCakes} from '../reducers/cupcakes';
import Cupcakes from '../components/Cupcakes';

const mapStateToProps = ({board,cupcakes}) => {
	return {
		cupcakes: getVisibleCakes(cupcakes),
		count: board.cupcakeCount
	};
}

export default connect(
	mapStateToProps,
	{addCupcake}
)(Cupcakes);
