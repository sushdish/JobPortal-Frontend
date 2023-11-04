import React from 'react'
import  MyTab  from '../Components/mainpage/MyTab';
import '../index.css'

const Home = () => {
  return (
    // <div className="bg-dark text-center">
    //    <h1 className="text-light">Welcome to Job Portal </h1>

    //   <MyTab/>
    // </div>

    <div className="container">
      <div className="row">
        <div className="col-9">
          <h1>Welcome to Job Portal</h1>
        </div>
        <div className="col-3 tabs-container">
          <MyTab />
        </div>
      </div>
    </div>
  )
}

export default Home