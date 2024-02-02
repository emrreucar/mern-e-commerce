import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Bir şeyler ters gitti!");
        }
      } catch (error) {
        console.log("Internal server error! ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    console.log(values);

    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((color) => color.trim());
    const sizes = values.sizes.split("\n").map((size) => size.trim());

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
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
        message.success("Product crated successfully");
        form.resetFields();
      } else {
        message.error("Failed to create product!");
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
          label="Product Colors (RGB Codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 colors for product!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="insert each image RGB code on a new line."
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
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
