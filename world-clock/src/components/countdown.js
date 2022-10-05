import React from "react";

function CountDownBtn(props) {
  return (
    <button
      onClick={() => {
        props.handleChange(`isCountDownOpen`);
      }}
      className="fs-16 text-cap margin-1 btn blue"
    >
      show countdown
    </button>
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      minute: 0,
      hour: 0,
    };
  }
  componentDidMount() {
    this.setState({
      second: this.props.time.second,
      minute: this.props.time.minute,
      hour: this.props.time.hour,
    });

    setInterval(() => {
      if (this.state.second > 0) {
        this.setState({
          second: this.state.second - 1,
        });
      }
      if (this.state.second <= 1 && this.state.minute > 0) {
        this.setState({
          second: 59,
          minute: this.state.minute - 1,
        });
      }
      if (this.state.minute <= 1 && this.state.hour > 0) {
        this.setState({
          minute: 59,
          second: 59,
          hour: this.state.hour - 1,
        });
      }
    }, 1000);
  }
  componentDidUpdate() {
    if (
      this.state.second === 0 &&
      this.state.minute === 0 &&
      this.state.second === 0
    ) {
      this.componentWillUnmount();
    } else if (this.props.time.start === "stopped") {
      this.props.handleSetTime(this.state);
    }
  }
  componentWillUnmount() {
    this.props.handleChange();
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
      </p>
    );
  }
}

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      minute: 0,
      hour: 0,
      start: false,
      isresumed: false,
    };
  }
  handleSetTime = (timer) => {
    this.setState({
      second: timer.second,
      minute: timer.minute,
      hour: timer.hour,
    });
  };
  handleChange = () => {
    this.setState({
      start: false,
    });
  };
  render() {
    return (
      <div className="box stopwatch">
        <h2 className="text-cap fs-28 margin-1 pink">Count down</h2>
        <button
          onClick={() => {
            this.props.handleChange(`isStopWatchOpen`);
          }}
          className="fs-28 fw-600 cross"
        >
          x
        </button>
        <p className="fs-16 text-cap">Hours : minutes : seconds</p>
        <div className="flex justify-center">
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                hour: this.state.hour + 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                minute: this.state.minute + 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                second: this.state.second + 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
        {(this.state.isresumed === false && this.state.start === "stopped") ||
        !this.state.start ? (
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
          </p>
        ) : (
          <Timer
            setTime={this.setTime}
            time={this.state}
            handleChange={this.handleChange}
            handleSetTime={this.handleSetTime}
          />
        )}
        <div className="flex justify-center">
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                hour: this.state.hour - 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                minute: this.state.minute - 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <button
            className="arrow text-cap fs-20"
            onClick={() => {
              this.setState({
                second: this.state.second - 1,
              });
            }}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        {this.state.start ? (
          <div>
            {this.state.start === "stopped" &&
            this.state.isresumed === false ? (
              <>
                <button
                  className="start start-count text-cap fs-20"
                  onClick={() => {
                    this.setState({
                      isresumed: true,
                    });
                  }}
                >
                  resume
                </button>
                <button
                  className="start start-count text-cap fs-20"
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
                className="start start-count text-cap fs-20"
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
            className="start start-count text-cap fs-20"
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

export { CountDownBtn, CountDown };
