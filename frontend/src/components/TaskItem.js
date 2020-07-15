import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/appsActions';

class TaskItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.addZeros = this.addZeros.bind(this);
        this.convertPriceToEuro = this.convertPriceToEuro.bind(this);
    }

    addZeros(num) {
        let value = Number(num);
        let res = num.toString().split(".");
        if (res.length === 1 || res[1].length < 3) {
            value = value.toFixed(2);
        }
        return value;
    }
    convertPriceToEuro(num) {
        let convertedPrice = num / 100
        return this.addZeros(convertedPrice)
    }

    render() {
        return (
            <div></div>
        );
}
}
TaskItem.propTypes = {

};

// What should I expose as props from store
function mapStateToProps(state, ownProps) {
    return {

    };
}

// What actions do I want on props
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);