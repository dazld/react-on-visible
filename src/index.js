/* global window, document */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindRaf} from './lib/bindRaf';
import cx from 'classnames';

class OnVisible extends Component {
    constructor(...args) {
        super(...args);
        this.onScroll = bindRaf(this.onScroll.bind(this));
        this.state = {
            visible: false,
            bottom: 0,
            top: 0
        };
    }
    componentDidMount() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onScroll);
    }
    componentWillUnmount() {
        this.stopListening();
    }
    onScroll() {
        const pos = window.pageYOffset + window.innerHeight;
        const visbleTriggerRatio = (this.props.percent && this.props.percent / 100) || 0.5;
        const box = this.holder.getBoundingClientRect();

        const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
        const docTop = document.documentElement.clientTop || 0;

        const top = box.top + (box.height * visbleTriggerRatio) + (pageYOffset - docTop);
        const visible = top < pos;
        const end = () => {
            this.props.onChange(visible);
        };

        const somethingChanged = this.state.visible !== visible;
        const becameVisible = visible && !this.state.visible;

        if (somethingChanged) {
            this.setState(() => ({
                visible,
                top
            }), end);
        }

        if (becameVisible && !this.props.bounce) {
            this.stopListening();
        }
    }
    stopListening() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
    }
    render() {
        const {className, visibleClassName, children, wrappingElement, ...attributes} = this.props;
        const {visible} = this.state;
        const classes = cx(className, {
            [visibleClassName || 'visible']: visible
        });

        // other known properties which must not be passed to attributes
        delete attributes.percent;
        delete attributes.onChange;
        delete attributes.bounce;

        const invokingProps = {
            ...attributes,
            className: classes,
            ref: (el) => {
                this.holder = el || this.holder;
            }
        };

        return React.createElement(wrappingElement, invokingProps, children);
    }
}

OnVisible.defaultProps = {
    onChange: () => {}, // eslint-disable-line no-empty-function
    bounce: false,
    wrappingElement: 'div'
};

OnVisible.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visibleClassName: PropTypes.string,
    children: PropTypes.node,
    percent: PropTypes.number,
    onChange: PropTypes.func,
    bounce: PropTypes.bool,
    wrappingElement: PropTypes.string
};

export default OnVisible;

export function setDefaultProps(props) {
    Object.keys(props).forEach((key) => {
        OnVisible.defaultProps[key] = props[key];
    });
}
