import {toast} from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { studentEndpoints } from '../apis';
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from '../../slices/courseSlice';
import { resetCart } from "../../slices/cartSlice";

const {  
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{ resolve(true) };
        script.onerror = ()=>{resolve(false)};

        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("Loading...");
    try {
        //load the script
       
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return ;
        }
        console.log("1")
        //initiate the order
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {courses},
            {
                Authorization:`Bearer ${token}`
            }
        );
        console.log("2")
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log(orderResponse)
        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.order.currency,
            amount:orderResponse.data.order.amount,
            order_id:orderResponse.data.order.id,
            name:"StudyCart",
            description:"Thank you for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName+" "+userDetails.lastName}`,
                email:userDetails.email
            },
            handler: function(response){
                //send Successful email
                sendPaymentSuccessEmail(response,orderResponse.data.order.amount,token);
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
        }
        //opening window or modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("Payment Failed...");
            console.log(response.error);
        })
    } catch (error) {
        console.log("PAYMENT API ERROR--------->", error);

        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
       await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
        amount
       },{
        Authorization:`Bearer ${token}`
       }) 
    } catch (error) {
        console.log("Payment Success email error.....",error)
    }
}

//verify payment
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        console.log("HI")
        console.log(bodyData)
        const response = await apiConnector("POST",COURSE_VERIFY_API,
        bodyData,
        {
            Authorization : `Bearer ${token}`
        }
        );
        console.log("Hello")
        if(!response.data.message){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful,You are added to the course")
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error...",error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}