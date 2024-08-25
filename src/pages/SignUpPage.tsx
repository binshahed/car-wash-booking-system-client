import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Form, FormProps, Input, message } from "antd";
import "../styles/style.auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useSignUpMutation } from "../store/features/auth/authApi";
import { TUserSignUp } from "../types/types.auth";
import { setUser, TUserData } from "../store/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

import { APIError } from "../types/ApiError";


const SignUpPage = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish: FormProps<TUserSignUp>["onFinish"] = async (values) => {
    try {
      const res = await signUp(values).unwrap();
      const user = (await verifyToken(res.data.token)) as TUserData;

      dispatch(
        setUser({
          user: user,
          token: res.data.token
        })
      );
      message.success("Login successful");
      navigate(`/`);
    } catch (err) {
      console.log(err);

      const apiError = err as APIError;
      message.error(apiError?.data?.message);
    }
  };

  const onFinishFailed: FormProps<TUserSignUp>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="box-style">
      <div className="signIn-container">
        <h1 className="login-heading">Sign Up</h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 400 }}
        >
          <Form.Item<TUserSignUp>
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item<TUserSignUp>
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item<TUserSignUp>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item<TUserSignUp>
            name="phone"
            rules={[{ required: true, message: "Please input your Phone!" }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item<TUserSignUp>
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              prefix={<HomeOutlined className="site-form-item-icon" />}
              placeholder="Address"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
          <p>
            Already member?{" "}
            <Link to="/login" style={{ color: "var(--primary)" }}>
              Login
            </Link>{" "}
            here.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
