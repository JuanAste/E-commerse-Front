import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewComment({ review }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [reviewData, setReviewData] = useState({
    score: review?.score || 0,
    comment: review?.comment || "",
    ProductId: router.query.id || "",
    _id: review?._id,
  });

  useEffect(() => {
    if (session) {
      setReviewData({
        ...reviewData,
        name: session.user?.name || "",
        image: session.user?.image || "",
        userId: session.user?.id || "",
      });
    }
  }, [session]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  }

  function handleStarClick(score) {
    setReviewData({
      ...reviewData,
      score: score,
    });
  }

  async function SubmitReview(ev) {
    // ev.preventDefault();
    try {
      if (review) {
        await axios.put("/api/review", reviewData);
      } else {
        await axios.post("/api/review", reviewData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(reviewData);

  return (
    <div>
      <form onSubmit={SubmitReview}>
        <div>
          <span>Calificación: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: "pointer",
                color: star <= reviewData.score ? "gold" : "lightgray",
              }}
            >
              &#9733;
            </span>
          ))}
        </div>
        <textarea
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Deja tu comentario sobre el producto"
        />
        <div>{review ? <button>Update</button> : <button>Submit</button>}</div>
      </form>
    </div>
  );
}
