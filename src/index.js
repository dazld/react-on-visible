import React, { PropTypes, Component } from 'react';
import debounce from './lib/debounce';
import cx from 'classnames';

class OnVisible extends Component {
    constructor() {
        super(...arguments);
        this.onScroll = debounce(this.onScroll.bind(this), 10);
        this.state = {
            visible: false,
            bottom: 0,
            top: 0
        };
    }
    componentDidMount() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    onScroll() {
        const pos = window.scrollY + window.innerHeight;
        const box = this.refs.holder.getBoundingClientRect();
        const top = box.top + (box.height / 2) + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
        const isVisible = top < pos;
        if (!this.state.visible && isVisible) {
            this.setState({
                visible: isVisible,
                top
            });
        }
    }
    render() {
        const { visible } = this.state;
        const classes = cx(this.props.className, {
            visible
        });

        return (
            <div
                className={classes}
                ref="holder">
                {this.props.children}
            </div>
        );
    }
}

OnVisible.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default OnVisible;
