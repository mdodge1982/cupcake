import {connect} from 'react-redux';
import {moveObjects,startGame} from '../actions';
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
