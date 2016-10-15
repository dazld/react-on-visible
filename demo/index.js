/* global document, window */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OnVisible from '../src/index.js';

const NUM_ITEMS = 360;
const root = document.querySelector('#root');

class Colors extends Component {
    constructor() {
        super(...arguments);
        const colors = new Array(NUM_ITEMS).fill('').map((i, idx) => {
            return {
                bg: `hsl(${(idx / NUM_ITEMS) * 360},100%,50%)`
            };
        });
        this.state = {
            colors
        };
    }
    renderItem(item, idx) {
        return (
            <OnVisible
                className="box"
                percent={10}
                key={idx}
                onChange={(state) => { console.log(`idx ${idx} is now visible: ${state}`); }}>
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
