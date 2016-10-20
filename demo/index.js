/* global document, window */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OnVisible, { setDefaultProps } from '../src/index.js';

const NUM_ITEMS = 360;
const root = document.querySelector('#root');

setDefaultProps({
    bounce: true
});

class Colors extends Component {
    constructor() {
        super(...arguments);
        this.renderItem = this.renderItem.bind(this);
        const colors = new Array(NUM_ITEMS).fill('').map((i, idx) => {
            return {
                bg: `hsl(${(idx / NUM_ITEMS) * 360},100%,50%)`
            };
        });
        this.state = {
            colors,
            count: 0
        };
    }
    renderItem(item, idx) {
        return (
            <OnVisible
                className="box"
                percent={10}
                key={idx}
            >
                <div data-idx={`box: ${idx}`} style={{
                    backgroundColor: item.bg,
                    transitionDelay: `${idx % 3 * 100}ms`
                }} />
            </OnVisible>
        );
    }
    render() {
        return (
            <div className="colors">
                {this.state.colors.map(this.renderItem)}
            </div>
        );
    }
}

ReactDOM.render(<Colors />, root);
