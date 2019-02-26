import React, { Component } from "react";
import "./Tenant.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Tenant extends Component {
  render() {
    return (
      <tr>
        <td>
          <Button
            className="centeredRounded"
            color="danger"
            onClick={() =>
              this.props.deleteTenant(
                this.props.tenant._id
              )
            }
          >
            <i className="material-icons">delete</i>
          </Button>
        </td>
        <td>{this.props.tenant.name}</td>
        <td>${this.props.tenant.debt}</td>
        <td>{this.props.tenant.phone}</td>
        <td>{this.props.tenant.adress}</td>
        <td>
          <Button
            className="centeredRounded"
            color="warning"
            onClick={() => {
              this.props.tenantToUpdate(this.props.tenant);
            }}
          >
            <i className="material-icons">edit</i>
          </Button>
        </td>
      </tr>
    );
  }
}

function mapStateToProps({ admin }) {
  return { admin };
}

export default connect(
  mapStateToProps,
  actions
)(Tenant);
