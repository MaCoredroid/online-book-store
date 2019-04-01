import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';

let counter = 0;
function createData(name, author, price, isbn, stock, img) {
    counter += 1;
    return { id: counter, name, author, price, isbn, stock, img };
}
let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
}
let orderBy = 'name'
class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                createData('Harry Potter', ' J. K. Rowling', 3000, '‎978-3-16-148410-0', 5, './img/hp.jpg'),
                createData('King of the Ring', 'John Ronald Reuel Tolkien', 5000, '‎178-3-16-148410-0', 9, './img/ring.jpg'),
                createData('The Three-Body Problem', '	Liu Cixin', 4000, '‎278-3-16-148410-0', 7, './img/tb.jpg'),
            ],
            booksCp: [
                createData('Harry Potter', ' J. K. Rowling', 3000, '‎978-3-16-148410-0', 5, './img/hp.jpg'),
                createData('King of the Ring', 'John Ronald Reuel Tolkien', 5000, '‎178-3-16-148410-0', 9, './img/ring.jpg'),
                createData('The Three-Body Problem', '	Liu Cixin', 4000, '‎278-3-16-148410-0', 7, './img/tb.jpg'),
            ]
        };
    }
    handleLink(index) {
        return "/detail/" + index
    }
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
            return item.name.indexOf(pattern) !== -1
        })
        this.setState({
            books: list
        })
    }
    render() {
        return (
            <Paper className="paper">
                <TextField label="搜索框" id={'filter'} onChange={() => this.handleChange()} />
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Button onClick={() => { this.handleSort("name") }}>书名</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={() => { this.handleSort("author") }}>作者</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={() => { this.handleSort("price") }}>价格</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={() => { this.handleSort("isbn") }}>isbn</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={() => { this.handleSort("stock") }}>库存</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.books.map((item, index) => {
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
                                    <TableCell align="right" >
                                        <Link to={this.handleLink(index)}>查看详情</Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default BookList;
