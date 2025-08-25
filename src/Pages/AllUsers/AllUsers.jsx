import { getDatabase, ref, get, onValue, remove } from "firebase/database";
import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // firebase get Data
  const fetchData = async () => {
    // Read data once
    // const db = getDatabase();
    // get(ref(db, "user-management/users")).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // });
    //
    // 2nd step
    //     const db = getDatabase();
    // onValue(ref(db, "user-management"), (snapshot) => {
    //   console.log(snapshot.val());
    // });
    //
    const db = getDatabase();
    const userRef = ref(db, "user-management/users");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setUsers(users);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete uders function
  const handleDelete = async (id) => {
    // console.log(id);
    const db = getDatabase();
    const userRef = ref(db, `user-management/users/${id}`);
    await remove(userRef);
  };

  // form colums
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit-users/${record.id}`}>Edit</Link>
          <button onClick={() => handleDelete(record.id)}>Delete</button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      {/* {users?.map((user=> <Table  dataSource={user} />))} */}
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default AllUsers;
