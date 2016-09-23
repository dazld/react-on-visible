/* global window, document */
import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import debounce from './lib/debounce';

class OnVisible extends Component {
    constructor(props) {
        super(props);
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
        const isVisible = top < pos;

        if (isVisible) {
            this.setState({
                visible: true,
                top
            }, function() {
                if (this.props.onChange) this.props.onChange(this.state.visible);
            });
            this.stopListening();
        }
    }
    stopListening() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
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

OnVisible.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    visibleClassName: PropTypes.string,
    children: PropTypes.node,
    percent: PropTypes.number,
    onChange: PropTypes.func,
};

export default OnVisible;
