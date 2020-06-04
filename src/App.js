import React from 'react';
import './app.css';

class App extends React.Component {
  state={
    text:"",
    clicks:0,
    startTime: new Date().getTime(),
    mouseDownTime:0,
    mouseUpTime:0
  }
  mouseDown=()=>{
    var current = new Date().getTime();
    this.setState({mouseDownTime:current});
  }
  mouseUp=()=>{
    var current = new Date().getTime();
    this.setState({mouseUpTime:current});
  }
  showText= (ka)=>{
    this.setState(prestate=>({clicks: prestate.clicks +1}));
    var current = new Date().getTime();
    var string=[...this.state.text];
    var lastChar= string[string.length-1];
    var bool=ka.includes(lastChar);

        if(this.state.mouseUpTime-this.state.mouseDownTime>=650)
    {
      this.setState({clicks:1});
      var s = [...this.state.text,ka[ka.length-1]];
      this.setState({startTime: new Date().getTime(),
                      mouseDownTime:0,
                      mouseUpTime:0});
    }
    else if(current-this.state.startTime>500||!bool)
    {
      this.setState({clicks:1});
      var s = [...this.state.text,ka[0]];
      this.setState({startTime: new Date().getTime()});
    }
    else
    {

      var s=[...this.state.text];
      s.pop();
      s.push(ka[this.state.clicks%ka.length]);
      this.setState({startTime: new Date().getTime()});
    }
      this.setState({ text: s });
    
  }
  clear=()=>{
    var string=[...this.state.text];
    string.pop();
    this.setState({text:string});
  }
 render(){
   var object1=[
     ["1","1",".,"],
     ["abc2","2","abc"],
     ["def3","3","def"]
   ];
   let op1=object1.map((item)=><button onClick={()=>this.showText(item[0])} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{item[1]}<br></br>{item[2]}</button>);
   var object2=[
    ["ghi4","4","ghi"],
    ["jkl5","5","jkl"],
    ["mno6","6","mno"]
  ];
  let op2=object2.map((item)=><button onClick={()=>this.showText(item[0])} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{item[1]}<br></br>{item[2]}</button>);
  var object3=[
    ["pqrs7","7","pqrs"],
    ["tuv8","8","tuv"],
    ["wxyz9","9","wxyz"]
  ];
  let op3=object3.map((item)=><button onClick={()=>this.showText(item[0])} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{item[1]}<br></br>{item[2]}</button>);
  var object4=[
    ["*","*","+"],
    [" 0","0","space"],
    ["#","#","^"]
  ];
  let op4=object4.map((item)=><button onClick={()=>this.showText(item[0])} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{item[1]}<br></br>{item[2]}</button>);
 
  return (
    <div className="body">
      <div className="btn-toolbar mb-3">
       <p className="text" >{(this.state.text)?this.state.text:"Type"}</p>
       <button onClick={this.clear}>Clear</button>
       </div>
        <div >
        {op1}
        </div>
        <div>
        {op2}
        </div>
        <div>
        {op3}
        </div>
        <div>
        {op4}
        </div>
    </div>
  );
 }
}

export default App;