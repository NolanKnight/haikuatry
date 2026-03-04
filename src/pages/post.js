import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Post = () => {
  const [title, setTitle] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

	const [user] = useAuthState(auth);

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

  const sendMessage = async (event) => {
    event.preventDefault();
    if (
      title.trim() === "" ||
      line1.trim() === "" ||
      line2.trim() === "" ||
      line3.trim() === ""
    ) {
      alert("Enter valid message");
      return;
    }

		if (!user) {
			await googleSignIn().catch((error) => {
				alert("Error during sign-in:", error);
			});
		}

		if (user) {
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
			}).then(() => {
				alert("Haiku posted successfully!");
			}).catch((error) => {
				alert("Error posting haiku: " + error.message);
			});

			setTitle("");
			setLine1("");
			setLine2("");
			setLine3("");
		}
  };

  return (
    <div className="grid place-items-center">
      <h1>Post a Haiku</h1>

      <form
        onSubmit={(event) => sendMessage(event)}
        className="w-full grid grid-rows-4 h-[50vh] place-items-center"
      >
        {[
          { key: 0, placeholder: "Title", value: title, setField: setTitle },
          { key: 1, placeholder: "Line 1", value: line1, setField: setLine1 },
          { key: 2, placeholder: "Line 2", value: line2, setField: setLine2 },
          { key: 3, placeholder: "Line 3", value: line3, setField: setLine3 },
        ].map((field) => (
          <input
            type="text"
            key={field.key}
            placeholder={field.placeholder}
            value={field.value}
            className="text h-6 p-4 min-w-[20vw] text-center bg-transparent border-b-2 border-blue-800 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out"
            onChange={(e) => field.setField(e.target.value)}
          />
        ))}

        <button
          type="submit"
          className="mt-4 w-64 h-12 text-blue-800 hover:text-blue-500 text-xl font-montserrat transition-colors duration-300 ease-in-out border-blue-800 hover:border-blue-500 border-4"
        >
          <b>SUBMIT</b>
        </button>
      </form>
    </div>
  );
};

export default Post;
