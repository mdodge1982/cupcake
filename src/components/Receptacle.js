import React, {Component} from 'react';
import './Receptacle.css';

class Receptacle extends Component {
	render() {
		const {width,height,count,type,xPos,yPos,inline} = this.props;
		const style = {
			width: width+'px',
			height: height+'px'
		};
		if(inline){
			style.position = 'static';
			style.display = 'inline-block';
		}else{
			style.left = xPos+'px';
			style.bottom = yPos+'px';
		}
		return (
			<div className={'Receptacle '+type} style={style}>{count}</div>
		);
	}
};

export default Receptacle;
