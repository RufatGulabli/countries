import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkValidity, checkIfFormIsValid } from "../../util/utility";
import { registerStart } from "../../store/actions/auth";

class Register extends Component {
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
      },
      firstname: {
        type: "text",
        placeholder: "First Name",
        value: "",
        validation: {
          required: true,
          minLength: 3,
          onlyLetters: true
        },
        isValid: false,
        touched: false,
        errorMsg:
          "Firstname must be at least 3 characters long and contain only letters."
      },
      lastname: {
        type: "text",
        placeholder: "Last Name",
        value: "",
        validation: {
          required: true,
          minLength: 3,
          onlyLetters: true
        },
        isValid: false,
        touched: false,
        errorMsg:
          "Lastname must be at least 3 characters long and contain only letters."
      },
      birthdate: {
        type: "date",
        placeholder: "Birthdate",
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        errorMsg: "Please select birthdate."
      },
      gender: {
        type: "select",
        placeholder: "Gender",
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        errorMsg: "Gender must be choosen."
      }
    },
    errorMessage: null
  };

  onChangeHandler = (event, controlName) => {
    const updatedForm = {
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
    this.setState({ form: updatedForm });
  };

  onSubmit = e => {
    e.preventDefault();
    const { form } = this.state;
    const isFormValid = checkIfFormIsValid(form);
    if (isFormValid) {
      const data = {
        email: form.email.value,
        password: form.password.value,
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        birthdate: form.birthdate.value,
        gender: form.gender.value
      };
      this.props.register(data, this.props.history);
    } else {
      this.setState({ errorMessage: "Form is invalid." });
    }
  };

  render() {
    const inputArray = [];

    let stateErrorMsg = null;
    if (this.props.error || this.state.errorMessage) {
      stateErrorMsg = (
        <p className="form-signin w-100 mt-1 font-weight-bold text-center text-danger bg-warning">
          {this.props.error || this.state.errorMessage}
        </p>
      );
    }

    const { form } = this.state;
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

    let formIsValid = checkIfFormIsValid(form);

    const inputs = inputArray.map(inp => {
      let errorMsg = null;
      if (inp.touched && !inp.isValid) {
        errorMsg = (
          <small key={inp.id} style={{ color: "indianred" }}>
            {inp.errorMsg}
          </small>
        );
      }

      if (inp.type === "select") {
        return (
          <div key="select">
            <select
              className="form-control mb-2"
              onChange={event => this.onChangeHandler(event, inp.id)}
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errorMsg}
          </div>
        );
      }

      return (
        <div key={inp.id}>
          <input
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

    return (
      <div className="col-12 d-flex justify-content-center align-items-center">
        <form
          className="form-signin w-25 mt-5 col-4 form-signin mt-5 shadow p-5 mb-5 bg-white rounded"
          onSubmit={this.onSubmit}
        >
          {stateErrorMsg}
          <h1 className="h3 mb-3 font-weight-normal">Registration Form</h1>
          {inputs}
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={!formIsValid}
          >
            Register
          </button>
          <div className="mt-3 d-flex justify-content-center">
            <NavLink className="text-success" to="/login">
              Go To Login
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.authReducer.registerError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (data, history) => dispatch(registerStart(data, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
