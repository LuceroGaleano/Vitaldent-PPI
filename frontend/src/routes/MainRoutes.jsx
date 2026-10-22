import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import ReceptionistPortal from '../pages/ReceptionistPortal'
import OdontologistPortal from '../pages/OdontologistPortal'
import InventoryManagerPortal from '../pages/InventoryManagerPortal'
import CitasDisponibles from '../pages/Patient/AppointmentAviable'
import HistorialClinico from '../pages/Patient/MedicalHistory'
import MisCitas from '../pages/Patient/MyAppointments'
import PatientPortal from '../pages/Patient/PatientPortal'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<PatientPortal />}>
            <Route path="citasDisponibles" element={<CitasDisponibles />} />
            <Route path="misCitas" element={<MisCitas />} />
            <Route path="historialMedico" element={<HistorialClinico />} />
        </Route>
        <Route path="/receptionist" element={<ReceptionistPortal />} />
        <Route path="/odontologist" element={<OdontologistPortal />} />
        <Route path="/inventoryManager" element={<InventoryManagerPortal />} />

        <Route path="/citasDisponibles" element={<CitasDisponibles />} />
        <Route path="/historialMedico" element={<HistorialClinico />} />
        <Route path="/misCitas" element={<MisCitas />} />

        <Route path="/*" element={<Navigate to = '/'/>}/>
    </Routes>
  )
}
