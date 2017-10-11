import {connect} from 'react-redux';
import {angleShoot} from '../actions';
import {getVisibleBlobs} from '../reducers/frosting';
import Frosting from '../components/Frosting';

const mapStateToProps = ({frosting,cupcakes}) => {
	const visibleBlobs = getVisibleBlobs(frosting);
	return {
		frosting: visibleBlobs
	};
}

export default connect(
	mapStateToProps,
	{angleShoot}
)(Frosting);
