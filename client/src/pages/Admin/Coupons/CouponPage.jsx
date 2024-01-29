import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <b> {text} </b>,
    },
    {
      title: "Discount Rate",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <span> %{text} </span>,
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
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete the coupon"
            description="Are you sure to delete this coupon?"
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
      const response = await fetch(`${apiUrl}/api/coupons`);

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
      const response = await fetch(`${apiUrl}/api/coupons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Coupon deleted");
        // fetchCategories();

        setDataSource((prev) => {
          return prev.filter((coupon) => coupon._id !== id);
        });
      } else {
        message.error("Coupon silinirken bir hata oluştu.");
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

export default CouponPage;
