import { Button, Popconfirm, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user ?"
          onConfirm={() => deleteHandler(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger style={{ border: "none" }}>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Bir şeyler ters gitti!");
      }
    } catch (error) {
      console.log("Internal server error! ", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı silindi");
        fetchUsers();
      } else {
        message.error("Kullanıcı silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(dataSource);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
