import React, { Fragment,Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MDBInput } from "mdbreact";
import { MDBBtn } from "mdbreact";

// import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

let counter = 0;
function createData(name, author, price, isbn, stock, img) {
    counter += 1;
    return { id: counter, name, author, price, isbn, stock, img };
}
class Edit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            books: [
                createData('Harry Potter', ' J. K. Rowling', 3000, '‎978-3-16-148410-0', 5, './img/hp.jpg'),
                createData('King of the Ring', 'John Ronald Reuel Tolkien', 5000, '‎178-3-16-148410-0', 9, './img/ring.jpg'),
                createData('The Three-Body Problem', '	Liu Cixin', 4000, '‎278-3-16-148410-0', 7, './img/tb.jpg'),
            ]
        };
    }
    render() {
        return (
            <Paper className="paper">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell >书名</TableCell>
                            <TableCell align="right">作者</TableCell>
                            <TableCell align="right">价格</TableCell>
                            <TableCell align="right">isbn</TableCell>
                            <TableCell align="right">库存</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.books.map((item, index) => {
                            if (index == this.props.match.params.id) {
                                return (
                                    <TableRow key={index} >
                                        <TableCell component="th" scope="row" >
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.author}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.price / 100}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.isbn}
                                        </TableCell>
                                        <TableCell align="right" >
                                            {item.stock}
                                        </TableCell>
                                    </TableRow>

                                )
                            }

                        })}
                    </TableBody>
                </Table>
                <img
                    src={require( "" + this.state.books[this.props.match.params.id].img)}
                    alt={this.state.books[this.props.match.params.id].name}
                    width="160" height="240"
                />



                <div className="form-group">
                    <MDBInput label="name" size="sm" />
                    <MDBInput label="author" size="sm"/>
                    <MDBInput label="price" size="sm" />
                    <MDBInput label="isbn" size="sm" />
                    <MDBInput label="store" size="sm" />
                    <MDBBtn color="danger">Confirm</MDBBtn>
                </div>



            </Paper>
        );
    }
}

export default Edit;
