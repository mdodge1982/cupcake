import {connect} from 'react-redux';
import {addFrosting} from '../actions';
import Controls from '../components/Controls';

export default connect(
	() => {
		return {};
	},
	{addFrosting}
)(Controls);
