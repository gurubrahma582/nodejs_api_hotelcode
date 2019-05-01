import React from 'react';
import DispalyConversation from './DispalyConversation';
import MessagingBox from './MessagingBox';

class MessagingPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      messages : []
    }
  }

  /* Connection To WebSocket  */
 connection = new WebSocket('ws://localhost:9090/')

componentDidMount(){
  debugger;
  this.connection.onmessage = (message) =>{
    console.log(message)
    console.log(message.data)
    const data = JSON.parse(message.data)
    console.log(data)
     this.setState({messages:[...this.state.messages,data]})
  }
}

/* Sending the ChatRoom Data to Nodejs to the  */
getMessage = (message) =>{
  // this.setState({messages: [...this.state.messages,message]})
  const data = {username:this.props.username,message:message}
  this.connection.send(JSON.stringify(data))
}

  render(){
  return (
    <div className="messagingpanel">
    <br/>
      <DispalyConversation  messages={this.state.messages}>hello</DispalyConversation>
      <br/>
      <MessagingBox getMessage={this.getMessage}/>
    </div>

  );
}
}

export default MessagingPanel;
