import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSclice.js";
import QAuth from "../components/QAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract the necessary state from Redux
  const { loading, error, currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Réinitialiser les erreurs lorsqu'un champ est modifié
    if (error) {
      dispatch(signInFailure(null));
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "All fields are required.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const validationError = validateForm();
    if (validationError) {
      dispatch(signInFailure(validationError));
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const data = await response.json();
      dispatch(signInSuccess(data)); // Store the user data in Redux state
      console.log("Sign-in successful:", data);

      // Redirect to the homepage or dashboard after success
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:flex-row flex-col gap-8 flex">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <Link
            to="/"
            className="flex items-center whitespace-nowrap text-lg font-semibold text-gray-800 dark:text-gray-200 transition-opacity duration-150 hover:opacity-90"
          >
            <img
              src="https://www.shutterstock.com/image-illustration/illustration-blog-chat-bubble-on-260nw-717654691.jpg"
              alt="Logo"
              className="w-20 h-20 mr-2 rounded-full object-cover shadow-md"
            />
            <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-gray-300">
              Blog
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left max-w-xs">
            Welcome back! Please sign in to continue your journey with HiBlog.
            Stay updated with the latest articles and personalized content
            recommendations!
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <Alert color="failure" className="mb-4">
                {error}
              </Alert>
            )}
            {currentUser && (
              <Alert color="success" className="mb-4">
                Sign-in successful! Redirecting...
              </Alert>
            )}

            <div>
              <Label
                htmlFor="email"
                value="Your email"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                value="Your password"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="w-full mt-4 py-3 text-lg font-semibold"
            >
              {loading ? <Spinner size="sm" light={true} /> : "Sign In"}
            </Button>
            <QAuth></QAuth>
          </form>
          <div className="flex justify-center gap-2 text-sm mt-5 text-gray-700 dark:text-gray-300">
            <span>Don't have an account?</span>
            <Link
              to="/sign-up"
              className="text-blue-600 hover:text-blue-700 transition duration-150"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
