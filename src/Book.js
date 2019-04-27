import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';



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
    render() {
        return<Paper className="paper">
            <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>书名</TableCell>
                        <TableCell align="right">作者</TableCell>
                        <TableCell align="right">价格</TableCell>
                        <TableCell align="right">isbn</TableCell>
                        <TableCell align="right">库存</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.state.books.map((item, index) => {
                        if (item.isbn == this.props.match.params.id) {
                            return (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
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
                                    <TableCell align="right">
                                        {item.stock}
                                    </TableCell>

                                </TableRow>
                            )


                        }

                    })}
                </TableBody>
            </Table>
            <p>
                <img src={"http://localhost:8080/Javaweb_war_exploded/getImage?isbn="+ this.props.match.params.id} height={"289"} width={"200"}/>
            </p>

        </Paper>;
    }
}

export default Book;
