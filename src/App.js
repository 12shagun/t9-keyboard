import React from 'react';
import './app.css';
import Button1 from "./button1"

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
    let currentTime = new Date().getTime();
    let string=[...this.state.text];
    let lastChar= string[string.length-1];
    let isButtonSame=characters.includes(lastChar);
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
 render(){
  //list of button names and characters stored in it
   var object=[
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
   ];
   let op=object.map((item)=><Button1  items={item} onclick={this.showText}/>);
  
  return (
    <div >
      <div className="btn-toolbar mb-3 body">
        <p className="text" >{(this.state.text)?this.state.text:"Type"}|</p>
        <button onClick={this.clear}>Clear</button>
       </div>
       <div className="container">
        {op}
       </div>
    </div>
  );
 }
}

export default App;