import styled from "styled-components";
import imageErr404 from "../../Images/error 404.png";
import { useEffect, useState } from "react";

const ContentRev = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid grey;
  margin-top: 5px;
`;

const ContentUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentName = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 10px;
`;

const UserImage = styled.img`
  height: 100%;
  width: 25px;
  border-radius: 50%;
`;

const ContentScore = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 1.5rem;
`;

const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonLoad = styled.button`
  color: #222;
  border: 1px solid #222;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  min-width: 120px;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 1rem;
  &:hover {
    background-color: #222;
    color: white;
  }
`;

export default function ReviewGrid({ reviews }) {
//   console.log(reviews);

  const [reviewsPerPage, setReviewsPerPage] = useState(3);
  const [visibleReviews, setVisibleReviews] = useState([]);

  useEffect(() => {
    setVisibleReviews(reviews.slice(0, reviewsPerPage));
  }, [reviews, reviewsPerPage]);

  const loadMoreReviews = () => {
    setReviewsPerPage(reviewsPerPage + 3);
  };

  return (
    <div>
      {visibleReviews.map((rev) => (
        <ContentRev key={rev._id}>
          <ContentUserInfo>
            <ContentName>
              <UserImage src={rev.image || imageErr404.src} alt="" />
              {rev.name || "<Unknown>"}
            </ContentName>
            <div>
              {rev.createdAt !== rev.updatedAt ? <span>(edit)</span> : null}{" "}
              {new Date(rev.createdAt).toLocaleDateString("es-ES")}
            </div>
          </ContentUserInfo>
          <ContentScore>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  color: star <= rev.score ? "gold" : "lightgray",
                }}
              >
                &#9733;
              </span>
            ))}
          </ContentScore>
          {rev.comment}
        </ContentRev>
      ))}
      <ContentButton>
        <ButtonLoad onClick={loadMoreReviews}>Load more</ButtonLoad>
      </ContentButton>
    </div>
  );
}
