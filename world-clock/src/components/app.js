import React from "react";
import { StopWatchBtn, StopWatch } from "./stopwatch";
import { CountDownBtn, CountDown } from "./countdown";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStopWatchOpen: false,
      isCountDownOpen: false,
    };
  }
  handleChange = (key) => {
    if (key === "isCountDownOpen") {
      this.setState({
        isCountDownOpen: !this.state.isCountDownOpen,
      });
    } else {
      this.setState({
        isStopWatchOpen: !this.state.isStopWatchOpen,
      });
    }
  };
  render() {
    return (
      <div className="text-center main">
        <h1 className="text-cap blue fs-28">World Clock</h1>
        <div className="flex justify-center">
          {this.state.isStopWatchOpen ? (
            <StopWatch handleChange={this.handleChange} />
          ) : (
            <StopWatchBtn handleChange={this.handleChange} />
          )}
          {this.state.isCountDownOpen ? (
            <CountDown handleChange={this.handleChange} />
          ) : (
            <CountDownBtn handleChange={this.handleChange} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
