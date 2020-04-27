import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn,MDBInput
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios/index';
import Cookies from "js-cookie";
import "../css/Homepage.css";
import * as Stomp from 'stompjs';
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from "@material-ui/core/Avatar";
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            username:Cookies.get("username"),
            url:Cookies.get("url"),
            users: [

            ],
            friends:[

            ],
        };

    }
    componentDidMount()
    {

        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        let url=Cookies.get('url');
        axios.get(url+`/getAllUsername`,
        )
            .then(res => {
                this.setState(
                    {
                        users: res.data,

                    });
            });
        axios.get(url+`/getFriends/`+this.state.username,
        )
            .then(res => {
                this.setState(
                    {
                        friends: res.data,

                    });
            });

    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    handleUnsubscribe()
    {
        let key = prompt("Are you sure you want to delete your account and all your infomation? Type your username", "Your Username");
        if(key===this.state.username)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/userprofile/unsubscribe/username/"+this.state.username, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Your account has been unsubscribed!");
                Cookies.set('username','');
                window.location.href = "http://localhost:3000/";
                return;
            }
            else
            {
                alert("Failed to unsubscribe your account");
                return;
            }
        }
    }





    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    handleMakeFriends(item)
    {
        let url=Cookies.get('url');
        axios.get(url+`/beFriendWith/username/`+this.state.username+`/friend/`+item,
        );
    }
    render() {
        return (
           <div>
               <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
                   <MDBNavbarBrand>
                       <strong className="dark-text">Friend</strong>
                   </MDBNavbarBrand>

                   <MDBNavbarBrand>
                       <strong className="dark-text">Weclome,  User {this.state.username}           </strong>
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
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Order")}>Order</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Cart")}>Cart</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Homepage")}>Homepage</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("ChatRoom")}>ChatRoom</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>

                       </MDBNavbarNav>

                       <MDBNavbarNav right>
                           <MDBNavItem>
                               <MDBDropdown>
                                   <MDBDropdownToggle nav caret>
                                       <MDBIcon icon="user" />
                                   </MDBDropdownToggle>
                                   <MDBDropdownMenu className="dropdown-default" right>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>
                           <MDBNavItem>
                               <MDBDropdown>
                                   <MDBDropdownToggle nav caret>
                                       <MDBIcon icon="heart-broken" />
                                   </MDBDropdownToggle>
                                   <MDBDropdownMenu className="dropdown-default" right>
                                       <MDBDropdownItem onClick={()=>this.handleUnsubscribe()}>Unsubscribe</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>
                       </MDBNavbarNav>
                   </MDBCollapse>

               </MDBNavbar>
               <Grid container spacing={0}>

                   <Grid item xs={6} md={6}>
                       <div >
                           <Typography variant="h6" >
                               Make some friends:
                           </Typography>
                           <List>
                               {this.state.users.map((item, index) => {
                                   return (
                                       <ListItem>
                                           <ListItemAvatar>
                                               <Avatar>
                                                   <PeopleIcon />
                                               </Avatar>
                                           </ListItemAvatar>
                                           <ListItemText
                                               primary={item}

                                           />
                                           <ListItemSecondaryAction>
                                               <IconButton edge="end" aria-label="delete" onClick={()=>this.handleMakeFriends(item)}>
                                                   <GroupAddIcon/>
                                               </IconButton>
                                           </ListItemSecondaryAction>
                                       </ListItem>
                                   )
                               })}
                           </List>
                       </div>
                   </Grid>
                   <Grid item xs={6} md={6}>
                       <div >
                           <Typography variant="h6" >
                               Your friends:
                           </Typography>
                           <List>
                               {this.state.friends.map((item, index) => {
                                   return (
                                       <ListItem>
                                           <ListItemAvatar>
                                               <Avatar>
                                                   <PeopleIcon />
                                               </Avatar>
                                           </ListItemAvatar>
                                           <ListItemText
                                               primary={item}

                                           />
                                       </ListItem>
                                   )
                               })}
                           </List>
                       </div>
                   </Grid>
               </Grid>
            </div>







        );
    }
}

export default Friend;
