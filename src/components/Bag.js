import React, {Component} from 'react';
import './Bag.css';

class Bag extends Component {
	constructor() {
		super();
		this.state = {
			handleKeyUp: null,
			handleKeyDown: null
		};
	}
	render() {
		const {facing,angle,xPos,width,height} = this.props;
		let className = 'Bag facing-'+facing;
		const rotation = -1*(angle-1.57);
		return (
			<div className={className}
				style={{
					left: xPos+'px',
					transform: 'rotate('+rotation+'rad)',
					width: width+'px',
					height: height+'px'
				}}></div>
		);
	}
	componentDidMount() {
		const handleKeyDown = (e) => this.handleKeyDown(e);
		const handleKeyUp = (e) => this.handleKeyUp(e);
		document.addEventListener('keydown',handleKeyDown);
		document.addEventListener('keyup',handleKeyUp);
		this.setState({
			handleKeyDown,
			handleKeyUp
		});
	}
	componentWillUnmount() {
		document.removeEventListener('keydown',this.state.handleKeyDown);
		document.removeEventListener('keyup',this.state.handleKeyUp);
	}
	handleKeyDown(e) {
		if([37,39].includes(e.keyCode)){
			const direction = e.keyCode===37 ? 'left' : 'right';
			this.props.onArrowDown(direction);
		}else if(e.keyCode===32){
			this.props.onSpacebarDown();
		}
	}
	handleKeyUp(e) {
		if([37,39].includes(e.keyCode)){
			this.props.onArrowUp();
		}
	}
}

export default Bag;
