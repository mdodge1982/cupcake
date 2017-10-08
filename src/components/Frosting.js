import React, {Component} from 'react';
import './Frosting.css';
import FrostingBlob from '../components/FrostingBlob';

class Frosting extends Component {
	render() {
		return (
			<ul className="Frosting" onClick={(e) => this.onClick(e)}>
				{this.props.frosting.map(blob => (
					<FrostingBlob key={blob.id} {...blob} />
				))}
			</ul>
		);
	}
	onClick(e) {
		this.props.angleShoot(e);
	}
}

export default Frosting;
