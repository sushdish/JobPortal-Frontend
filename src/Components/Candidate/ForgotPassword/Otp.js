import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Otp({SendtoForgotPassword, CandidateEmail}) {
  const defaultTheme = createTheme();
  const [values, setValues] = useState({
    otp:  ''
    // success : false  , 
    // message : '', 
  })

  const [alert, setAlert] = useState({
    success: false,
    message: ''
})
  
const { success , message} = alert

  const {otp } = values

  const handlealertmessage = async (alertmessage) => {
    setAlert({...alert, message : alertmessage , success : true  })
}


  const handleChange = (event) => {
    setValues({ ...values, otp : event.target.value })
  }

  const handleResend = async (event) => {
    event.preventDefault()
    await axios({
      method: 'post',
      url: `http://localhost:8000/employee/resendotp`,
      data: {
           email : CandidateEmail, 
      } 
  })
  .then((response) => {
    handlealertmessage(response.data.message)
    setValues({ ...values,  message: response.data.Message, success : true   })
})
.catch(err => console.log(err, "Error"))
}   
  

  const handleSubmit = (event) => {
    event.preventDefault()

    SendtoForgotPassword(otp)
    console.log(SendtoForgotPassword, "AD")
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success == true ? (<Stack sx={{ width: '100%' }} spacing={2}>

          <Alert severity="success">{message} </Alert>
        </Stack>
        ) : ("")}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Enter Otp
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              onChange={handleChange}
              value={otp}
              label="otp"
              name="otp"
              autoComplete="otp"
              autoFocus
            />
            <Button
              type="submit"
              onClick={handleResend}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Resend
            </Button>

            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            
            <Grid container>
      
              <Grid item >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
        }


// export function ResendOtp({SendtoForgotPassword}) {

//   const defaultTheme = createTheme();
//   const [values, setvalues] = useState({
//     resendotp:  '',
//     success : false  , 
//     message : '', 
//   })

//   const {resendotp , success, message} = values

//   const handleChange = (event) => {
//     setvalues({ ...values, resendotp : event.target.value })
//   }

//   const handleResend = async (event) => {
//     event.preventDefault()
//     await axios({
//       method: 'post',
//       url: `http://localhost:8000/employee/resendotp`,
//       data: {
//           email : CandidateEmail, 
//       } 
//   })
//   .then((response) => {
//     handlealertmessage(response.data.message)
//     if (response.data && response.data.message =="OTP Veriied Successfully") {
//         // setResend(false)
//         // setnewPassword(true)
//     } else {
//       setResend({...resend, otpMessage : response.data.message , OTPSuccess : true})
//     }
// })
// .catch(err => console.log(err, "Error"))
// }   

//     SendtoForgotPassword(resendotp)
//     console.log(SendtoForgotPassword, "AD")
// }

//   return (
//     <ThemeProvider theme={defaultTheme}>
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       {success == true ? (<Stack sx={{ width: '100%' }} spacing={2}>

//         <Alert severity="success">{message} </Alert>
//       </Stack>
//       ) : ("")}
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//          Enter Otp
//         </Typography>
//         <Box component="form" noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="resendotp"
//             onChange={handleChange}
//             value={resendotp}
//             label="resendotp"
//             name="resendotp"
//             autoComplete="resendotp"
//             autoFocus
//           />
          

//           <Button
//             type="Resend"
//             onClick={handleResend}
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             ResendOtp
//           </Button>
//           <Grid container>
    
//             <Grid item >
//               <Link href="/signup" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
//     </Container>
//   </ThemeProvider>
//   )



