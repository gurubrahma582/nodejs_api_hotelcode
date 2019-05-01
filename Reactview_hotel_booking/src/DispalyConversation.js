import React from 'react';

class DispalyConversation extends React.Component {
  displayMessage = () => this.props.messages.map(message => <div>{message.username} : {message.message}</div>)
  render(){
  return (
    <div className="DispalyConversation">
               {this.displayMessage() }
    </div>
   
  );
}
}

export default DispalyConversation;
