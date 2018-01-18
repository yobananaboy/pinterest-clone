import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import emoji from 'react-easy-emoji';
import classNames from 'classnames';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			burgerOpen: false
		};
		this.burgerToggle = this.burgerToggle.bind(this);
	}
	burgerToggle() {
		let burgerToggleStatus = !this.state.burgerOpen;
		this.setState({
			burgerOpen: burgerToggleStatus
		});
	}
	
	// https://codepen.io/carloluis/pen/gWzPzd
	render() {
		let navlinks = <div className="nav-links">
							<a href="/auth/twitter">{emoji("Log in 🐦 ")}</a>
						</div>;
		if(this.props.user) {
			navlinks = <div className="nav-links">
							<NavLink to="/" className="nav-link" id="all" {...this.props} exact>All posts</NavLink>
							<NavLink to="/user/posts" className="nav-link" id="user" {...this.props} exact>Your posts</NavLink>
							<NavLink to="/add" className="nav-link" id="add" {...this.props} exact>Add post</NavLink>
							<a href="/logout" className="nav-button" id="logout" activeClassName="active" {...this.props} exact>Logout</a>
						</div>;
		}
		let mobileLinksClass = classNames('mobile-links', {'show': this.state.burgerOpen});
		return (
			<div className="nav-wrapper">
				<nav className="nav">
					<div className="nav-wide">
						<div className="nav-title">
							<Link to="/" id="nav-title">{emoji("Matt's social network 🙂 ")}</Link>
							{navlinks}
						</div>
					</div>
					<div className="nav-mobile">
						<div className="nav-title">
							<Link to="/" id="nav-title">{emoji("Matt's social network 🙂 ")}</Link>
							<a onClick={this.burgerToggle} id="burger">☰</a>
							<div className={mobileLinksClass}>
								{navlinks}
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
};

export default Header;