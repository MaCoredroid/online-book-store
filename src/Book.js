import React, { Component } from 'react';

import axios from 'axios';
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {Link} from "react-router-dom";



class Book extends Component {



    constructor(props) {
        super(props);
        this.state = {


            books:[],




        }

    }
    componentDidMount() {
        axios.get(`http://localhost:8080/Javaweb_war_exploded/Booklist`,{
            params: {
                flag: "FALSE",
                isbn: this.props.match.params.id,
            }
        }).then(res => {
                this.setState({ books: res.data });
            });



    }
    render()
    {
        return(
            <a>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a >书名</a></th>
                            <th><a >作者</a></th>
                            <th><a >价格</a></th>
                            <th><a >isbn</a></th>
                            <th><a >库存</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.author}
                                    </td>
                                    <td>
                                        {item.price / 100}
                                    </td>
                                    <td>
                                        {item.isbn}
                                    </td>
                                    <td>
                                        {item.stock}
                                    </td>


                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
                <img src={"http://localhost:8080/Javaweb_war_exploded/getImage?isbn="+ this.props.match.params.id} height={"289"} width={"200"}/>
            </a>

    )
    }
}

export default Book;
