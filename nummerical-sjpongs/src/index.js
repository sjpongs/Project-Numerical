//แสดงผล App ที่เราออกแบบ
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Movie01 from './MovieA';
/*หน้าโจทย์*/
import RoeGraphics from './RoeGraphics';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';


//การสร้าง Component
/*function Ultraman(){
  return <h2 align = 'center'>Santa Cluse is coming to town</h2>
}*/


ReactDOM.render( 
  <App />, document.getElementById('root'));
RoeGraphics();
reportWebVitals();


/*
NODE
- สร้าง Component
- สร้างตาม figma
- ใส่สีและตกแต่ง
- ลองเอา CalCulate เข้าไปเเล้วลองใช้งานดู สัก 1 เรื่อง
*/
 