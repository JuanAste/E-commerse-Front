import { useSession } from "next-auth/react";
import ReviewComment from "./ReviewComent";
import ReviewGrid from "./ReviewGrind";

export default function Reviews({ order, review, reviews }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {!!order && !session?.user?.ban ? <ReviewComment review={review} /> : null}
      {!!reviews.length && <ReviewGrid reviews={reviews} />}
    </div>
  );
}
