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
let stompClient = null;
function setConnected(connected) {

    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}
function connect() {

    let socket = new WebSocket('ws://localhost:8080/chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {

        setConnected(true);
        console.log('Connected: ' + frame);
        alert("Connected successfully!");
        stompClient.subscribe('/topic/messages', function(messageOutput) {

            showMessageOutput(JSON.parse(messageOutput.body));
        });
    });
}

function disconnect() {

    if(stompClient != null) {
        stompClient.disconnect();
    }

    setConnected(false);
    console.log("Disconnected");
}

function  sendMessage() {

    var from = document.getElementById('from').value;
    var text = document.getElementById('text').value;
    stompClient.send("/app/chat", {}, JSON.stringify({'from':from, 'text':text}));
}

function  showMessageOutput(messageOutput) {

    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(messageOutput.from + ": " + messageOutput.text + " (" + messageOutput.time + ")"));
    response.appendChild(p);
}
class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            username:Cookies.get("username"),
            url:Cookies.get("url")
        };

    }
    componentDidMount()
    {
        setConnected(false);
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }

    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(id) {

            return "/homepage/detail/" + id;

    }
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

    render() {
        return (
           <div>
               <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
                   <MDBNavbarBrand>
                       <strong className="dark-text">ChatRoom</strong>
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
                   <Grid item xs={3}/>
                   <Grid item xs={6}>
                       <div>

                           <div>
                               <MDBInput type="text" id="from" label="Choose a nickname"/>
                           </div>
                           <br/>
                           <div>
                               <MDBBtn id="connect" onClick={()=>connect()}>Connect</MDBBtn>
                               <MDBBtn id="disconnect" onClick={()=>disconnect()}>Disconnect</MDBBtn>
                           </div>
                           <br/>
                           <div id="conversationDiv">
                               <MDBInput type="text" id="text" label="Write a message..."/>
                               <MDBBtn id="sendMessage" onClick={()=>sendMessage()}>Send</MDBBtn>

                               <p id="response"/>

                           </div>
                       </div>
                   </Grid>
                   <Grid item xs={3}/>
               </Grid>
            </div>







        );
    }
}

export default ChatRoom;
