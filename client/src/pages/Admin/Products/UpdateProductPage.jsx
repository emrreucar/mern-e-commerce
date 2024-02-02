import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [categoriesResponse, singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !singleProductResponse.ok) {
          message.error("Veri getirme başarısız.");
          return;
        }

        const [categoriesData, singleProductData] = await Promise.all([
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData);
        // setSingleProduct(singleProductData);

        if (singleProductData) {
          form.setFieldsValue({
            name: singleProductData.name,
            current: singleProductData.price.current,
            discount: singleProductData.price.discount,
            description: singleProductData.description,
            img: singleProductData.img.join("\n"),
            colors: singleProductData.colors.join("\n"),
            sizes: singleProductData.sizes.join("\n"),
            category: singleProductData.category,
          });
        }
      } catch (error) {
        console.log("Internal server error! ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    console.log(values);

    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((color) => color.trim());
    const sizes = values.sizes.split("\n").map((size) => size.trim());

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          img: imgLinks,
          colors,
          sizes,
        }),
      });

      if (response.ok) {
        message.success("Product updated successfully");
        navigate("/admin/products");
      } else {
        message.error("Failed to update product!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={onFinish}
        form={form}
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 size for category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Discount Rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input product discount!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product Content"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input product content!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Product Images (Links) "
          name="img"
          rules={[
            {
              required: true,
              message: "Please enter at least 4 image for product!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="insert each image link on a new line."
            autoSize={{ minRows: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Colors"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 colors for product!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="please enter"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Sizes"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 size for product!",
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 4 }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
