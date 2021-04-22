import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";
import Logo from '../../images/beer-box.png'

// Retrieve validators

import CheckButton from "react-validation/build/button";

// Retrieve login action
import { login } from "../../actions/userActions";

import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  FormCustom,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  TextLink,
} from "./SigninElements";

//
/**
 * Show error on missing value
 * @param {*} value
 * @returns {HTMLElement} This field is required!
 */

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/**
 * Render Login Component
 * @param {*} props
 * @returns {HTMLElement} Login Component
 */

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  // Update email on state
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  // Update password on state
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    /** Avoid refresh  */
    e.preventDefault();

    /** Set loading state to true */
    setLoading(true);

    /**  Validate forms input */
    form.current.validateAll();

    /** Check if no errors are present */
    if (checkBtn.current.context._errors.length === 0) {
      /**  Trigger state change with login*/
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  /** Redirect user to home on successful login */
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">
            {" "}
            <img src={Logo} alt="" width="45px" height="45px" />{" "}
          </Icon>
          <FormContent>
            <FormCustom onSubmit={handleLogin} ref={form}>
              <FormH1>Sign in</FormH1>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
                placeholder="Enter email"
              />

              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                placeholder="Enter password"
              />

              <TextLink to="/construction">Forgot Password?</TextLink>
              <FormInput
                type="text"
                name="gameID"
                validations={[required]}
                placeholder="Enter Game ID"
                id="gameid1"
              />

              <FormButton disabled={loading} type="submit" id="signinbutton">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Log In</span>
              </FormButton>
              <TextLink to="/construction">Forgot Password?</TextLink>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </FormCustom>
          </FormContent>
        </FormWrap>
      </Container>

      {/* <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */}
    </>
  );
};

export default Login;
