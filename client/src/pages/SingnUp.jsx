import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import QAuth from "../components/QAuth";

export default function SignUP() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Successful message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }
  
      const data = await response.json();
      setSuccess('Sign-up successful! Redirecting to sign-up page...');
      console.log('Sign-up successful:', data);
  
      // Redirect to the sign-up page after success
      setTimeout(() => navigate('/sign-in'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-center py-12 px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 bg-opacity-90 shadow-lg rounded-lg p-8 md:flex-row flex-col gap-8 flex">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center whitespace-nowrap text-lg font-semibold text-gray-800 dark:text-gray-200 transition-opacity duration-150 hover:opacity-90">
            <img src="https://www.shutterstock.com/image-illustration/illustration-blog-chat-bubble-on-260nw-717654691.jpg" alt="Logo" className="w-20 h-20 mr-2 rounded-full object-cover shadow-md" />
            <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-gray-300">
              Blog
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left max-w-xs">
            Join HiBlog today to stay updated with the latest articles, personalized content recommendations, and exclusive insights. Be part of our inspiring community!
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && <Alert color="failure" className="mb-4">{error}</Alert>}
            {success && <Alert color="success" className="mb-4">{success}</Alert>}

            <div>
              <Label htmlFor="username" value="Your username" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="email" value="Your email" className="text-gray-700 dark:text-gray-300" />
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
              <Label htmlFor="password" value="Your password" className="text-gray-700 dark:text-gray-300" />
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

            <Button gradientDuoTone="purpleToPink" type="submit" className="w-full mt-4 py-3 text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 bg-cover">
              {isLoading ? <Spinner size="sm" light={true} /> : 'Sign Up'}
            </Button>
            <QAuth></QAuth>
          </form>
          <div className="flex justify-center gap-2 text-sm mt-5 text-gray-700 dark:text-gray-300">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 transition duration-150">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
