import React, {Component} from 'react';
import ControlsContainer from '../containers/ControlsContainer';
import FrostingContainer from '../containers/FrostingContainer';
import CupcakesContainer from '../containers/CupcakesContainer';
import BagContainer from '../containers/BagContainer';
import Instructions from '../components/Instructions';
import './Board.css';


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
			<div className={type+' receptacle'} style={style}>{count}</div>
		);
	}
}

class Board extends Component {
	constructor() {
		super();
		this.state = {
			int: null
		}
	}
	render() {
		const {height,width,gameStarted,gameOver,trash,box} = this.props;
		let message = 'Not bad.';
		const lose = trash.count>=box.count;
		if(lose){
			message = 'Not great.';
		}else if(box.count-trash.count>3){
			message = 'Nicely done!'
		}
		return (
			<div style={{width:width+'px'}}>
				<h1>Cupcake Invaders</h1>
				<div className="Board" style={{height:height+'px'}}>
					{!gameStarted &&
						<div className="padding">
							<h3>Frost as many cupcakes as you can!</h3>
							<Instructions />
							<p>You can also use the <strong>[&lt; o &gt;]</strong> buttons at the bottom of the board to move and shoot.</p>
							<p><button onClick={() => this.handleClick()}>Play Now</button></p>
						</div>
					}
					{gameOver &&
						<div className="padding">
							<h3>{message}</h3>
							<BagContainer inline={true} frown={lose} />
							<div><Receptacle {...trash} inline={true} />
							&nbsp; &nbsp; &nbsp;
							<Receptacle {...box} inline={true} /></div>
							<p><button onClick={() => this.handleClick(true)}>Play Again</button></p>
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
					<div>
						<ControlsContainer />
						<Instructions small={true} />
					</div>
				}
			</div>
		);
	}
	componentWillUnmount() {
		clearInterval(this.state.int);
	}
	handleClick(again) {
		this.props.startGame(again);
		clearInterval(this.state.int);
		this.setState({int:setInterval(() => this.props.moveObjects(),25)});
	}
}

export default Board;
