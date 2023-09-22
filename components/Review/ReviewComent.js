import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const Content = styled.form`
  border: 1px solid #222;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const ContentScore = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 1.5rem;
`;

const InputComment = styled.textarea`
  max-width: 99%;
  min-width: 99%;
  min-height: 3rem;
`;

const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export default function ReviewComment({ review }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [reviewData, setReviewData] = useState({
    score: review?.score || 1,
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

  return (
    <div>
      <Content onSubmit={SubmitReview}>
        <ContentScore>
          <span>Qualification: </span>
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
        </ContentScore>
        <InputComment
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Deja tu comentario sobre el producto"
        />
        <ContentButton>
          {review ? (
            <Button blue={1}>Update</Button>
          ) : (
            <Button greenSave={1}>Submit</Button>
          )}
        </ContentButton>
      </Content>
    </div>
  );
}
