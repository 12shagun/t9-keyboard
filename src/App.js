import React from 'react';
import styled from "styled-components";
import Buttons from "./Buttons";

//Styled-components for buttons
const StyledButton = styled.button`
  width: 55px;
  height: 50px;
  margin: 3px;
  border-radius: 12px;
  `;
//Styled-components for text showing on screen
const Screen = styled.p`
  background-color: rgb(230, 230, 241);
  margin-bottom: 10px; 
  width: 125px; 
  max-width: 125px;
  max-height: 100px;
  padding: 2px;
  word-wrap: break-word;
  border-radius: 4px;
  `;
//Styled-components for body
const Keyboard = styled.div`
  margin-left: 42%;
  margin-top: 14%;
`;
//Styled-components for aligning buttons
const ButtonsAlignment = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 200px;
`;


class App extends React.Component {

  //list of button names and characters stored in it
  static defaultProps = {
    keypad: [
      ["1", "1", ".,"],
      ["abc2", "2", "abc"],
      ["def3", "3", "def"],
      ["ghi4", "4", "ghi"],
      ["jkl5", "5", "jkl"],
      ["mno6", "6", "mno"],
      ["pqrs7", "7", "pqrs"],
      ["tuv8", "8", "tuv"],
      ["wxyz9", "9", "wxyz"],
      ["*", "*", "+"],
      [" 0", "0", "space"],
      ["#", "#", "^"]
    ]
  }

  state = {
    text: "",
    clicks: 0,
    startTime: new Date().getTime(),
  }

  /**
   * TO print the number on long press and the respective character on first click or more clicks
   * @param {string} characters (keys on the button cicked)
   * @param {number} mouseDownTime (time when button is pressed)
   * @param {number} mouseUpTime (time when button is released)
   * @memberof App
   */
  showText = (characters, mouseDownTime, mouseUpTime) => {
    this.setState(prestate => ({ clicks: prestate.clicks + 1 }));
    const currentTime = new Date().getTime();
    const { text: string } = this.state;
    const lastChar = string[string.length - 1];
    const isButtonSame = characters.includes(lastChar);
    let { text: newText } = this.state;
    // For long press
    if (mouseUpTime - mouseDownTime >= 650) {
      this.setState({ clicks: 1 });
      newText = newText.concat(characters[characters.length - 1]);
      this.setState({ startTime: new Date().getTime() });
    }
    // For first click
    else if (currentTime - this.state.startTime > 700 || !isButtonSame) {
      this.setState({ clicks: 1 });
      newText = newText.concat(characters[0]);
      this.setState({ startTime: new Date().getTime() });
    }
    // For further clicks
    else {
      newText = newText.slice(0, newText.length - 1);
      newText = newText.concat(characters[this.state.clicks % characters.length]);
      this.setState({ startTime: new Date().getTime() });
    }
    this.setState({ text: newText });

  }
  //Function to clear last entered character
  clear = () => {
    let { text: string } = this.state;
    string = string.slice(0, string.length - 1);
    this.setState({ text: string });
  }

  render() {
    const { text } = this.state;
    const { keypad } = this.props;

    return (
      <Keyboard>
        <div className="btn-toolbar mb-3" >
          <Screen className="text" >{(text) ? text : "Type"}|</Screen>
          <StyledButton onClick={this.clear}>Clear</StyledButton>
        </div>
        <ButtonsAlignment>
          {keypad.map((key, index) => <Buttons key={index} keys={key} onclick={this.showText} />)}
        </ButtonsAlignment>
      </Keyboard>
    );
  }
}

export default App;
