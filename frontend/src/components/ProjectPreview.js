import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/appsActions';
import TaskList from './TaskList';

class ProjectPreview extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        const app = this.props.app;

        return (<div>
            <TaskList/>
        </div>);
    }
}

ProjectPreview.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPreview);