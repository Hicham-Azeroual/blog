import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
   console.log(currentUser);
   
  console.log(currentUser);
  
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log("Sign out success");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 shadow-lg bg-white dark:bg-gray-900">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center whitespace-nowrap text-lg font-semibold dark:text-white hover:opacity-90 transition-opacity duration-150"
      >
        <img
          src="https://www.shutterstock.com/image-illustration/illustration-blog-chat-bubble-on-260nw-717654691.jpg"
          alt="Logo"
          className="w-14 h-14 mr-2 rounded-full object-cover shadow-sm"
        />
        <span className="ml-1 text-gray-800 dark:text-gray-300">Blog</span>
      </Link>

      {/* Search */}
      <TextInput
        type="text"
        placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline border border-gray-300 focus:border-indigo-500 transition-all duration-150 rounded-lg px-4 py-2"
      />
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-4 md:order-2">
        {/* Dark Mode Toggle */}
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon className="text-gray-500 dark:text-gray-200 hover:text-indigo-500 transition-colors duration-150" />
        </Button>

        {/* User Dropdown */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture || undefined}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        {/* Mobile Navbar Toggle */}
        <Navbar.Toggle />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse className="mt-4 lg:mt-0">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Projects", path: "/projects" },
        ].map((link) => (
          <Navbar.Link
            key={link.path}
            as="div"
            className={`px-4 py-2 rounded-md ${
              path === link.path
                ? "bg-indigo-100 dark:bg-gray-700 font-semibold"
                : "hover:bg-indigo-100 dark:hover:bg-gray-700"
            } transition-colors duration-150`}
          >
            <Link to={link.path}>{link.name}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
