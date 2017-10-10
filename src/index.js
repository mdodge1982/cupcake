import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import cupcakeApp from './reducers';
import {resizeWindow} from './actions';
import BoardContainer from './containers/BoardContainer';

let store = createStore(
	cupcakeApp,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<BoardContainer />
	</Provider>,
	document.getElementById('root')
);
window.addEventListener('resize',() => {
	store.dispatch(resizeWindow());
});
