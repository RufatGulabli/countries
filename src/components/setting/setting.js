import React, { Component } from "react";
import { connect } from "react-redux";
import { Temperature } from "../../util/utility";
import { changeTemp } from "../../store/actions/index";

class Settings extends Component {
  state = {
    choice: null
  };

  onChange = e => {
    this.setState({ choice: e.target.value });
  };

  onSave = () => {
    const { choice } = this.state;
    const { changeDefaultTemp, history } = this.props;
    if (choice) {
      changeDefaultTemp(choice);
    }
    history.push("/dashboard");
  };

  onCancel = () => {
    this.props.history.replace("/dashboard");
  };

  render() {
    const temps = [];
    const { defaultTemp } = this.props;
    let choosenTemp = "";
    for (let key in Temperature) {
      if (Temperature[key] === defaultTemp) {
        choosenTemp = key;
      }
      temps.push({
        [key]: Temperature[key]
      });
    }

    const radioInputs = temps.map((k, v) => {
      return (
        <div
          key={v}
          className="custom-control custom-radio custom-control-inline mb-1"
        >
          <input
            id={v}
            type="radio"
            name="temp"
            value={v}
            className="custom-control-input"
            onChange={this.onChange}
            defaultChecked={+defaultTemp === +v}
          />
          <label className="custom-control-label" htmlFor={v}>
            {Object.keys(k)[0]}
          </label>
        </div>
      );
    });

    return (
      <div className="col-8 offset-2">
        <div className="mb-3">
          <h3 className="display-4">Settings</h3>
          <p>Default Temperature: {choosenTemp}</p>
          {radioInputs}
        </div>
        <div>
          <button
            type="submit"
            onClick={this.onSave}
            className="btn btn-outline-success"
          >
            Save
          </button>
          <button
            type="submit"
            onClick={this.onCancel}
            className="btn btn-outline-danger ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaultTemp: state.authReducer.defaultTemp
  };
};

const mapDispathToProps = dispatch => {
  return {
    changeDefaultTemp: temp => dispatch(changeTemp(temp))
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Settings);
