import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/appsActions';

import ProjectPreview from './ProjectPreview';

class ProjectList extends Component {
	render() {
		return (
			<div>
				{
					<ProjectPreview project={project} key={project.id} />
				}
			</div>
		);
	}
}

ProjectList.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);