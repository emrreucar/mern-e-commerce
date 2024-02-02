import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const params = useParams();
  const categoryId = params.id;
  console.log(categoryId);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Category updated successfully");
        navigate("/admin/categories");
      } else {
        message.error("Failed to update category!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası!");
        }

        const data = await response.json();

        console.log(data);

        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        autoComplete="off"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Image (Link) "
          name="img"
          rules={[
            {
              required: true,
              message: "Please input category image!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
