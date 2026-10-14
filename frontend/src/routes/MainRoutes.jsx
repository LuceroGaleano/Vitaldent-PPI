import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import PatientPortal from '../pages/PatientPortal'
import ReceptionistPortal from '../pages/ReceptionistPortal'
import OdontologistPortal from '../pages/OdontologistPortal'

export default function MainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="/receptionist" element={<ReceptionistPortal />} />
        <Route path="/odontologist" element={<OdontologistPortal />} />

        {/*PAGINA PREDETERMINADO */}
        <Route path="/*" element={<Navigate to = '/'/>}/>
    </Routes>
  )
}
