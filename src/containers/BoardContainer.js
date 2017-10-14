import {connect} from 'react-redux';
import {startGame} from '../actions';
import moveObjects from '../actions/moveObjects';
import Board from '../components/Board';


const mapStateToProps = ({board}) => {
	return {
		...board
	};
}

export default connect(
	mapStateToProps,
	{moveObjects,startGame}
)(Board);
