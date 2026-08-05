import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (!file) {
      setErr("Please select an avatar image.");
      setLoading(false);
      return;
    }

    let res = null;

    try {
      res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `avatars/${res.user.uid}/${displayName + date}`);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        searchName: displayName.toLowerCase(),
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (error) {
      console.error(error);
      if (res?.user) {
        try {
          await deleteUser(res.user);
        } catch (deleteError) {
          console.error("Failed to cleanup user after registration error:", deleteError);
        }
      }
      console.error("Registration error", error);
      const code = error.code || "";
      let message = "Registration failed. Check your input and try again.";

      if (code === "auth/email-already-in-use") {
        message = "That email is already registered. Please login or use a different email.";
      } else if (code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (code === "storage/unauthorized") {
        message = "Storage upload blocked: check your Firebase Storage rules and make sure authenticated users can write avatar files.";
      } else if (code.startsWith("storage/")) {
        message = `${error.message} (${code})`;
      }

      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Queens Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Add} alt="Add avatar" />
            <span>{file ? file.name : "Add an avatar"}</span>
          </label>
          <button type="submit" disabled={loading}>
            Sign up
          </button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>{err}</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
