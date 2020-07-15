import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/appsActions';

import TaskItem from './TaskItem';

class TaskList extends Component {
	render() {
		const taskList = this.props.taskList;
		if (apps.error) {
			return <div>Error! {apps.error.message}</div>;
		}
		if (apps.loading) {
			return <div>Loading...</div>;
		}
		const dataToShowExists = tasklist.length > 0

		return (
			<div>
				{
					dataToShowExists ? tasklist.map(task => {
						return (
							<TaskItem task={task} key={task._id} />
						);
					}) : 'No Data Found'
				}
			</div>
		);
	}
}

TaskList.propTypes = {
    taskList: PropTypes.object.isRequired
};

// What should I expose as props from store
function mapStateToProps(state, ownProps) {
	return {
		
	};
}

// What actions do I want on props
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);