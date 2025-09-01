import { Avatar, AvatarImage } from '../components/ui/avatar'
import { Card } from '../components/ui/card'
import React, { useState } from 'react'
import userLogo from '../../public/logo.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog"
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader, User2Icon } from 'lucide-react'

const Profile = () => {
    const {user, loading} = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        occupation: user?.occupation,
        bio: user?.bio,
        facebook: user?.facebook,
        instagram: user?.instagram,
        linkedin: user?.linkedin,
        github: user?.github,
        file: user?.photoUrl
    })
    
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const changeFileHandler = (e) => {
        setInput({...input, file: e.target.files?.[0]})
    }

    const submitHander = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", input.firstName);
        formData.append("lastName", input.lastName);
        formData.append("bio", input.bio);
        formData.append("occupation", input.occupation);
        formData.append("facebook", input.facebook);
        formData.append("instagram", input.instagram);
        formData.append("linkedin", input.linkedin);
        formData.append("github", input.github);
        
        if(input?.file) {
            formData.append("file", input?.file)
        }
        
        try {
            dispatch(setLoading(true))
            const res = await axios.put(`https://ash-blogs.onrender.com/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if(res.data.success) {
                setOpen(false);
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            toast.error("Failed to update your profile");
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
    <div className='pt-20 md:ml-[320px] md:h-screen '>
        <div className='max-w-6xl mx-auto my-auto mt-8 sm:mr-10 mr-auto'>
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
            {/* Image Section */}
            <div className='flex flex-col items-center justify-center md:w-[400px]'>
    <Avatar className="w-40 h-40 border-2">
    {user.photoUrl ? (
        <AvatarImage src={user.photoUrl} />
    ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <User2Icon className="w-20 h-20 text-gray-500" />
        </div>
    )}
</Avatar>
        <h1 className='text-center font-extrabold text-xl text-gray-700 dark:text-gray-300 mt-3'>{user.occupation || "User"}</h1>
        <div className='flex gap-4 items-center mt-2'>
        <Link><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300'/></Link>
        <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300'/></Link>
        <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300'/></Link>
        <Link to={input.github}><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300'/></Link>
        </div>
            </div>
            {/* Info Section */}
            <div>
                <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome {user.firstName || "User"} !</h1>
                <p><span className='font-semibold'>Email: </span>{user.email}</p>
                <div className='flex flex-col gap-2 items-start justify-start my-5'>
                    <Label>About Me</Label>
                    <p className='border dark:border-gray-600 p-6 rounded-lg'>{user.bio || "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                </div>
                
                <Dialog open={open} onOpenChange={setOpen}>
        <form encType="multipart/form-data"
        onSubmit={submitHander}>
            <Button type="button" onClick={() => setOpen(true)}>
    Edit Profile
</Button>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle className='text-center'>Edit profile</DialogTitle>
            <DialogDescription className='text-center'>
                Make changes to your profile here.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className='flex gap-4 '>
                <div className="grid gap-3">
                <Label htmlFor="firstName">First Name: </Label>
                <Input 
                type="text" 
                className="text-gray-950" 
                id="firstName" 
                placeholder="first name" 
                value={input.firstName} 
                onChange={changeEventHandler}
                name="firstName" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="lastName">Last Name: </Label>
                <Input 
                id="lastName" 
                placeholder="last name" 
                name="lastName" 
                value={input.lastName} 
                onChange={changeEventHandler}
                />
            </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="occupation">Occupation: </Label>
                    <Input 
                    id="occupation" 
                    placeholder="Your occupation" 
                    name="occupation" 
                    value={input.occupation} 
                    onChange={changeEventHandler}
                    />
                </div>
                
                {/* Facebook and Instagram side by side */}
                <div className='flex gap-4'>
                    <div className="grid gap-3">
                        <Label htmlFor="facebook">Facebook: </Label>
                        <Input 
                        id="facebook" 
                        placeholder="facebook url" 
                        value={input.facebook} 
                        onChange={changeEventHandler}
                        name="facebook" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="instagram">Instagram: </Label>
                        <Input 
                        id="instagram" 
                        placeholder="instagram url" 
                        value={input.instagram} 
                        onChange={changeEventHandler}
                        name="instagram" />
                    </div>
                </div>

                {/* LinkedIn and GitHub side by side */}
                <div className='flex gap-4'>
                    <div className="grid gap-3">
                        <Label htmlFor="linkedin">LinkedIn: </Label>
                        <Input 
                        id="linkedin" 
                        placeholder="linkedin url" 
                        value={input.linkedin} 
                        onChange={changeEventHandler}
                        name="linkedin" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="github">GitHub: </Label>
                        <Input 
                        id="github" 
                        placeholder="github url" 
                        value={input.github} 
                        onChange={changeEventHandler}
                        name="github" />
                    </div>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="bio">Description: </Label>
                    <Textarea 
                    id="bio"
                    name="bio"
                    placeholder='Enter the description'
                    className='col-span-3 text-gray-700'
                    value={input.bio} 
                    onChange={changeEventHandler}
                    />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="image">Picture: </Label>
                    <Input 
                    type="file" 
                    accept="file" 
                    id="file" 
                    onChange={changeFileHandler}
                    name="file" />
                </div>
            </div>
            <DialogFooter>
            <Button onClick={submitHander} type="submit">
                {
                loading ? (
                    <>
                    <Loader className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                    </>
                ) : ("Save Changes")
                }
            </Button>
            </DialogFooter>
        </DialogContent>
        </form>
    </Dialog>
            </div>
        </Card>
        </div>
    </div>
    )
}

export default Profile