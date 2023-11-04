import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import Tabs from '@material-ui/core/Tabs';
// import LinkTab from '../core/LinkTab';
import Tab from '@material-ui/core/Tab';
import { useNavigate } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignIn() {

  const [values, setValues] = useState({
    email: '',
    password: '',
    success: false,
    error: false,
    message: '',
  })
  const navigate = useNavigate();
  

  const { email, password, error, message, success } = values


  const handleChange = (parameter) => (event) => {
    setValues({ ...values, [parameter]: event.target.value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(email, "")
    await axios({
      method: 'post',
      url: `http://localhost:8000/employee/signinEmploye`,
      data: {
        email: email,
        password: password
      }
    })
      .then((response) => {

        setValues({ ...values, email: "", password: "", message: response.data.message , success: true })
        
        if (response && response.data && response.data.message == 'Succesfully signed in') {
          // setValues({ ...values, email: "", password: "", message: "sucessfully signin", success: true })
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.encryptedToken);
          
          navigate("/CandidateDashboard");

          // setValues({...values , email : "", password : "", message : response.data.Message , success : true})
        } else {
          setValues({ ...values, email: "", password: "", message: response.data.message , success: true })

        }
      })
      .catch(err => console.log(err, "Error"))
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange("email")}
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={handleChange("password")}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
} 