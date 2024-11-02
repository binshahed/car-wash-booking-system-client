import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { TUserSignUp } from "../types/types.auth";
import { setUser, TUserData } from "../store/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLoginMutation } from "../store/features/auth/authApi";
import { APIError } from "../types/ApiError";
import "../styles/style.auth.css";
import { useRef } from "react";

// Import the FormInstance type from Ant Design
import { FormInstance } from "antd/lib/form";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const formRef = useRef<FormInstance | null>(null); // Explicitly type the formRef
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
      navigate(targetPath, { replace: true });
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

  // Function to set default login values
  const setDefaultLoginValues = (email: string, password: string) => {
    if (formRef.current) {
      formRef.current.setFieldsValue({
        email,
        password
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-image-section">
        <img
          src="https://media.licdn.com/dms/image/D4D12AQGA6odm93XONA/article-cover_image-shrink_720_1280/0/1675839423933?e=2147483647&v=beta&t=k4l6SyDe2-U9qtTTYJeUHcWNpeeCBqzEnso-okTBjIU"
          alt="Login Background"
          className="login-image"
        />
        <div className="welcome-text">
          <h2>Welcome Back!</h2>
          <p>Log in to access your account and explore new possibilities.</p>
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
            Login
          </h1>
          <div style={{ margin: "20px 0" }}>
            <Button
              style={{ margin: "0 5px" }}
              onClick={() =>
                setDefaultLoginValues("mdbinshahed5@gmail.com", "1234")
              }
            >
              User
            </Button>
            <Button
              onClick={() => setDefaultLoginValues("admin@mail.com", "1234")}
            >
              Admin
            </Button>
          </div>
          <Form
            name="normal_login"
            ref={formRef} // Attach the ref to the Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "100%" }}
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
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
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
                Login
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              New member?{" "}
              <Link to="/sign-up" style={{ color: "#1890ff" }}>
                Sign up
              </Link>{" "}
              here.
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
