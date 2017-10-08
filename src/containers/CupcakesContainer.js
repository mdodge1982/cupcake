import React from 'react';
import {connect} from 'react-redux';
import {addCupcake} from '../actions';
import {getVisibleCakes} from '../reducers/cupcakes';
import Cupcakes from '../components/Cupcakes';
import Cupcake from '../components/Cupcake';

const CupcakesContainer = ({cupcakes,addCupcake,count}) => (
	<Cupcakes count={count} onInterval={() => {addCupcake()}}>
		{cupcakes.map(cake => (
			<Cupcake key={cake.id} {...cake} />
		))}
	</Cupcakes>
)

const mapStateToProps = ({board,cupcakes}) => {
	return {
		cupcakes: getVisibleCakes(cupcakes),
		count: board.cupcakeCount
	};
}

export default connect(
	mapStateToProps,
	{addCupcake}
)(CupcakesContainer);
