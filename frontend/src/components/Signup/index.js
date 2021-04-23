import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { signup } from "../../actions/userActions";
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
  FormSelect,
} from "../Signin/SigninElements";
import Logo from "../../images/beer-box.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const valid_email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email!
      </div>
    );
  }
};

/**
 * Check whether the username is valid
 * @param {*} value
 * @returns {HTMLElement} Username must be between 8 and 32 characters.
 */
const valid_username = (value) => {
  if (value.length < 8 || value.length > 32) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 8 and 32 characters.
      </div>
    );
  }
};

const valid_password = (value) => {
  if (value.length < 8 || value.length > 64) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 64 characters.
      </div>
    );
  }
};

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRole = (e) => {
    const role = Number(e.target.value);
    setRole(role);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signup(username, email, password, role))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">
            {" "}
            <img src={Logo} alt="" width="45px" height="45px" />{" "}
          </Icon>
          <FormContent>
            <FormCustom onSubmit={handleSignUp} ref={form}>
              <FormH1> Sign Up </FormH1>
              {!successful && (
                <>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormInput
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, valid_username]}
                    placeholder="Enter username"
                  />

                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, valid_email]}
                    placeholder="Enter email"
                  />

                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormInput
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, valid_password]}
                    placeholder="Enter password"
                  />
                  <div className="role-div">
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <FormSelect
                      className="form-control"
                      name="role"
                      onChange={onChangeRole}
                    >
                      <option value="2"> Instructor </option>
                      <option value="3"> Student </option>
                    </FormSelect>
                  </div>

                  <FormButton>Sign Up</FormButton>
                  <div>
                    <TextLink to="/signin">
                      {" "}
                      Already registered, sign in?
                    </TextLink>
                  </div>
                </>
              )}

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

export default SignUp;
