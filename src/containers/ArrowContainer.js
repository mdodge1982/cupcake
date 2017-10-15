import {connect} from 'react-redux';
import {moveBag, stopBag} from '../actions';
import Arrow from '../components/Arrow';

export default connect(
	() => {
		return {};
	},
	{moveBag,stopBag}
)(Arrow);
