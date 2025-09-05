import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from 'sonner';
import axios from 'axios';
import { setLoading } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react'; // Added missing import

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {loading} = useSelector((state)=>state.auth); // Changed 'store' to 'state'
  const dispatch = useDispatch();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true)); // Fixed typo: 'diapatch' to 'dispatch'
      const res = await axios.post('http://localhost:3000/api/v1/user/register', user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if(res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message); // Fixed typo: 'respnse' to 'response'
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen md:pt-14 bg-gray-300 dark:bg-gray-900">
      <div className="hidden md:block w-1/2">
        <img
          src="signupbackground.jpg"
          className="h-screen object-cover w-[50%] fixed"
          alt="Signup background"
        />
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl font-extrabold">Create an account</h1>
            </CardTitle>
            <p className="mt-2 text-sm font-stretch-normal text-center dark:text-gray-300">
              Enter the details above to create an account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex-1"> 
                  <Label htmlFor="firstName">First Name: </Label>
                  <Input
                    id="firstName" 
                    type="text"
                    placeholder="John" 
                    name="firstName" 
                    className="dark:border-gray-600 mt-3 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex-1"> 
                  <Label htmlFor="lastName">Last Name: </Label>
                  <Input
                    id="lastName" 
                    type="text"
                    placeholder="Doe"
                    name="lastName" 
                    className="dark:border-gray-600 mt-3 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email </Label> 
                <Input
                  id="email" 
                  type="email"
                  placeholder="hello@example.com"
                  name="email"
                  className='dark:border-gray-600 mt-3 dark:bg-gray-900'
                  value={user.email}
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
                    placeholder="Create a password"
                    name="password"
                    className='dark:border-gray-600 dark:bg-gray-900 pr-10' 
                    value={user.password}
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
              <Button type="submit" className='w-full px-4 py-3 mt-4' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </>
                ) : ("Sign Up")}
              </Button> 
            </form>

            <p className='text-blue-800 dark:text-white mt-4 text-center'> 
              Already have an account?
              <Link className='ml-2 text-blue-600 dark:text-blue-400 hover:underline' to='/login'>
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;