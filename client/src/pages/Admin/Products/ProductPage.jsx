import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc[0]} alt="Image" width={100} height={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b> {text} </b>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span> {text} </span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span> {text.current.toFixed(2)}₺ </span>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key: "price",
      render: (text) => <span> %{text.discount} </span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ border: "none" }}
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
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

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Product deleted");
        // fetchProducts();
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== id);
        });
      } else {
        message.error("Product error deleted.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri getirme başarısız.");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productWithCategories);
      } catch (error) {
        console.log("Internal server error! ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

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

export default ProductPage;
