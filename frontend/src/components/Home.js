
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.UserGreeting = this.UserGreeting.bind(this);
        this.GuestGreeting = this.GuestGreeting.bind(this);
    }
    UserGreeting(name) {
        return <h1>Welcome {name}!</h1>;
    }
      
    GuestGreeting(props) {
        return <h1>Please Sign In or Sign up.</h1>;
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;
        return (
            <div>
                {isAuthenticated ? this.UserGreeting(user.name) : this.GuestGreeting()}
                Home Component - Welcome {user.name}
            </div>
        );
    }
}
Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));