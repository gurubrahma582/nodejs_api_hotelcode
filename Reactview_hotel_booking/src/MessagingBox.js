import React from 'react';

class MessagingBox extends React.Component {
 messageHandler = (e) => {
   if(e.keyCode == 13){
     e.preventDefault()
     this.props.getMessage(e.target.value)
     e.target.value = ""
     
   }
 }

  render(){
  return (
    <div className="messagingbox">
    <h1>Welcome to Chat ROOM</h1>
      <textarea onKeyDown={this.messageHandler}></textarea>
    </div>

  );
}
}

export default MessagingBox;
