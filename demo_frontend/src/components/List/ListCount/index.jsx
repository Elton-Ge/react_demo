import React, { PureComponent } from "react";
import PubSub from "pubsub-js";
import Loading from "../../Loading";

export default class ListCount extends PureComponent {
  state = {
    result: 0,
    searched: false,
    isLoading: false,
    err: "",
    direction: "",
    timestamp: "",
  };
  componentDidMount() {
    this.token = PubSub.subscribe("searchByDirectAndTime", (_, stateObj) => {
      this.setState(stateObj);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { result, isLoading, err, direction, timestamp } = this.state;
    let ExitWeekdays =
      direction === "exit" && timestamp === "weekdays" ? result : 0;
    let EntryWeekdays =
      direction === "entry" && timestamp === "weekdays" ? result : 0;
    let ExitWeekend =
      direction === "exit" && timestamp === "weekend" ? result : 0;
    let EntryWeekend =
      direction === "entry" && timestamp === "weekend" ? result : 0;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : err ? (
          <h3 style={{ color: "red" }}>{err} </h3>
        ) : (
          <div>
            <h3 className="text-center mb4 mt4 text-success">
              Show Filtered Data{" "}
            </h3>
            <table className="table bg-success">
              <thead>
                <tr>
                  <th scope="col">Timestamp</th>
                  <th scope="col">ExitCount</th>
                  <th scope="col">EntryCount</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Weekdays</th>
                  <th>{ExitWeekdays}</th>
                  <th>{EntryWeekdays}</th>
                  <th>{timestamp === "weekdays" ? result : 0}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th scope="row">Weekend</th>
                  <th>{ExitWeekend}</th>
                  <th>{EntryWeekend}</th>
                  <th>{timestamp === "weekend" ? result : 0}</th>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
