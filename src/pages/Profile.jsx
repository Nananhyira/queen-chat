import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setPreview(currentUser.photoURL || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      let photoURL = currentUser.photoURL || "";

      if (file) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `avatars/${currentUser.uid}/${displayName + date}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName,
        photoURL,
        searchName: displayName.toLowerCase(),
      });

      setMessage("Profile updated successfully.");
      setPreview(photoURL);
      setFile(null);
    } catch (err) {
      console.error("Profile update failed", err);
      setError("Unable to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Queens Chat</span>
        <span className="title">Profile</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input type="email" value={currentUser?.email || ""} disabled />

          <input
            style={{ display: "none" }}
            type="file"
            id="profileFile"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) {
                setFile(selected);
                setPreview(URL.createObjectURL(selected));
              }
            }}
          />
          <label htmlFor="profileFile" className="fileLabel">
            <img src={preview || "/img/addAvatar.png"} alt="Avatar preview" />
            <span>{file ? file.name : "Update avatar"}</span>
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save profile"}
          </button>
          {message && <span className="success">{message}</span>}
          {error && <span className="error">{error}</span>}
        </form>
        <p>
          Back to <Link to="/">Chat</Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
