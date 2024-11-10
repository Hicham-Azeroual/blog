import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:flex-row flex-col gap-8 flex">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <Link
            to="/"
            className="flex items-center whitespace-nowrap text-lg font-semibold text-gray-800 dark:text-gray-200 transition-opacity duration-150 hover:opacity-90"
          >
            <img
              src="https://files.oaiusercontent.com/file-kESpRwyr4ScEbgOlePGO01dz?se=2024-11-08T08%3A07%3A41Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De1e76f65-59ef-4a4c-a250-443c51ff4950.webp&sig=Jp3LclKgtHfjGbKxgzLTy/Etf/KcWYJ7rocyX7uy4Hc%3D"
              alt="Logo"
              className="w-20 h-20 mr-2 rounded-full object-cover shadow-md"
            />
            <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-gray-300">Blog</span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left max-w-xs">
            Join HiBlog today to stay updated with the latest articles, personalized content recommendations, and exclusive insights. Be part of our inspiring community!
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-6">
            <div>
              <Label htmlFor="username" value="Your username" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="email" value="Your email" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                className="mt-1 w-full"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" className="w-full mt-4 py-3 text-lg font-semibold">
              Sign In
            </Button>
          </form>
          <div className="flex justify-center gap-2 text-sm mt-5 text-gray-700 dark:text-gray-300">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 transition duration-150">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
