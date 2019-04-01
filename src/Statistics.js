import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataLine: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]

            }


        };
    }


    render() {
        return (
            <paper>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Statistics</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">Dropdown</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem ><Link to="/Root" >Root</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/" >Log out</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Statistics" >Statistics</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Bookmanage" >Bookmanage</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input id={'filter'} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={() => this.handleChange()} />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <MDBContainer>
                    <h3 className="mt-5">Line chart</h3>
                    <Line data={this.state.dataLine} options={{ responsive: true }} />

                </MDBContainer>


            </paper>







        );
    }
}

export default Statistics;