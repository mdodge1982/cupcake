import React, {Component} from 'react';
import ControlsContainer from '../containers/ControlsContainer';
import FrostingContainer from '../containers/FrostingContainer';
import CupcakesContainer from '../containers/CupcakesContainer';
import BagContainer from '../containers/BagContainer';
import Instructions from '../components/Instructions';
import Receptacle from '../components/Receptacle';
import './Board.css';

class Board extends Component {
	constructor() {
		super();
		this.state = {
			int: null
		}
	}
	render() {
		const {width,height,gameStarted,gameOver,trash,box} = this.props;
		let message = 'Not bad.';
		let messageClass = 'message';
		const lose = trash.count>=box.count;
		if(lose){
			message = 'Not great.';
			messageClass += ' lose';
		}else if(box.count-trash.count>3){
			message = 'Nicely done!'
		}
		return (
			<div style={{width:width+'px'}}>
				<h1>Cupcake Invaders</h1>
				<div className="Board" style={{height:height+'px'}}>
					{!gameStarted &&
						<div className="intro">
							<h2>Cupcake Invaders</h2>
							<h3>Frost as many cupcakes as you can!</h3>
							<Instructions />
							<p>You can also use the <strong>&lt; o &gt;</strong> buttons at the bottom of the board to move and shoot.</p>
							<p><button className="play" onClick={() => this.handleClick()}>Play Now</button></p>
						</div>
					}
					{gameOver &&
						<div className="padding">
							<h4 className={messageClass}>{message}</h4>
							<Receptacle {...trash} inline={true} />
							&nbsp; &nbsp; &nbsp;
							<Receptacle {...box} inline={true} />
							<p>&nbsp;</p>
							<p><button className="play" onClick={() => this.handleClick()}>Play Again</button></p>
						</div>
					}
					{gameStarted&&!gameOver &&
						<div>
							<CupcakesContainer />
							<Receptacle {...trash} />
							<Receptacle {...box} />
							<FrostingContainer />
							<BagContainer />
						</div>
					}
				</div>
				{gameStarted &&
				<ControlsContainer />
				}
			</div>
		);
	}
	componentWillUnmount() {
		clearInterval(this.state.int);
	}
	handleClick() {
		this.props.startGame();
		clearInterval(this.state.int);
		this.setState({int:setInterval(() => {
			if(!this.props.gameOver){
				this.props.moveObjects();
			}else{
				clearInterval(this.state.int);
			}
		},25)});
	}
}

export default Board;
