import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./New.css";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      debt: 0,
      phone: "",
      adress: "",
      error: ""
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    if (
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.adress === ""
    ) {
      this.setState({ error: "Missing details" });
    } else {
      const tenant = {
        name: this.state.name,
        debt: this.state.debt,
        phone: this.state.phone,
        adress: this.state.adress
      };
      this.setState({
        name: "",
        debt: 0,
        phone: "",
        adress: ""
      });
      this.props.createTenant(tenant);
      this.props.hide();
    }
  }

  render() {
    return (
      <div className={"newTenantWindow " + this.props.display}>
        <div
          className="closeWindow"
          onClick={() => {
            this.props.hide();
          }}
        >
          X
        </div>
        <div style={{ margin: "20px auto", width: "30%", fontSize: "1.2em" }}>
          Create New
        </div>

        <Form
          className="newTenantForm"
          onSubmit={e => {
            e.preventDefault();
            this.onFormSubmit(e);
          }}
        >
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="debt">Debt</Label>
            <Input
              type="number"
              name="debt"
              id="debt"
              value={this.state.debt}
              onChange={e => this.setState({ debt: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="adress">Adress</Label>
            <Input
              type="text"
              name="adress"
              id="adress"
              value={this.state.adress}
              onChange={e => this.setState({ adress: e.target.value })}
            />
          </FormGroup>
          <div style={{ color: "red" }}>{this.state.error}</div>
          <Button>Add</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(New);
