import { db } from "./firebase";

const getUsers = async () => {
  const querySnapshot = await db.collection("users").get();
  return querySnapshot.docs.map((doc) => doc.data());
};

export { getUsers };