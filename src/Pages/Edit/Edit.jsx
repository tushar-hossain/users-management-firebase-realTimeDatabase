import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, remove, push, set } from "firebase/database";
import { useParams } from "react-router";
import { app } from "../../firebase/firebase.config";

const Edit = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [address, setAddress] = useState("");

  const onFinish = (values) => {
    // save data firebase database
    const db = getDatabase(app);
    const newDocRef = ref(db, `user-management/users/${id}`);
    set(newDocRef, values)
      .then(() => {
        alert("data update success");
      })
      .catch((error) => console.log("save data error: ", error.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // firebase get Data
  useEffect(() => {
    const db = getDatabase(app);
    // match user-management/users/{id} for my database
    const userRef = ref(db, `user-management/users/${id}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUsers(snapshot.val());
        setLoading(false);
      } else {
        console.log("No data found!");
      }
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Users</h1>

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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              defaultValue={`${users.name}`}
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          {/* age */}
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <Input
              defaultValue={`${users.age}`}
              // onChange={(e) => setAge(e.target.value)}
            />
          </Form.Item>

          {/* address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              defaultValue={`${users.address}`}
              // onChange={(e) => setAddress(e.target.value)}
            />
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

export default Edit;
