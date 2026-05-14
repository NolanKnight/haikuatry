import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Haiku from "../components/haiku";

const Feed = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "haiku"),
      orderBy("createdAt", "desc"),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => b.createdAt - a.createdAt,
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="w-full h-full">
      {messages?.map((haiku) => (
        <Haiku haiku={haiku} key={haiku.id} />
      ))}
    </div>
  );
};

export default Feed;
