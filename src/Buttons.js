import React from "react";
import styled from "styled-components";
class Buttons extends React.Component{
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
        return(<StyledButtons onClick={()=>this.props.onclick(this.props.keys[0],this.state.mouseDownTime,this.state.mouseUpTime)} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>{this.props.keys[1]}<br></br>{this.props.keys[2]}</StyledButtons>);
    }
}
export default Buttons;
//styled-components for buttons
const StyledButtons=styled.button`
  width: 55px;
  height: 50px;
  margin: 3px;
  border-radius: 12px;
  `;