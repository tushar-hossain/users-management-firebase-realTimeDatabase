import { Button, Form, Input } from "antd";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { app } from "../firebase/firebase.config";

const UsersForm = () => {
  const onFinish = (values) => {
    const key = Date.now().toString();
    values.key = key;

    // save data firebase database
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "user-management/users"));
    set(newDocRef, values)
      .then(() => {
        alert("data saved success");
      })
      .catch((error) => console.log("save data error: ", error.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "15px" }}>Add User</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          {/* age */}
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input type="number" placeholder="Enter your age" />
          </Form.Item>

          {/* address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          {/* button */}
          <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UsersForm;
