import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = process.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc} alt="Image" width={100} height={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b> {text} </b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            style={{ border: "none" }}
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={() => deleteHandler(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ border: "none" }}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

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
      const response = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori silindi");
        // fetchCategories();

        setDataSource((prevCategory) => {
          return prevCategory.filter((category) => category._id !== id);
        });
      } else {
        message.error("Kategori silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{
          pageSize: 7,
        }}
      />
    </div>
  );
};

export default CategoryPage;
