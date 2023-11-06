import {React, useState} from 'react'
import { colors } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CandidateSideBar from '../../Components/layouts/candidateNavigation'
import { useEffect } from 'react';

import axios from 'axios'


// export default function CanddiateDetails() {

//   const [values, setValues] = useState('1')

//   // const {personalInfo, educationalDetails , experienceDetails, socialLinks} = values

//   // const handleChange = (event, newValue) => {
//   //   setValues(newValue);
//   // };

//   const handleChange = (parameter) => (event) => {
//     setValues({ ...values, [parameter]: event.target.value })
//   }

//   const [user , setUser] = useState({})
//   const [token , setToken] = useState("")
//   const [Data , setData] = useState([])


//   const getData = async () => {
//     await axios ({
//       method: 'POST',
//       url: `http://localhost:8000/employee/idChecker/${user._id}`, 
//       headers :{
//         "Content-Type" : "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then((response) => {
//       if (response.status === 304) {
//         setData(response.data)
//         // console.log('Resource not modified');
//       } else {
//         console.log("Error response:", response.data);
//         // setData(response.data)
//         // console.log(response.data, "AA")
//       }
//     })
//     .catch(err => console.log(err, "Error"))
//   }

//   useEffect(() => {
//     const localStorageToken = localStorage.getItem('token')
//     const localStorageUser = localStorage.getItem('userId')

//     setUser(JSON.parse(localStorageUser))
//     console.log(localStorageUser, "AD")
//     setToken(localStorageToken)

//     getData(localStorageUser)
//   }, [])

//   console.log(getData , "getData")

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));




//   return (
//     <div>
//       <Grid container spacing={2}>
//         <Grid  xs={12} style={{marginBottom : "80px"}}>
//           <CandidateSideBar />
//         </Grid>
//         <Grid item xs={4} >
//         <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={values}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//             <Tab label="Item One" value="1" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" />
//           </TabList>
         
//         </Box>
//         <TabPanel value="1">Item One</TabPanel>
//         <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//       </TabContext>
     
//        </Box>
//         </Grid>
//       </Grid>
    


//     </div>
//   )
// }

export default function CanddiateDetails() {


  const [values, setvalues] = useState('1')
    // error: "false",
    // success: "false",
    // message: "",
  

  // const {  error,  success, message } = values

  const handleChange = (parameter) => (event) => {
    setvalues({ ...values, [parameter]: event.target.value })
  }

  const [token, setToken] = useState("")
   const [user, setUser] = useState({})
     const [ userInfo , setuserInfo] =useState([])
 
    //  console.log(userInfo, "BB")
  
    // const userId = user._id
    // console.log(userId, "WW")

  // Defaukt Syntax 
  const Data =  async() => {
   
    const localStorageToken = localStorage.getItem('token')
    console.log(localStorageToken, "CC")
    const localStorageUser = JSON.parse(localStorage.getItem('user'))
    console.log(localStorageUser, "FF")

      await axios({
         method: 'POST',
         url: `http://localhost:8000/employee/idChecker/${localStorageUser._id}`,
         headers: {
           'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorageToken}`,
         },
       })
       .then((res) => {
        if (res.data.message === 'Something went wrong') {
          console.log('Error: Something went wrong');
        } else {
          setuserInfo(res.data)

          console.log(res.data, "AA")
        }
       })
     
 
   }

  useEffect(  () => {
    const localStorageToken = localStorage.getItem('token')
    console.log(localStorageToken, "CC")
    const localStorageUser = JSON.parse(localStorage.getItem('user'))
    console.log(localStorageUser, "FF")
   
  
    setToken(localStorageToken)
    setUser(localStorageUser)
    
    Data()
   

  }, [])


  // console.log(category , "ALlCategory")



  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //         axios({
  //           method: 'POST',
  //           url: `http://localhost:7000/api/course/create/${user._id}`,
  //           data: {
  //             title,
  //             subtitle,
  //             language,
  //             tags,
  //           },
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => {

  //         })
    
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  return (
        <div>
          <Grid container spacing={2}>
            <Grid  xs={12} style={{marginBottom : "80px"}}>
              <CandidateSideBar />
            </Grid>
            <Grid item xs={4} >
            <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={values}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
             
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
         
           </Box>
            </Grid>
          </Grid>
        
    
    
        </div>
      )
    }
