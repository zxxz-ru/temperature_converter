import React from "react";
import PropTypes from "prop-types";

export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: "" };
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.temperature !== this.props.temperature) {
      this.setState({ value: nextProps.temperature });
    }
  }
  // style={{ textAlign: "right" }}{scaleNames[scale]}
  render() {
    // const scale = this.props.scale;
    return (
      <div className="row converter-component-main-div">
        <div className="col-xs-12 col-sm-4 text-right">
          Температура по шкале {this.props.labelEnd}:
        </div>
        <div className="col-xs-12 col-sm-4">
          <input value={this.state.value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

TemperatureInput.PropTypes = {
  temperature: PropTypes.number,
  labelEnd: PropTypes.string,
  onTemperatureChange: PropTypes.func
};
