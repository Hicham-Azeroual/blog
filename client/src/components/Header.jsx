import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link ,useLocation} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon} from "react-icons/fa";

export default function Header() {
  const path=useLocation().pathname;
  return (
    <Navbar className="border-b-2 shadow-lg bg-white dark:bg-gray-900">
      <Link
        to="/"
        className="flex items-center whitespace-nowrap text-lg font-semibold dark:text-white hover:opacity-90 transition-opacity duration-150"
      >
        <img
          src="https://www.shutterstock.com/image-illustration/illustration-blog-chat-bubble-on-260nw-717654691.jpg"
          
          alt="Logo"
          className="w-14 h-14 mr-2 rounded-full object-cover shadow-sm" // Image styling
        />

        <span className="ml-1 text-gray-800 dark:text-gray-300">Blog</span>
      </Link>

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
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon className="text-gray-500 dark:text-gray-200 hover:text-indigo-500 transition-colors duration-150" />
        </Button>

        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="user" rounded />}
          className="shadow-md"
        >
          <Dropdown.Header>
            <span className="block text-sm font-semibold">@username</span>
            <span className="block text-sm font-medium truncate">
              user@example.com
            </span>
          </Dropdown.Header>
          <Link to="/dashboard?tab=profile">
            <Dropdown.Item className="hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-colors duration-150">
              Profile
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item className="hover:bg-red-100 dark:hover:bg-red-600 transition-colors duration-150">
            Sign out
          </Dropdown.Item>
        </Dropdown>

        <Link to="/sign-in">
          <Button
            gradientDuoTone="purpleToBlue"
            outline
            className="font-medium rounded-lg"
          >
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="mt-4 lg:mt-0">
        <Navbar.Link
          as="div"
          className="px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors duration-150"
         active={path==="/"}
        >
          <Link to="/" >Home</Link>
        </Navbar.Link>
        <Navbar.Link
          as="div"
          className="px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors duration-150"
          active={path==="/about"}
        >
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          as="div"
          className="px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors duration-150"
          active={path==="/projects"}
        >
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
