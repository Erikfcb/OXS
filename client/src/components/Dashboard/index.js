import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Tenant from "../Tenant";
import New from "../New";
import Header from "../Header";
import Update from "../Update";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Table } from "reactstrap";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTenantDisplayClass: false,
      sort: "all",
      search: "",
      update: {},
      displayUpdateWindow: false
    };

    this.constructTenants = this.constructTenants.bind(this);
    this.hide = this.hide.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.tenantToUpdate = this.tenantToUpdate.bind(this);
  }

  updateSearch(search) {
    this.setState({ search });
  }

  updateSort(sort) {
    this.setState({ sort });
  }

  componentDidMount() {
    this.props.fetchTenants();

    // If there is no token, move to the login
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }

  //hide the create window
  hide() {
    this.setState({ newTenantDisplayClass: false });
  }

  constructTenants() {
    let filteredTenants =
      this.state.sort === "all"
        ? this.props.tenants
        : this.state.sort === "debt"
        ? this.props.tenants.filter(item => {
            return item.debt !== 0;
          })
        : this.props.tenants.filter(item => {
            return item.debt === 0;
          });

    if (this.state.search !== "") {
      filteredTenants = filteredTenants.filter(item => {
        return (
          item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      });
    }

    filteredTenants.sort((a, b) => {
      return b.debt - a.debt;
    });

    return filteredTenants.map(item => {
      return (
        <Tenant
          key={item._id}
          tenant={item}
          hideWindow={this.hide}
          tenantToUpdate={this.tenantToUpdate}
        />
      );
    });
  }

  //hide or show the update window
  changeDisplay(hide) {
    if (arguments.length === 0)
      this.setState({ displayUpdateWindow: !this.state.displayUpdateWindow });
    else this.setState({ displayUpdateWindow: hide });
  }

  //Tenant to update from Tenant component
  tenantToUpdate(tenant) {
    this.setState({ update: tenant, displayUpdateWindow: true });
  }

  render() {
    const tenants = this.constructTenants();

    return [
      <Header
        key={1}
        updateSearch={this.updateSearch}
        updateSort={this.updateSort}
      />,
      <div key={2} className="dashboard">
        <div className="tenants">
          <Table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Debt</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th />
              </tr>
            </thead>
            <tbody>{tenants}</tbody>
          </Table>
        </div>
        <div id="mybutton">
          <button
            className="add"
            onClick={() =>
              this.setState({
                newTenantDisplayClass: !this.state.newTenantDisplayClass
              })
            }
          >
            +
          </button>
        </div>
        <New
          display={
            this.state.newTenantDisplayClass ? "showWindow" : "hideWindow"
          }
          hide={this.hide}
        />
      </div>,
      <Update
        key={3}
        changeDisplay={this.changeDisplay}
        display={this.state.displayUpdateWindow ? "showWindow" : "hideWindow"}
        tenantId={this.state.update._id}
        tenant={this.state.update}
      />
    ];
  }
}

function mapStateToProps({ tenants, admin }) {
  return { tenants, admin };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Dashboard));
