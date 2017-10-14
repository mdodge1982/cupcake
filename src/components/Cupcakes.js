import React, {Component} from 'react';
import './Cupcakes.css';
import Cupcake from '../components/Cupcake';

class Cupcakes extends Component {
	constructor() {
		super();
		this.state = {
			int: null
		};
	}
	render() {
		return (
			<ul className="Cupcakes">
				{this.props.cupcakes.map(cake => (
					<Cupcake key={cake.id} {...cake} />
				))}
			</ul>
		);
	}
	componentDidMount() {
		let count = this.props.count;
		this.setState({
			int: setInterval(() => {
				if(count>0){
					this.props.addCupcake();
				}else{
					clearInterval(this.state.int);
				}
				count--;
			},1000)
		});
	}
	componentWillUnmount() {
		clearInterval(this.state.int);
	}
}

export default Cupcakes;
