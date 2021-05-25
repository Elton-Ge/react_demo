import React, { PureComponent } from "react";
import { Form, Button, Select } from "antd";
import PubSub from 'pubsub-js'
import axios from "axios";

export default class Search extends PureComponent {
  state = {
    componentSize: "default"
    
  };
  onFormLayoutChange = ({ size }) => {
    this.setComponentSize(size);
  };

  search = () => {
    const direction = this.directionOption;
    const timestamp = this.timestampOption;
    
    //before request
    PubSub.publish("searchByDirectAndTime", { isLoading: true, searched: true ,direction,timestamp });
    //async request
    axios
      .get(`/getLocation?direction=${direction}&timestamp=${timestamp}`)
      .then(
        (response) => {
          PubSub.publish("searchByDirectAndTime", {
            isLoading: false,
            result: response.data,
          });
        },
        (error) => {
          PubSub.publish("searchByDirectAndTime", {
            isLoading: false,
            err: error.message,
          });
        }
      );
  };

  searchAll = () => {
    PubSub.publish("searchAll", { isLoading: true, searched: true });
    axios
    .get(`/getAll`)
    .then(
      (response) => {
        PubSub.publish("searchAll", {
          isLoading: false,
          result: response.data,
        });
      },
      (error) => {
        PubSub.publish("searchAll", {
          isLoading: false,
          err: error.message,
        });

      }
    );
  }

  render() {
    return (
        <div className=" jumbotron ">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: this.state.componentSize,
            }}
            onValuesChange={this.onFormLayoutChange}
            size={this.state.componentSize}
          >
            <Form.Item label="Direction">
              <Select
                onChange={(value) => {
                  this.directionOption = value;
                }}
                placeholder="Exit"
                size="large"
              >
                <Select.Option value="exit">Exit</Select.Option>
                <Select.Option value="entry">Entry</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Timestamp">
              <Select
                onChange={(value) => {
                  this.timestampOption = value;
                }}
                placeholder="Weekdays"
                size="large"
              >
                <Select.Option value="weekdays">Weekdays</Select.Option>
                <Select.Option value="weekend">Weekend</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Filtered Search">
              <Button
                type="primary"
                onClick={this.search}
                size="large"
                shape="round"
              >
                Click Me !
              </Button>
            </Form.Item>

            <Form.Item label="Show Me All">
              <Button
                type="ghost"
                onClick={this.searchAll}
                size="large"
                shape="round"
              >
                Search all data !
              </Button>
            </Form.Item>
          </Form>
        </div>
      
    );
  }
}
