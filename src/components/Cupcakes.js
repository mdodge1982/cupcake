import React, {Component} from 'react';
import './Cupcakes.css';

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
				{this.props.children}
			</ul>
		);
	}
	componentDidMount() {
		let count = this.props.count;
		this.setState({
			int: setInterval(() => {
				if(count>0){
					this.props.onInterval();
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
