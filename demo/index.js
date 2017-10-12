/* global document, window */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OnVisible, { setDefaultProps } from '../src/index.js';

const NUM_ITEMS = 360;
const root = document.querySelector('#root');

setDefaultProps({
    bounce: true
});

const renderItem = (deleteCallback) => (item) => {
	const itemToRemove = Math.min(item.id + 6, NUM_ITEMS);
	return (
		<OnVisible
			className="box"
			percent={10}
			key={item.id}
		>
			<div data-idx={`box: ${item.id}, click to cancel ${itemToRemove}`}
				style={{
					backgroundColor: item.bg,
					transitionDelay: `${item.id % 3 * 100}ms`
				}}
			 	onClick={() => deleteCallback(itemToRemove)}
			/>
		</OnVisible>
	);
}

class Colors extends Component {
    constructor() {
        super(...arguments);
        this.deleteColor = this.deleteColor.bind(this);
        const colors = new Array(NUM_ITEMS).fill('').map((i, idx) => {
            return {
            	id: idx,
                bg: `hsl(${(idx / NUM_ITEMS) * 360},100%,50%)`
            };
        });
        this.state = {
            colors,
            count: 0
        };
    }
	deleteColor(colorId) {
    	const { colors } = this.state;
		console.log('deleting now: ', colorId);
		const withoutColorId = colors.filter(item => item.id !== colorId);
		this.setState({colors: withoutColorId});
	}
    render() {
        return (
            <div className="colors">
                {this.state.colors.map(renderItem(this.deleteColor))}
            </div>
        );
    }
}

ReactDOM.render(<Colors />, root);
