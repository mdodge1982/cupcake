import React, {Component} from 'react';
import './Arrow.css';

class Arrow extends Component {
	constructor() {
		super();
		this.state = {
			int: null
		};
	}
	render() {
		let className = 'Arrow ' + this.props.direction;
		return (
			<button
				className={className}
				onMouseDown={(e) => this.onMouseDown(e)}
				onMouseUp={(e) => this.onMouseUp(e)}
				onTouchStart={(e) => this.onMouseDown(e)}
				onTouchEnd={(e) => this.onMouseUp(e)}>
			</button>
		);
	}
	onMouseDown() {
		const int = setInterval(() => {
			this.props.moveBag(this.props.direction);
		},50);
		this.setState({int:int});
	}
	onMouseUp() {
		clearInterval(this.state.int);
		this.props.stopBag();
	}
}

export default Arrow;
