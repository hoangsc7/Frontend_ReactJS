import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnchangeInput = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
    // console.log(event.target.value);
  };
  //   handleOnchangeInputPassword = (event) => {
  //     this.setState({
  //       Username: event.target.value,
  //     });
  //     // console.log(even.target.value);
  //   };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  handleLogin = () => {
    console.log(
      "username:",
      this.state.username,
      "password :",
      this.state.password
    );
    console.log("all state", this.state);
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    //JSX

    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-login">Login</div>
              <div className="col-12 form-group login-input">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={this.state.Username}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "username");
                  }}
                  onKeyDown={this.handleKeyPress}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={this.state.Password}
                    onChange={(event) => {
                      this.handleOnchangeInput(event, "password");
                    }}
                    onKeyDown={this.handleKeyPress}
                  />
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-12 forgot-pw">
                <span className="">Forgot your password?</span>
              </div>
              <div className="col-12 text-other-login">
                <span className="">Or login with: </span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-facebook-f facebook"></i>
                <i class="fab fa-twitter twitter"></i>
                <i className="fab fa-google-plus-g google"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
