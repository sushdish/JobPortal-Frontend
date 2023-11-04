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

export default function SignUp() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
    error: false,
    message: '',
  })

  const { name, email, password, error, message, success } = values

  const handleChange = (parameter) => (event) => {
    setValues({ ...values, [parameter]: event.target.value })
    if(parameter == 'email') {
      emailChecker(event.target.value)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios({
      method: 'post',
      url: 'http://localhost:8000/employee/Create',
      data: {
        name: name,
        email: email,
        password: password
      }
    })
      .then((response) => {
        setValues({ ...values, name : '', email : '', password : '',  message: response.data.message, success : true   })

      })
      .catch(err => console.log(err))
  };

  const emailChecker = async (updatedEmail) => {
    // console.log(email, "Email")
    await axios({
      method: 'post',
      url: `http://localhost:8000/employee/emmailChecker/${updatedEmail}`,
    })
      .then((response) => {
        if (response.data.length >0) {
          setValues({message: "Email Exist", success : true   })

        }
        else {
          setValues({ message: "", success : false   })
        }
      })
      .catch(err => console.log(err))
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {success === true ? (<Stack sx={{ width: '100%' }} spacing={2}>

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name} 
                  onChange={handleChange("name")}
                  label="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email} 
                  onChange={handleChange("email")}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChange("password")}
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}