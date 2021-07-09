// Retrieve new posts as they are added to our database
import { database } from "../services/firebase";
// import { useAuth } from "./useAuth";

export function getAuthorRoom(roomId: string) {
  const roomRef = database.ref(`rooms/${roomId}`);
  var author = "";
  roomRef.on("value", (snapshot, prevChildKey) => {
    const newPost = snapshot.val();
    author = newPost.authorId;
  });
  return author;
}
