import React from "react";

function StopWatchBtn(props) {
  return (
    <button
      onClick={() => {
        props.handleChange(`isStopWatchOpen`);
      }}
      className="fs-16 text-cap margin-1 btn blue"
    >
      show stopwatch
    </button>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milliSecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
    };
  }
  componentDidMount() {
    if (this.props.time.isresumed === true) {
      this.setState({
        milliSecond: this.props.time.milliSecond,
        second: this.props.time.second,
        minute: this.props.time.minute,
        hour: this.props.time.hour,
      });
    }
    this.timer = setInterval(() => {
      console.log("hi");
      this.setState({
        milliSecond: this.state.milliSecond + 1,
      });
      if (this.state.milliSecond >= 99) {
        this.setState({
          milliSecond: 0,
          second: this.state.second + 1,
        });
      }
      if (this.state.second >= 59) {
        this.setState({
          second: 0,
          minute: this.state.minute + 1,
        });
      }
      if (this.state.minute >= 59) {
        this.setState({
          minute: 0,
          hour: this.state.hour + 1,
        });
      }
    }, 10);
  }
  componentWillUnmount() {
    this.props.setTime(this.state);
    clearInterval(this.timer);
  }
  render() {
    return (
      <p className="fs-28">
        {" "}
        {this.state.hour > 9
          ? this.state.hour
          : `${0}${this.state.hour}`} :{" "}
        {this.state.minute > 9 ? this.state.minute : `${0}${this.state.minute}`}{" "}
        :{" "}
        {this.state.second > 9 ? this.state.second : `${0}${this.state.second}`}{" "}
        :{" "}
        {this.state.milliSecond > 9
          ? this.state.milliSecond
          : `${0}${this.state.milliSecond}`}
      </p>
    );
  }
}

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milliSecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      start: false,
      isresumed: false,
    };
  }
  setTime = (time) => {
    this.setState({
      milliSecond: time.milliSecond,
      second: time.second,
      minute: time.minute,
      hour: time.hour,
    });
  };
  render() {
    return (
      <div className="box stopwatch">
        <h2 className="text-cap fs-28 margin-1 pink">stop watch</h2>
        <button
          onClick={() => {
            this.props.handleChange(`isStopWatchOpen`);
          }}
          className="fs-28 fw-600 cross"
        >
          x
        </button>
        {(this.state.isresumed === false && this.state.start === "stopped") ||
        this.state.start === false ? (
          <p className="fs-28">
            {" "}
            {this.state.hour > 9
              ? this.state.hour
              : `${0}${this.state.hour}`} :{" "}
            {this.state.minute > 9
              ? this.state.minute
              : `${0}${this.state.minute}`}{" "}
            :{" "}
            {this.state.second > 9
              ? this.state.second
              : `${0}${this.state.second}`}{" "}
            :{" "}
            {this.state.milliSecond > 9
              ? this.state.milliSecond
              : `${0}${this.state.milliSecond}`}
          </p>
        ) : (
          <Timer setTime={this.setTime} time={this.state} />
        )}
        {this.state.start ? (
          <div>
            {this.state.start === "stopped" &&
            this.state.isresumed === false ? (
              <>
                <button
                  className="start text-cap fs-20"
                  onClick={() => {
                    this.setState({
                      isresumed: true,
                    });
                  }}
                >
                  resume
                </button>
                <button
                  className="start text-cap fs-20"
                  onClick={() => {
                    this.setState({
                      milliSecond: 0,
                      second: 0,
                      minute: 0,
                      hour: 0,
                      start: false,
                    });
                  }}
                >
                  reset
                </button>
              </>
            ) : (
              <button
                className="start text-cap fs-20"
                onClick={() => {
                  this.setState({
                    start: "stopped",
                    isresumed: false,
                  });
                }}
              >
                stop
              </button>
            )}
          </div>
        ) : (
          <button
            className="start text-cap fs-20"
            onClick={() => {
              this.setState({
                start: true,
              });
            }}
          >
            start
          </button>
        )}
      </div>
    );
  }
}

export { StopWatchBtn, StopWatch };
