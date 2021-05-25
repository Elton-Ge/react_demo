import React, { PureComponent } from "react";
import PubSub from "pubsub-js";
import Loading from "../../Loading";
import { Table } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "Direction",
    dataIndex: "direction",
    key: "direction",
  },
  {
    title: "Object",
    dataIndex: "object",
    key: "object",
  },
  {
    title: "LocationName",
    dataIndex: "locationName",
    key: "locationName",
  },
];

export default class ListAll extends PureComponent {
  state = {
    result: [],
    searched: false,
    isLoading: false,
    err: "",
  };
  componentDidMount() {
    this.token = PubSub.subscribe("searchAll", (_, stateObj) => {
      this.setState(stateObj);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { result, isLoading, err } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : err ? (
          <h3 style={{ color: "red" }}>{err} </h3>
        ) : (
          <div>
            <h3 className="text-center mb4 mt4 text-primary">Show All Data </h3>
            <Table  columns={columns} dataSource={result} rowKey="_id" />
          </div>
        )}
      </div>
    );
  }
}
