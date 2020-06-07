import React from "react";
class Button1 extends React.Component{
    state={
        mouseDownTime:0,
        mouseUpTime:0
    }
    //calculate when is mouse pressed
    mouseDown=()=>{
        var current = new Date().getTime();
        this.setState({mouseDownTime:current});
      }
    // calculate when is mouse released
      mouseUp=()=>{
        var current = new Date().getTime();
        this.setState({mouseUpTime:current});
      }
    render(){
        return(<button onClick={()=>this.props.onclick(this.props.items[0],this.state.mouseDownTime,this.state.mouseUpTime)} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{this.props.items[1]}<br></br>{this.props.items[2]}</button>);
    }
}
export default Button1;