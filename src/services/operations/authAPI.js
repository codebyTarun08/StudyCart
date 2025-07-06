import { apiConnector } from "../apiConnector";
import {endpoints} from '../apis'
import {setToken,setLoading} from '../../slices/authSlice'
import {toast} from 'react-hot-toast'
import {setUser} from "../../slices/profileSlice"
import {resetCart} from "../../slices/cartSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
}=endpoints;

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response= await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true
            })
           // console.log("SENDOTP API RESPONSE---------->",response);
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error((response.data.message))
            }
            toast.success("OTP sent successfully");
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR-------->",error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            //console.log("SIGNUP API RESPONSE---------->",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successfully")
            navigate("/login");
        } catch (error) {
            console.log("SINUP API ERROR------->",error);
            toast.error("SignUp Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email
                ,password
            })

            console.log("LOGIN API RESPONSE-------------->",response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image?response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`

            dispatch(setUser({
                ...response.data.user,
                userImage
            }))

            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR--------->",error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/")
    }
}

export function getPasswordResetToken(email ,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{
                email
            });

            console.log("RESPONSE-------------->",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent Successffully.")
            setEmailSent(true);
            
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR: ",error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",RESETPASSWORD_API,{
                password,confirmPassword,token
            })
            
            console.log("RESPONSE-------------->",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password reset Successfully.")

        } catch (error) {
            console.log("RESET PASSWORD ERROR: ",error);
            toast.error("Failed to reset password.")
        }
        dispatch(setLoading(false))
    }
}