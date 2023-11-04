import React, { useState } from 'react'
import axios from 'axios'
import Email from '../../Components/Candidate/ForgotPassword/Email'
import Otp from '../../Components/Candidate/ForgotPassword/Otp'
import NewPassword from '../../Components/Candidate/ForgotPassword/NewPassword'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Resendotp from '../../Components/Candidate/ForgotPassword/Resendotp'
// import {ResendOtp} from '../../Components/Candidate/ForgotPassword/Otp'

function ForgotPassword() {
    const [email, setEmail] = useState(true)
    const [otp, setotp] = useState(false)
    // const [resendotp, setresendotp] = useState(false)
    const [newpassword, setnewPassword] = useState(false)

    const [values, setValues] = useState({
        CandidateEmail: '',
        CandidateOtp: '',
        CandidatePassword: '',
        CandidateresendOtp: ''
    })

    const [alert, setAlert] = useState({
        success: false,
        message: ''
    })


    const navigate = useNavigate();
    const { CandidateEmail ,  CandidateOtp , CandidatePassword, CandidateresendOtp } = values
    const { success , message} = alert

    const handlealertmessage = async (alertmessage) => {
        setAlert({...alert, message : alertmessage , success : true  })
    }

    const getDataChild = async (getEmailfromchild) => {

        setValues({ ...values, CandidateEmail: getEmailfromchild })
        await axios({
            method: 'post',
            url: `http://localhost:8000/employee/forgotpassword`,
            data: {
                email: getEmailfromchild,
            }
        })
            .then((response) => {
                handlealertmessage(response.data.message)
                if (response.data && response.data.message == 'OTP send') {
                    setEmail(false)
                    setotp(true)
                } else {
                    setValues({...values, emailMesage : response.data.message , Emailsuccess : true })
                }

            })
            .catch(err => console.log(err, "Error"))
    }

    const getOtpChild = async (getOtpfromChild) => {

        setValues({...values, CandidateOtp: getOtpfromChild })
        await axios({
            method: 'post',
            url: `http://localhost:8000/employee/otpVerfifyByEmail`,
            data: {
                email : CandidateEmail, 
                otpGenerator: getOtpfromChild,
            } 
        })
        .then((response) => {
            handlealertmessage(response.data.message)
            if (response.data && response.data.message =="OTP Veriied Successfully") {
                setotp(false)
                setnewPassword(true)
            } else {
                setValues({...values, otpMessage : response.data.message , OTPSuccess : true})
            }
        })
        .catch(err => console.log(err, "Error"))
    }

    const getNewPassChild = async (getNewPassfromChild) => {
        
        setValues({...values, CandidatePassword: getNewPassfromChild })
        await axios({
            method: 'post',
            url: `http://localhost:8000/employee/newPass`,
            data: {
                email : CandidateEmail, 
                password: getNewPassfromChild,
            } 
        })
        .then((response) => {
            handlealertmessage(response.data.message)
            if (response.data && response.data.message =="Password Updated") {
               setnewPassword(true)
               navigate("/signin");

            } else {
                setValues({...values, otpMessage : response.data.message , OTPSuccess : true})
            }
        })
        .catch(err => console.log(err, "Error"))
    }

    

    

    return (
        <div>
            {success ? (
                 <Stack sx={{ width: '100%' }} spacing={2}>
                 <Alert severity="success">{message}</Alert>
                 </Stack>
            )  : ""}
            {email ? <Email SendtoForgotPassword={getDataChild}  /> : ""}
            {otp ? <Otp  SendtoForgotPassword={getOtpChild} CandidateEmail={CandidateEmail} /> : ""}
            {/* {resendotp ? <ResendOtp SendtoForgotPassword={getresendOtpChild}/>  : ""} */}
            {newpassword ? <NewPassword SendtoForgotPassword={getNewPassChild}/> : ""}
        </div>
    )
}

export default ForgotPassword
