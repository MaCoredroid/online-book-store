import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


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
            ],
            books1:[],
            loading: true,
            error: null,
        };
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/Javaweb/${this.props.subreddit}.json`)
            .then(res => {
                // Transform the raw data by extracting the nested posts
                const books1 = res.data.data.children.map(obj => obj.data);

                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    books1,
                    loading: false,
                    error: null
                });
            })
            .catch(err => {
                // Something went wrong. Save the error in state and re-render.
                this.setState({
                    loading: false,
                    error: err
                });
            });
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
                        {this.state.books1.map((item, index) => {
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
                    src={require( "" + this.state.books1[this.props.match.params.id].img)}
                    alt={this.state.books1[this.props.match.params.id].name}
                    width="320" height="480"
                />
            </Paper>
        );
    }
}

export default Book;
