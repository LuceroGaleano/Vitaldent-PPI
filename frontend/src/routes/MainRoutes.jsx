import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import ReceptionistPortal from '../pages/Receptionist/ReceptionistPortal'
import OdontologistPortal from '../pages/Odontologist/OdontologistPortal'
import InventoryManagerPortal from '../pages/InventoryManager/InventoryManagerPortal'
import CitasDisponibles from '../pages/Patient/AppointmentAviable'
import HistorialClinico from '../pages/Patient/MedicalHistory'
import MisCitas from '../pages/Patient/MyAppointments'
import PatientPortal from '../pages/Patient/PatientPortal'
import DoctorAppointments from '../pages/Odontologist/DoctorAppointments'
import CreateMedicalHistory from '../pages/Odontologist/CreateMedicalHistory'
import SearchMedicalHistory from '../pages/Odontologist/SearchMedicalHistory'
import CreateTreatment from '../pages/Odontologist/CreateTreatment'
import ViewTreatments from '../pages/Odontologist/ViewTreatments'
import ViewItems from '../pages/InventoryManager/ViewItems'
import CreateItem from '../pages/InventoryManager/CreateItem'
import UpdateItem from '../pages/InventoryManager/UpdateItem'
import { ItemProvider } from '../context/ItemProvider'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<PatientPortal />}>
            <Route indext element = {<Navigate to = "citasDisponibles" replace/>}/>
            <Route path="citasDisponibles" element={<CitasDisponibles />} />
            <Route path="misCitas" element={<MisCitas />} />
            <Route path="historialMedico" element={<HistorialClinico />} />
        </Route>
        <Route path="/receptionist" element={<ReceptionistPortal />} />
        <Route path="/odontologist" element={<OdontologistPortal />}>
            <Route index element={<Navigate to="appointments" replace />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="createMedicalHistory" element={<CreateMedicalHistory />} />
            <Route path="searchMedicalHistory" element={<SearchMedicalHistory />} />
            <Route path="createTreatment" element={<CreateTreatment />} />
            <Route path="viewTreatments" element={<ViewTreatments />} />
        </Route>
        <Route path="/inventoryManager" element={
            <ItemProvider>
                <InventoryManagerPortal />
            </ItemProvider>}>
            <Route index element={<Navigate to="viewItems" replace />} />
            <Route path="viewItems" element={<ViewItems />} />
            <Route path="createItem" element={<CreateItem />} />
            <Route path="updateItem" element={<UpdateItem />} />
        </Route>

        <Route path="/citasDisponibles" element={<CitasDisponibles />} />
        <Route path="/historialMedico" element={<HistorialClinico />} />
        <Route path="/misCitas" element={<MisCitas />} />

        <Route path="/*" element={<Navigate to = '/'/>}/>
    </Routes>
  )
}
