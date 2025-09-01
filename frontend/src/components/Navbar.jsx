import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { FaSearch, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { CgProfile } from "react-icons/cg";
import { FaDoorOpen } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { Button } from "../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const { theme } = useSelector((store) => store.theme);
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(search)}`);
            setSearch("");
            setIsMenuOpen(false);
        }
    };

    const logoutHandle = async (e) => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                navigate("/");
                dispatch(setUser(null));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout.");
        }
    };

    return (
        <div className="py-2 fixed w-full bg-white z-50 dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-b-2">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                {/* Logo and Desktop Search */}
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                    <Link to={"/"} className="flex items-center">
                        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">ASH</h1>
                    </Link>
                    <form onSubmit={handleSearch} className="relative hidden sm:block">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-40 sm:w-64 lg:w-80 text-sm sm:text-base"
                        />
                        <Button type="submit" className="absolute right-0 top-0 h-full px-3">
                            <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                    </form>
                </div>

                {/* Desktop Nav and User Actions */}
                <nav className="hidden lg:flex items-center gap-6">
                    <ul className="flex gap-6 text-base lg:text-lg font-semibold">
                        <Link to={"/"}><li className="hover:text-blue-500 transition-colors">Home</li></Link>
                        <Link to={"/blogs"}><li className="hover:text-blue-500 transition-colors">Blogs</li></Link>
                        <Link to={"/about"}><li className="hover:text-blue-500 transition-colors">About</li></Link>
                    </ul>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => dispatch(toggleTheme())} className="p-2">
                            {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                        </Button>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-full p-0 border-none">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={user.photoUrl} />
                                            <AvatarFallback><FaRegUserCircle className="w-8 h-8" /></AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                                            <CgProfile className="mr-2 h-4 w-4" />
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/dashboard/your-blog")}>
                                            <TbLogs className="mr-2 h-4 w-4" />
                                            Your Blogs
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/dashboard/write-blog")}>
                                            <FaPencilAlt className="mr-2 h-4 w-4" />
                                            Write Blog
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logoutHandle}>
                                        <FaDoorOpen className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex gap-2">
                                <Link to={"/login"}><Button className="text-sm lg:text-base">Login</Button></Link>
                                <Link to={"/signup"}><Button className="text-sm lg:text-base">Signup</Button></Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Hamburger and Theme Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <Button onClick={() => dispatch(toggleTheme())} className="p-2">
                        {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                    </Button>
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                        {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b dark:border-b-gray-600">
                            <h1 className="font-bold text-2xl sm:text-3xl">Menu</h1>
                            <Button onClick={() => setIsMenuOpen(false)} className="p-2">
                                <FaTimes className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="p-4 flex flex-col gap-6 items-center mt-4">
                            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full text-sm"
                                />
                                <Button type="submit" className="absolute right-0 top-0 h-full px-3">
                                    <FaSearch className="w-4 h-4" />
                                </Button>
                            </form>
                            <ul className="flex flex-col gap-4 text-xl font-semibold w-full items-center">
                                <Link to={"/"} onClick={() => setIsMenuOpen(false)}><li className="hover:text-blue-500 transition-colors">Home</li></Link>
                                <Link to={"/blogs"} onClick={() => setIsMenuOpen(false)}><li className="hover:text-blue-500 transition-colors">Blogs</li></Link>
                                <Link to={"/about"} onClick={() => setIsMenuOpen(false)}><li className="hover:text-blue-500 transition-colors">About</li></Link>
                            </ul>
                            {user ? (
                                <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                                    <p className="text-lg font-medium">Hello, {user.firstName}!</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="rounded-full p-0 border-none">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={user.photoUrl} />
                                                    <AvatarFallback><FaRegUserCircle className="w-10 h-10" /></AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="center">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                                                    <CgProfile className="mr-2 h-4 w-4" />
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate("/dashboard/your-blog")}>
                                                    <TbLogs className="mr-2 h-4 w-4" />
                                                    Your Blogs
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate("/dashboard/write-blog")}>
                                                    <FaPencilAlt className="mr-2 h-4 w-4" />
                                                    Write Blog
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logoutHandle}>
                                                <FaDoorOpen className="mr-2 h-4 w-4" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 w-full max-w-sm">
                                    <Link to={"/login"} className="w-full">
                                        <Button className="w-full text-sm" onClick={() => setIsMenuOpen(false)}>Login</Button>
                                    </Link>
                                    <Link to={"/signup"} className="w-full">
                                        <Button className="w-full text-sm" onClick={() => setIsMenuOpen(false)}>Signup</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;