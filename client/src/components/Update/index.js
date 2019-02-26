import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Update.css";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      debt: 0,
      phone: "",
      adress: ""
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidUpdate(nextProps) {
    // Check if props received then add them as initial values of inputs
    if (nextProps.tenant.name !== this.props.tenant.name)
      this.setState({
        name: this.props.tenant.name,
        debt: this.props.tenant.debt,
        phone: this.props.tenant.phone,
        adress: this.props.tenant.adress
      });
  }

  onFormSubmit(e) {
    const tenant = {
      _id: this.props.tenantId,
      name: this.state.name,
      debt: this.state.debt,
      phone: this.state.phone,
      adress: this.state.adress
    };

    this.props.updateTenant(tenant);
    this.props.changeDisplay(false);
  }

  render() {
    return (
      <div className={"updateTenantWindow " + this.props.display}>
        <div
          className="closeWindow"
          onClick={() => this.props.changeDisplay(false)}
        >
          X
        </div>
        <div style={{ margin: "20px auto", width: "30%", fontSize: "1.2em" }}>
          Update: {this.props.tenant.name}
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
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="debt">Debt</Label>
            <Input
              type="number"
              value={this.state.debt}
              onChange={e => this.setState({ debt: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="text"
              value={this.state.phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="adress">Adress</Label>
            <Input
              type="text"
              value={this.state.adress}
              onChange={e => this.setState({ adress: e.target.value })}
            />
          </FormGroup>
          <div style={{ color: "red" }}>{this.state.error}</div>
          <Button>Update</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Update);
