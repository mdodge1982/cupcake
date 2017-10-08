import React, {Component} from 'react';
import './Arrow.css';

class Arrow extends Component {
	render() {
		let className = 'Arrow ' + this.props.direction
		return (
			<button
				className={className}
				onMouseDown={(e) => this.props.onMouseDown(e)}
				onMouseUp={(e) => this.props.onMouseUp(e)}>
			</button>
		);
	}
}

export default Arrow;
