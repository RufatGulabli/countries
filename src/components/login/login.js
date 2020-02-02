import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginStart } from "../../store/actions/auth";
import { checkValidity, checkIfFormIsValid } from "../../util/utility";

class Login extends Component {
  state = {
    form: {
      email: {
        type: "email",
        placeholder: "Your Email",
        value: "",
        validation: {
          required: true,
          isMail: true
        },
        isValid: false,
        touched: false,
        errorMsg: "Invalid email format."
      },
      password: {
        type: "password",
        placeholder: "Password",
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        isValid: false,
        touched: false,
        errorMsg: "Password can't be empty."
      }
    }
  };

  onChangeHandler = (event, controlName) => {
    const updatedState = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: event.target.value,
        isValid: checkValidity(
          this.state.form[controlName].validation,
          event.target.value
        ),
        touched: true
      }
    };
    this.setState({ form: updatedState });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state.form;
    this.props.login(email.value, password.value, this.props.history);
  };

  render() {
    let stateErrorMsg = null;
    if (this.props.error) {
      stateErrorMsg = (
        <p className="form-signin w-100 mt-1 font-weight-bold text-center text-danger bg-warning">
          {this.props.error}
        </p>
      );
    }

    const { form } = this.state;
    const inputArray = [];
    for (let key in form) {
      inputArray.push({
        id: key,
        type: form[key].type,
        value: form[key].value,
        placeholder: form[key].placeholder,
        isValid: form[key].isValid,
        touched: form[key].touched,
        errorMsg: form[key].errorMsg
      });
    }

    const inputs = inputArray.map(inp => {
      let errorMsg = null;
      if (inp.touched && !inp.isValid) {
        errorMsg = <small style={{ color: "indianred" }}>{inp.errorMsg}</small>;
      }

      return (
        <div>
          <input
            key={inp.id}
            type={inp.type}
            placeholder={inp.placeholder}
            required
            className="form-control mb-2"
            onChange={event => this.onChangeHandler(event, inp.id)}
          />
          {errorMsg}
        </div>
      );
    });

    let formIsInvalid = checkIfFormIsValid(form);

    return (
      <div className="col-12 d-flex justify-content-center align-items-center">
        <form
          className="col-4 form-signin mt-5 shadow p-5 mb-5 bg-white rounded"
          onSubmit={this.onSubmit}
        >
          {stateErrorMsg}
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          {inputs}
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!formIsInvalid}
          >
            Sign in
          </button>
          <div className="mt-3 d-flex justify-content-center">
            <NavLink to="/register" className="text-info">
              Register
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.authReducer.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, history) =>
      dispatch(loginStart(email, password, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
