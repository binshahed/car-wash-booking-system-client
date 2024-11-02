import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Form, FormProps, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useSignUpMutation } from "../store/features/auth/authApi";
import { TUserSignUp } from "../types/types.auth";
import { setUser, TUserData } from "../store/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { APIError } from "../types/ApiError";
import "../styles/style.auth.css";

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
      message.success("Registration successful");
      navigate(`/login`);
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

  return (
    <div className="login-page">
      <div className="login-image-section">
        <img
          src="https://media.licdn.com/dms/image/D4D12AQGA6odm93XONA/article-cover_image-shrink_720_1280/0/1675839423933?e=2147483647&v=beta&t=k4l6SyDe2-U9qtTTYJeUHcWNpeeCBqzEnso-okTBjIU"
          alt="Sign Up Background"
          className="login-image"
        />
        <div className="welcome-text">
          <h2>Welcome to Our Community!</h2>
          <p>Create an account to get started.</p>
        </div>
      </div>
      <div
        className="login-form-section"
        style={{
          padding: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7f9fc"
        }}
      >
        <div
          className="login-form-container"
          style={{
            backgroundColor: "white",
            padding: "40px 30px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            maxWidth: "500px",
            width: "100%"
          }}
        >
          <h1
            className="login-heading"
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Sign Up
          </h1>
          <Form
            name="normal_signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>

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
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone"
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" }
              ]}
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
                style={{ width: "100%", marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1890ff" }}>
                Login
              </Link>{" "}
              here.
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
