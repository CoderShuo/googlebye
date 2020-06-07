import React, {Component} from 'react';
import '../../assets/css/style_MainPage.css'
import Pagesplit from './containers/Pagesplit';
import Moviedisplay from './containers/Moviedisplay';
import Footer from './Footer';
import Navigator from './Navigator'

const MainPage = ()=>{
  return (
    <>
    <Navigator/>
    <Moviedisplay/>
    <div className="bottompart" id="bottomcon">
      <Pagesplit/>
      <Footer/>
    </div>
    </>
  )
}
export default MainPage