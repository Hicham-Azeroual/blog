import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { TextInput, Button, Modal, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const storage = getStorage(app);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      if (file.size > maxFileSize) {
        setImageFileUploadError("The selected image must be less than 2MB.");
        setImageFile(null);
        setImageFileUrl(null); // Clear preview
      } else {
        setImageFileUploadError(null); // Clear previous errors
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file)); // Preview locally
      }
    }
  };

  // Upload image to Firebase
  const uploadImage = async () => {
    if (!imageFile) return;

    const fileName = `${new Date().getTime()}-${imageFile.name}`;
    const storageRef = ref(storage, `profilePictures/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(Math.floor(progress)); // Update progress
      },
      (error) => {
        console.error("Upload error:", error);
        setImageFileUploadError(error.message);
        setImageFileUploadProgress(null)
        setImageFile(null);
        setImageFileUrl(null);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL); // Set uploaded image URL
        } catch (err) {
          console.error("Error fetching download URL:", err);
          setImageFileUploadError(err.message);
        }
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={filePickerRef}
        />

        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
                text: { fontSize: "1rem", fill: "#000" },
              }}
            />
          )}
          <img
            src={
              imageFileUrl ||
              currentUser?.profilePicture ||
              "/default-avatar.png"
            }
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[#8caac6a7] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.username || ""}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.email || ""}
        />
        <TextInput type="password" id="password" placeholder="Password" />

        {imageFile && (
          <div className="text-sm text-gray-500 mt-2">
            Upload Progress: {imageFileUploadProgress}%
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </Button>

        {currentUser?.isAdmin && (
          <Link to={"/create-post"}>
            <Button className="w-full">Create a post</Button>
          </Link>
        )}
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={handleDeleteAccount}>
          Delete Account
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>

      {error && <Alert color="failure" className="mt-5">{error}</Alert>}

      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">Yes, I'm sure</Button>
              <Button color="gray" onClick={handleModalClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
