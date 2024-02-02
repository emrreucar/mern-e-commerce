import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const params = useParams();
  const couponId = params.id;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Coupon updated successfully");
        navigate("/admin/coupons");
      } else {
        message.error("Failed to update coupon!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası!");
        }

        const data = await response.json();

        console.log(data);

        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [apiUrl, couponId, form]);

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
          label="Coupon Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input coupon code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon Discount Rate"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input coupon discount rate!",
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

export default UpdateCouponPage;
