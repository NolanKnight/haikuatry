import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Post = () => {
    const [title, setTitle] = useState("");
    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [line3, setLine3] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (title.trim() === "" || line1.trim() === "" || line2.trim() === "" || line3.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "haiku"), {
      title: title,
      line1: line1,
      line2: line2,
      line3: line3,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setTitle("");
    setLine1("");
    setLine2("");
    setLine3("");
  };

  return (
    <div className="grid place-items-center">
      <h1 className="">Post a Haiku</h1>

      <div className="mt-4">
        <form onSubmit={(event) => sendMessage(event)} className="grid grid-rows-4 h-[50vh] place-items-center">
            <input
                type="text"
                placeholder="Title"
                value={title}
                className="text-lg h-6 w-auto text-center"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Line 1"
                value={line1}
                className="text-lg h-6 w-auto text-center"
                onChange={(e) => setLine1(e.target.value)}
            />

            <input
                type="text"
                placeholder="Line 2"
                value={line2}
                className="text-lg h-6 w-auto text-center"
                onChange={(e) => setLine2(e.target.value)}
            />

            <input
                type="text"
                placeholder="Line 3"
                value={line3}
                className="text-lg h-6 w-auto text-center"
                onChange={(e) => setLine3(e.target.value)}
            />
            <button type="submit" className="mt-4 w-64 h-12 bg-blue-800 text-green-400 rounded-xl">Submit</button>
        </form>
        </div>
    </div>
  );
}

export default Post;