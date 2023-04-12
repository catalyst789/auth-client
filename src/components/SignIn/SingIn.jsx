import React, { useState } from "react";
import StyleSingIn from "./SigIn.module.css";
import Avatar from "@mui/material/Avatar";
import DefaultUserAvatar from "../../assets/ic_user.svg";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import axios from "axios";

const SingIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [singInError, setSignError] = useState("");
  const [signInHappening, setSignInHappening] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSingIn = async () => {
    try {
      setSignInHappening(true);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail) || userPassword.length < 8) {
        !emailRegex.test(userEmail) &&
          setEmailInputError("Please enter a valid email.");
        userPassword.length < 8 &&
          setPasswordInputError("Password must be 8 characters long.");
        setSignInHappening(false);
        return;
      }
      if (!userEmail || !userPassword) {
        setSignInHappening(false);
        return;
      }
      var signInRes = await axios.post("http://localhost:8989/singin", {
        email: userEmail,
        password: userPassword,
      });
      if (signInRes.status !== 200) {
        setSignError(signInRes);
        setSignInHappening(false);
      }
      localStorage.setItem("token", signInRes.data.token);
      localStorage.setItem("id", userEmail);
      navigate("/home");
      setSignInHappening(false);
    } catch (err) {
      setSignInHappening(false);
      console.log(err);
      setSignError(err.response.data.message);
    }
  };

  const onEmailInput = (event) => {
    if (emailInputError) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(event.target.value)) {
        setEmailInputError("");
      }
    }
    setUserEmail(event.target.value);
  };

  const onPasswordInput = (event) => {
    if (passwordInputError) {
      if (event.target.value.length >= 8) {
        setPasswordInputError("");
      }
    }
    setUserPassword(event.target.value);
  };
  console.log("passwordInputError: ", passwordInputError);
  console.log("emailInputError: ", emailInputError);

  return (
    <div className={StyleSingIn.SingInBox}>
      {singInError ? <Alert severity="error">{singInError}</Alert> : ""}
      <div className={StyleSingIn.avatar}>
        <Avatar src={DefaultUserAvatar} />
      </div>
      <h1 style={{ color: "#0B3558" }}>Welcome</h1>
      <p style={{ color: "#0B3558" }}>
        Let's connect to your workspace. <br />
        Please enter your email to continue
      </p>
      <TextField
        error={!!emailInputError}
        onChange={onEmailInput}
        size="small"
        className={StyleSingIn.emailInput}
        id="outlined-basic"
        label="Email Address"
        variant="outlined"
        helperText={emailInputError}
        onKeyDown={(e) => e.key === "Enter" && handleSingIn()}
      />
      <FormControl
        size="small"
        className={StyleSingIn.passwordInput}
        sx={{ m: 1 }}
        variant="outlined"
      >
        <InputLabel
          error={!!passwordInputError}
          htmlFor="outlined-adornment-password"
        >
          Password
        </InputLabel>
        <OutlinedInput
          error={!!passwordInputError}
          onChange={onPasswordInput}
          onKeyDown={(e) => e.key === "Enter" && handleSingIn()}
          value={userPassword}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText error={!!passwordInputError} id="accountId-error">
          {passwordInputError}
        </FormHelperText>
      </FormControl>
      <div className={StyleSingIn.forgotPassword}>Forgot Password ?</div>
      <Button
        disabled={!userEmail || !userPassword}
        onClick={handleSingIn}
        className={StyleSingIn.SingInBtn}
        variant="contained"
      >
        {signInHappening ? <CircularProgress color="inherit" /> : "Sign In"}
      </Button>
    </div>
  );
};

export default SingIn;
