import React, {Component} from 'react';
import ArrowContainer from '../containers/ArrowContainer';
import Instructions from '../components/Instructions';
import './Controls.css';

class Controls extends Component {
	render() {
		return (
			<div className="Controls">
				<ArrowContainer direction="left"/>
				<button className="shoot" onClick={() => this.props.addFrosting()}></button>
				<ArrowContainer direction="right"/>
				<Instructions small={true} />
			</div>
		);
	}
}

export default Controls;
