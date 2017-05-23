/* global document, window */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OnVisible, { setDefaultProps } from '../src/index.js';

const NUM_ITEMS = 360;
const root = document.querySelector('#root');

setDefaultProps({
    bounce: true
});

function getColors(numItems){
    const colors = new Array(numItems).fill('').map((i, idx) => {
        return {
            bg: `hsl(${(idx / numItems) * 360},100%,50%)`
        };
    });
    return colors;
}

class Colors extends Component {
    constructor() {
        super(...arguments);
        this.renderItem = this.renderItem.bind(this);
        this.setupHorizontalScroll = this.setupHorizontalScroll.bind(this);
        this.state = {
            colors: getColors(NUM_ITEMS),
            horizColors: getColors(9),
            horizontalElement: null,
            count: 0
        };
    }
    setupHorizontalScroll(el){
        if (el) {

        } else {

        }
        this.setState({
            horizontalElement: el
        });
    }
    renderItem(container, item, idx) {

        return (
            <OnVisible
                container={container}
                className="box"
                percent={10}
            >
                <div data-idx={`box: ${idx}`} style={{
                    backgroundColor: item.bg,
                    transitionDelay: `${idx % 3 * 100}ms`
                }} />
            </OnVisible>
        );
    }
    render() {

        const horizontalElement = this.state.horizontalElement;
        const canRenderHorizontals = !!horizontalElement;

        return (
            <div className="colors">
                <div className="scrollable" ref={this.setupHorizontalScroll}>
                    {canRenderHorizontals && this.state.horizColors.map(this.renderItem.bind(this, horizontalElement))}
                </div>
                {false && this.state.colors.map(this.renderItem.bind(this, window))}
            </div>
        );
    }
}

ReactDOM.render(<Colors />, root);
