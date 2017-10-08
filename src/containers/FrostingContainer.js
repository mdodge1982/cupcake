import {connect} from 'react-redux';
import {angleShoot} from '../actions';
import {getVisibleBlobs} from '../reducers/frosting';
import Frosting from '../components/Frosting';

const mapStateToProps = ({frosting,cupcakes}) => {
	return {
		frosting: getVisibleBlobs(frosting)
	};
}

export default connect(
	mapStateToProps,
	{angleShoot}
)(Frosting);
