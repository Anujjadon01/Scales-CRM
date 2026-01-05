// import { Route, Router } from "react-router-dom";


import { Route, Routes } from "react-router-dom"
import Login from "../Components/Login"
import Register from "../Components/Register"

import Contact from "../Components/Contact"
import Deshboard from "../Components/Deshboard"
import Pipeline from "../Components/Pipeline"
import Revenue from "../Components/Revenue"
import { Settings } from "lucide-react"
import Navbar from "../Components/Navbar"
import Card from "../Components/Card"

import Column from "../Components/Column "
import Tasks from "../Components/Tasks"



function App() {
  return (
    <>
     <Navbar/>
      <Routes>
     
        <Route path="/Register" element={<Register />}></Route>

        <Route path="/Login" element={<Login />}></Route>
        <Route path="/" element={<Deshboard />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Pipeline" element={<Pipeline/>} />
        <Route path="/Revenue" element={<Revenue/>} />
        <Route path="/Tasks" element={<Tasks/>} />
        <Route path="/Settings" element={<Settings/>} />
        <Route path="/card" element={<Card/>} />
        <Route path="/colmn" element={<Column/>} />

      </Routes>
    </>
  )
}
export default App