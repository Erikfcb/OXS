import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  Button,
  Form,
  Label,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "./Header.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // React-strap function
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="header">
        <div className="sort">
          <ButtonDropdown
            className="dropdownButton"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret color="primary">
              Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.props.updateSort("all")}>
                All
              </DropdownItem>
              <DropdownItem onClick={() => this.props.updateSort("debt")}>
                Only debts
              </DropdownItem>
              <DropdownItem onClick={() => this.props.updateSort("")}>
                Only no debts
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <Form className="search">
          <Label for="search">
            <i className="material-icons">search</i>
          </Label>
          <Input
            type="text"
            name="search"
            id="search"
            onChange={e => this.props.updateSearch(e.target.value)}
            placeholder="Search by name..."
          />
        </Form>
        <Button className="logout" onClick={this.logout}>
          Log out
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(Login));
