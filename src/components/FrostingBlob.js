import React, {Component} from 'react';
import './FrostingBlob.css';

class FrostingBlob extends Component {
	render() {
		let {xPos,yPos,width,height,angle} = this.props;
		let className = 'FrostingBlob';
		let rotation = -1*(angle-1.57);
		if(yPos===0){
			className += ' splat';
			width = height;
			rotation = 0;
		}
		return (
			<li className={className} style={{
				left: xPos+'px',
				bottom: yPos+'px',
				width: width+'px',
				height: height+'px',
				transform: 'rotate('+rotation+'rad)',
			}}></li>
		);
	}
}

export default FrostingBlob;
