import React from "react";
import BoilingVerdict from "./boiling_verdict";
import TemperatureInput from "./temperature_input";
import { scaleNames, scales, defaultState } from "./converter_constants";
import "./converter.less";

function toCelsius(tmp, scale) {
  switch (scale) {
    case scales.FAHRENHEIT:
      return (+tmp - 32) * 5 / 9;
    case scales.KELVIN:
      return +tmp - 273.15;
    default:
      return "";
  }
}

function toFahrenheit(celsius) {
  return +celsius * (9 / 5) + 32;
}

function toKelvin(celsius) {
  return +celsius + 273.15;
}

function roundString(input) {
  return (Math.round(input * 100) / 100).toString();
}

function temperatureToState({ celsius, fahrenheit, kelvin }) {
  this.setState({
    celsius,
    fahrenheit,
    kelvin
  });
}

function tryConvert(tmp, scale) {
  const toState = temperatureToState.bind(this);
  const temperature = parseFloat(tmp);
  let celsius = "";
  let fahrenheit = "";
  let kelvin = "";
  if (Number.isNaN(temperature)) {
    toState(defaultState);
    return false;
  }

  switch (scale) {
    case scales.CELSIUS: {
      celsius = roundString(temperature);
      fahrenheit = roundString(toFahrenheit(temperature));
      kelvin = roundString(toKelvin(temperature));
      toState({ celsius, fahrenheit, kelvin });
      break;
    }

    case scales.FAHRENHEIT: {
      celsius = roundString(toCelsius(temperature, scales.FAHRENHEIT));
      fahrenheit = roundString(temperature);
      kelvin = roundString(toKelvin(celsius));
      toState({ celsius, fahrenheit, kelvin });
      break;
    }
    case scales.KELVIN: {
      celsius = roundString(toCelsius(temperature, scales.KELVIN));
      fahrenheit = roundString(toFahrenheit(celsius));
      kelvin = roundString(temperature);
      toState({ celsius, fahrenheit, kelvin });
      break;
    }
    default:
      toState(defaultState);
  }
  return false;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.tryConvert = tryConvert.bind(this);
    this.state = { defaultState };
  }

  handleCelsiusChange(temperature) {
    this.tryConvert(temperature, scales.CELSIUS);
  }

  handleFahrenheitChange(temperature) {
    this.tryConvert(temperature, scales.FAHRENHEIT);
  }

  handleKelvinChange(temperature) {
    this.tryConvert(temperature, scales.KELVIN);
  }

  render() {
    const celsius = this.state.celsius;
    const fahrenheit = this.state.fahrenheit;
    const kelvin = this.state.kelvin;
    return (
      <div>
        <TemperatureInput
          labelEnd={scaleNames[scales.CELSIUS]}
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          labelEnd={scaleNames[scales.FAHRENHEIT]}
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <TemperatureInput
          labelEnd={scaleNames[scales.KELVIN]}
          temperature={kelvin}
          onTemperatureChange={this.handleKelvinChange}
        />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}

export default Calculator;
