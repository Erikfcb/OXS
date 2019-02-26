import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentDidMount() {
    // If token exists, move to the tenants page
    if (localStorage.getItem("token")) {
      this.props.history.push("/tenants");
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ error: "Missing details" });
    }

    if (this.state.username !== "" && this.state.password !== "") {
      this.props.login({
        username: this.state.username.toLowerCase(),
        password: this.state.password.toLowerCase()
      });
    }
  }

  render() {
    return (
      <Form className="form" onSubmit={e => this.onFormSubmit(e)}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={e => this.setState({ username: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </FormGroup>
        <div style={{ color: "red" }}>{this.props.admin.error}</div>
        <Button>Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps({ admin }) {
  return { admin };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Login));
