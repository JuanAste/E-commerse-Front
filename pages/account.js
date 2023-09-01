import { signOut } from "next-auth/react";

export default function Account() {
  return (
    <div>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
