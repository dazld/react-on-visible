/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import cx from 'classnames';
import debounce from './lib/debounce';

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
        const container = this.getContainer();
        container.addEventListener(this.props.event || 'scroll', this.onScroll);
        window.addEventListener('resize', this.onScroll);
    }
    componentWillUnmount() {
        this.stopListening();
    }
    getContainer(){
        return this.props.container || this._findScrollableAncestor();
    }
    onScroll() {

        const containerIsWindow = this.props.container === window;

        const horizontal = this.props.horizontal;

        const pos = horizontal ?
          window.pageXOffset + window.innerWidth :
          window.pageYOffset + window.innerHeight;

        const visbleTriggerRatio = (this.props.percent && this.props.percent / 100) || 0.5;

        const box = this.holder.getBoundingClientRect();

        const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
        const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;

        const docTop = document.documentElement.clientTop || 0;
        const docLeft = document.documentElement.clientLeft || 0;

        const top = horizontal ?
          box.left + (box.width * visbleTriggerRatio) + (pageXOffset - docLeft) :
          box.top + (box.height * visbleTriggerRatio) + (pageYOffset - docTop);

        const isVisible = top < pos;

        const end = () => {
            this.props.onChange(this.state.visible);
        };

        if (isVisible) {
            this.setState({
                visible: true,
                top
            }, end);
            if (!this.props.bounce) {
                this.stopListening();
            }
        } else if (this.state.visible) {
            this.setState({
                visible: false
            }, end);
        }
    }
    stopListening() {
        const container = this.getContainer();
        container.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
    }
    _findScrollableAncestor() {
      let node = this.holder;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document) {
          // This particular node does not have a computed style.
          continue;
        }

        if (node === document.documentElement) {
          // This particular node does not have a scroll bar, it uses the window.
          continue;
        }

        const style = window.getComputedStyle(node);
        const overflowDirec = this.props.horizontal ?
          style.getPropertyValue('overflow-x') :
          style.getPropertyValue('overflow-y');
        const overflow = overflowDirec || style.getPropertyValue('overflow');

        if (overflow === 'auto' || overflow === 'scroll') {
          return node;
        }
      }

      // A scrollable ancestor element was not found, which means that we need to
      // do stuff on window.
      return window;
    }
    render() {
        const { visible } = this.state;
        const classes = cx(this.props.className, {
            [this.props.visibleClassName || 'visible']: visible
        });

        return (
          <div
              style={this.props.style}
              className={classes}
              ref={el => { this.holder = el; }}
          >
            {this.props.children}
          </div>
        );
    }
}

OnVisible.defaultProps = {
    onChange: () => {},
    bounce: false
};

OnVisible.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visibleClassName: PropTypes.string,
    horizontal: PropTypes.bool,
    event: PropTypes.string,
    children: PropTypes.node,
    percent: PropTypes.number,
    onChange: PropTypes.func,
    bounce: PropTypes.bool
};

export default OnVisible;

export function setDefaultProps(props) {
    Object.keys(props).forEach(k => {
        OnVisible.defaultProps[k] = props[k];
    });
}
