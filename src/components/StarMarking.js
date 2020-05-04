import staricongrey from '../assets/images/star0.png';
import stariconblue from '../assets/images/star1.png';
import React from 'react';

export default class StarMarking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clickIndex: 0,
            hoverIndex: 0,
        }
        this.getStar = this.getStar.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.changeMarkingScore = this.changeMarkingScore.bind(this);
    }

    handleClick(index) {
        this.setState({
            clickIndex: index,
        });
    }

    handleOnMouseEnter(index) {
        this.setState({
            hoverIndex: index,
        });
    }

    handleOnMouseOut() {
        this.setState({
            hoverIndex: 0,
        });
    }

    changeMarkingScore(index) {
        let item = {
            'score': index
        };
        this.props.getScore(item.score)
    }

    getStar() {
        let num = this.state.hoverIndex === 0 ? this.state.clickIndex : this.state.hoverIndex;
        let starContainer = [];
        const arr = [1, 2, 3, 4, 5];
        arr.map((ele, index) => {
            starContainer.push(
                <span
                    className="staricon"
                    onClick={this.handleClick.bind(this, ele)}
                    onMouseEnter={this.handleOnMouseEnter.bind(this, ele)}
                    onMouseOut={this.handleOnMouseOut.bind(this)}
                    rate = {index+1}
                >
                    {ele > num ? <img src={staricongrey} className="dark"/> : <img src={stariconblue} className="light"/>}
                </span>
            );
        });
        return starContainer;
    }

    render() {
        let starItems = this.getStar();
        return (
            <div className="starmarking">
                <div className="starcontainer">
                    {starItems}
                </div>
            </div>
        )
    }
}
