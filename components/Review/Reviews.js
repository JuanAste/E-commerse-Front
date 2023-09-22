import ReviewComment from "./ReviewComent";
import ReviewGrid from "./ReviewGrind";

export default function Reviews({ order, review, reviews }) {
  return (
    <div>
      {!!order && <ReviewComment review={review} />}
      {!!reviews.length && <ReviewGrid reviews={reviews} />}
    </div>
  );
}
