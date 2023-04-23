import * as React from "react";
import { BlueStyledButton } from "../components/Button/CustomizedButton";
import { Card } from "../components/Card/Card";
import { CustomizedTextField } from "../components/Input/CustomizedTextField";
import { PasswordTextField } from "../components/Input/PasswordTextField";
import { useLogin } from "../hooks/useLogin";

import "./Login.css";

const Login = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { error, isLoading, mutateAsync: login } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login({ email, password });
  };

  return (
    <div className="login">
      <Card>
        <form id="login-form" className="login" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>Email:</label>
          <CustomizedTextField
            type={"email"}
            onChange={setEmail}
            value={email}
            name={"email"}
          />

          <label>Password:</label>
          <PasswordTextField
            onChange={setPassword}
            value={password}
            name={"password"}
          />

          <BlueStyledButton
            variant="text"
            type="submit"
            form="login-form"
            disabled={isLoading}
          >
            Submit
          </BlueStyledButton>
          {error ? <div className="error">{`${error}`}</div> : <div></div>}
        </form>
      </Card>
    </div>
  );
};

export default Login;
