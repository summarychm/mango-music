import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import "./scroll.styl";

class Scroll extends React.Component {
    componentDidUpdate() {
        //组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
        if (this.bScroll && this.props.refresh === true) {
            this.bScroll.refresh();
        }
    }

    componentDidMount() {
        if (!this.bScroll) {
            this.bScroll = new BScroll(this._scrollView, {
                //实时派发scroll事件
                probeType: 3,
                click: this.props.click
            });
            //触发父级回调事件
            if (this.props.onScroll) {
                this.bScroll.on("scroll", scroll => {
                    this.props.onScroll(scroll);
                })
            }
        }
    }

    componentWillUnmount() {
        //清理滚动组件
        this.bScroll.off("scroll");
        this.bScroll=null;
    }

    render() {
        return (
            <div className="scroll-view"
                 ref={node => this._scrollView = node}
            >
                {this.props.children}
            </div>
        )
    }
}

Scroll.defaultTypes = {
    click: true,
    refresh: false,
    onScroll: null
}

Scroll.propTypes = {
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
}

export default Scroll;






