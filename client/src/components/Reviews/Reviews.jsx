import "./reviews.css";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import { useEffect, useState } from "react";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  const [users, setUsers] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const thisReview = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Bir şeyler ters gitti!");
        }
      } catch (error) {
        console.log("Internal server error! ", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  console.log("Users: ", users);

  // yorumlarla kullanıcıyı eşleme
  singleProduct &&
    singleProduct.reviews.forEach((review) => {
      const matchingUsers = users?.filter((user) => user._id === review.user);

      matchingUsers.forEach((matchingUser) => {
        thisReview.push({
          review: review,
          user: matchingUser,
        });
      });
    });

  return (
    <div className={`tab-panel-reviews ${active} `}>
      {singleProduct && singleProduct.reviews.length > 0 ? (
        <>
          <h3>
            Bu ürün hakkında
            <span
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                fontWeight: "bolder",
              }}
            >
              {singleProduct.reviews.length}
            </span>
            yorum bulundu.
          </h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <div>Henüz bu ürüne ait bir yorum yoktur.</div>
      )}
      <div className="review-form-wrapper" style={{ marginTop: "30px" }}>
        <h1>Add a review</h1>
        <ReviewForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;
