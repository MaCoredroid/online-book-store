import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';



let counter = 0;
function createData(username,password,email,order) {
    counter += 1;
    return { id: counter, username,password,email,order };
}
let order = {
    username: true,
    password: true,
    email: true,
    order: true,

};
let orderBy = 'username';
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            books: [
                createData('傅亮', '1122445', '571718111666@qq.com', 2),
                createData('浮生来', 'cj83j8uj', 'udhuheiwuh@163.com', 10),
                createData('七仙女', '	7c93h7c97h3', 'fairyofficial@heaven.com', 5000),
            ],
            booksCp: [
                createData('傅亮', '1122445', '571718111666@qq.com', 2),
                createData('浮生来', 'cj83j8uj', 'udhuheiwuh@163.com', 10),
                createData('七仙女', '	7c93h7c97h3', 'fairyofficial@heaven.com', 5000),
            ]
        };
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleSort(index) {
        orderBy = index
        order[index] = !order[index]
        let list = []
        for (let i = 0; i < this.state.books.length; i++) {
            list.push(this.state.books[i])
        }
        list.sort(this.sort)
        this.setState({
            books: list
        })
    }
    sort(a, b) {
        let res = 0;
        if (a[orderBy] < b[orderBy]) {
            res = -1
        } else if (a[orderBy] > b[orderBy]) {
            res = 1
        } else {
            res = 0
        }
        if (!order[orderBy]) {
            res = 0 - res
        }
        return res
    }
    handleChange() {
        let pattern = document.getElementById('filter').value
        let list = this.state.booksCp.filter((item) => {
            return item.username.indexOf(pattern) !== -1
        })
        this.setState({
            books: list
        })
    }
    render() {
        return (
            <paper>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Root</strong>
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

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a onClick={() => { this.handleSort("username") }}>用户名</a></th>
                            <th><a onClick={() => { this.handleSort("password") }}>密码</a></th>
                            <th><a onClick={() => { this.handleSort("email") }}>邮箱</a></th>
                            <th><a onClick={() => { this.handleSort("order") }}>订单数</a></th>

                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.username}
                                    </td>
                                    <td>
                                        {item.password}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.order}
                                    </td>


                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
            </paper>







        );
    }
}

export default Root;