import React, {Component} from 'react';
import './Cupcake.css';

class Cupcake extends Component {
	render() {
		const {frosted,yPos,xPos,width,height,wait} = this.props;
		const className = 'Cupcake '+frosted;
		let burst = '';
		if(wait>0){
			burst = (<span className="burst"></span>);
		}
		return (
			<li className={className} style={{
				left: xPos+'px',
				bottom: yPos+'px',
				width: width+'px',
				height: height+'px'
			}}>{burst}</li>
		);
	}
}

export default Cupcake;
