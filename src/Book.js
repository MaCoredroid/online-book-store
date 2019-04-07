import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
// import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

let counter = 0;
function createData(name, author, price, isbn, stock, img) {
    counter += 1;
    return { id: counter, name, author, price, isbn, stock, img };
}
class Book extends Component {


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
    componentDidMount()
    {
        fetch("http://localhost:8080/Javaweb/Servlet")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
                    width="320" height="480"
                />
            </Paper>
        );
    }
}

export default Book;
