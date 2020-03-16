import React from "react";
import styles from "./index.less";
import { Progress, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const ButtonGroup = Button.Group;

class App extends React.Component {
  state = {
    percent: 0
  };

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  };

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };

  render() {
    return (
      <div>
        <Progress percent={this.state.percent} />
        <ButtonGroup>
          <Button onClick={this.decline} icon={<MinusOutlined />} />
          <Button onClick={this.increase} icon={<PlusOutlined />} />
        </ButtonGroup>
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-progress-demo-dynamic">
      <App />
    </div>
  </div>
);
