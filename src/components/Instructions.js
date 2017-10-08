import React, {Component} from 'react';
import './Instructions.css';

class Instructions extends Component {
	render() {
		let className="Instructions";
		let hint = '';
		if(this.props.small){
			className += ' small';
			hint = (
				<strong>HINT:</strong>
			);
		}
		return (
			<p className={className}>
				{hint} Use the <strong>[left]</strong> and <strong>[right]</strong> arrow keys to move your pastry bag,
				and the <strong>[spacebar]</strong> (or click anywhere on the board) to shoot frosting.
			</p>
		);
	}
}

export default Instructions;
