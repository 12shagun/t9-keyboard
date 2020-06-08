import React from 'react';
import Buttons from "./Buttons";
import styled from "styled-components";

class App extends React.Component {
  state={
    text:"",
    clicks:0,
    startTime: new Date().getTime(),
    
  }
  //function to check if its a long press then print the number or 
  //first click or more than one clicks then print the respective character
  showText= (characters,mouseDownTime,mouseUpTime)=>{
    this.setState(prestate=>({clicks: prestate.clicks +1}));
    const currentTime = new Date().getTime();
    const string=[...this.state.text];
    const lastChar= string[string.length-1];
    const isButtonSame=characters.includes(lastChar);
    let newText;
    // for long press
    if(mouseUpTime-mouseDownTime>=650)              
    {
      this.setState({clicks:1});
       newText = [...this.state.text,characters[characters.length-1]];
      this.setState({startTime: new Date().getTime()});
    }
    // for first click
    else if(currentTime-this.state.startTime>700||!isButtonSame)
    {
      this.setState({clicks:1});
       newText = [...this.state.text,characters[0]];
      this.setState({startTime: new Date().getTime()});
    }
    // for further clicks
    else
    {

       newText=[...this.state.text];
      newText.pop();
      newText.push(characters[this.state.clicks%characters.length]);
      this.setState({startTime: new Date().getTime()});
    }
      this.setState({ text: newText });
    
  }
  //function to clear last entered character
  clear=()=>{
    let string=[...this.state.text];
    string.pop();
    this.setState({text:string});
  }
  static defaultProps={
    keypad:[
      ["1","1",".,"],
      ["abc2","2","abc"],
      ["def3","3","def"],
      ["ghi4","4","ghi"],
      ["jkl5","5","jkl"],
      ["mno6","6","mno"],
      ["pqrs7","7","pqrs"],
       ["tuv8","8","tuv"],
       ["wxyz9","9","wxyz"],
       ["*","*","+"],
       [" 0","0","space"],
       ["#","#","^"]
    ]
  }
  
 render(){
  //list of button names and characters stored in it
 
   let op=this.props.keypad.map((key)=><Buttons  keys={key} onclick={this.showText}/>);
  
  return (
    <div style={{ marginLeft: "42%",marginTop: "14%"}}>
      <div className="btn-toolbar mb-3" >
        <Screen className="text" >{(this.state.text)?this.state.text:"Type"}|</Screen>
        <StyledButtons onClick={this.clear}>Clear</StyledButtons>
       </div>
       <div style={{display:"flex",flexWrap:"wrap",width:"200px"}}>
        {op}
       </div>
    </div>
  );
 }
}

export default App;
//styled-components for buttons
const StyledButtons=styled.button`
  width: 55px;
  height: 50px;
  margin: 3px;
  border-radius: 12px;
  `;
  //styled-components for text showing on screen
  const Screen=styled.p`
  background-color: rgb(230, 230, 241);
  margin-bottom: 10px; 
  width: 125px; 
  max-width: 125px;
  max-height: 100px;
  padding: 2px;
  word-wrap: break-word;
  border-radius: 4px;
  `;