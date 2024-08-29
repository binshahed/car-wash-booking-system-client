import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, message } from "antd";
import "../styles/style.auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { TUserSignUp } from "../types/types.auth";
import { setUser, TUserData } from "../store/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLoginMutation } from "../store/features/auth/authApi";
import { APIError } from "../types/ApiError";

const LoginPage = () => {
  const [login, { data, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as { from?: string };

  const onFinish: FormProps<TUserSignUp>["onFinish"] = async (values) => {
    try {
      const res = await login(values).unwrap();
      const user = (await verifyToken(res.token)) as TUserData;

      dispatch(setUser({ user, token: res.token }));
      message.success("Login successful");

      const targetPath =
        state?.from && state.from.startsWith("/") ? state.from : "/";
      console.log("Navigating to:", targetPath);
      navigate(targetPath);
    } catch (err) {
      const apiError = err as APIError;
      message.error(apiError?.data?.message);
    }
  };

  const onFinishFailed: FormProps<TUserSignUp>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  console.log(location);
  

  return (
    <div className="box-style">
      <div className="signIn-container">
        <h1 className="login-heading">Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 400 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </Form.Item>
          <p>
            New member?{" "}
            <Link to="/sign-up" style={{ color: "var(--primary)" }}>
              Sign up
            </Link>{" "}
            here.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
