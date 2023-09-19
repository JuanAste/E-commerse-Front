import ReviewComment from "./ReviewComent";

export default function Reviews({ order, review, reviews }) {
  return <div>

    {order ? <ReviewComment review={review} /> : <p>no compraste el producto</p> }

  </div>;
}
