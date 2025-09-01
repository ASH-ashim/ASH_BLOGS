import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", input); 

    try {
      dispatch(setLoading(true));
      const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      
      console.log("API Response:", res.data); 
      
      if(res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Login successful!");
        navigate('/', { replace: true }); 
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    
    } catch (error) {
      console.log("Error during login:", error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen md:pt-14 bg-gray-300 dark:bg-gray-900">
      <div className="hidden md:block w-1/2">
        <img
          src="login.png"
          className="h-screen object-cover w-[50%] fixed"
          alt="login"
        />
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl font-extrabold">
                Welcome Again!{" "}
                <span className="text-amber-950">Login Here</span>
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-semibold text-center dark:text-gray-300">
              Enter the details above to login
            </p>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className="dark:border-gray-600 mt-3 dark:bg-gray-900"
                  value={input.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-3">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    name="password"
                    className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                    value={input.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                    ) : (
                      <FaRegEye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                    )}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full px-4 py-3 mt-4">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-blue-800 dark:text-white mt-4 text-center">
              Don't have an account?
              <Link
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
