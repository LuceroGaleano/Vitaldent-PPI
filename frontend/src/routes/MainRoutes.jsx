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
import CreateAppointment from '../pages/Receptionist/CreateAppointment'
import ViewAppointments from '../pages/Receptionist/ViewAppointments'
import CreatePatient from '../pages/Receptionist/CreatePatient'
import CreateUser from '../pages/Receptionist/CreateUser'
import DeleteUser from '../pages/Receptionist/DeleteUser'
import ViewMedicalHistory from '../pages/Receptionist/ViewMedicalHistory'
import CreatePayment from '../pages/Receptionist/CreatePayment'
import ViewPayments from '../pages/Receptionist/ViewPayments'
import ViewInvoices from '../pages/Receptionist/ViewInvoices'
import ManagePatientAppointments from '../pages/Receptionist/ManagePatientAppointments'
import { ItemProvider } from '../context/ItemProvider'
import { AppointmentProvider } from '../context/AppointmentProvider'
import { TreatmentProvider } from '../context/TreatmentProvider'
import { InvoiceProvider } from '../context/InvoiceProvider'

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
        <Route path="/receptionist" element={
        <InvoiceProvider>
            <ReceptionistPortal />
        </InvoiceProvider>}>
            <Route index element={<Navigate to="createAppointment" replace />} />
            <Route path="createAppointment" element={<CreateAppointment />} />
            <Route path="viewAppointments" element={<ViewAppointments />} />
            <Route path="createPatient" element={<CreatePatient />} />
            <Route path="createUser" element={<CreateUser />} />
            <Route path="deleteUser" element={<DeleteUser />} />
            <Route path="viewMedicalHistory" element={<ViewMedicalHistory />} />
            <Route path="createPayment" element={<CreatePayment />} />
            <Route path="viewPayments" element={<ViewPayments />} />
            <Route path="viewInvoices" element={<ViewInvoices />} />
            <Route path="managePatientAppointments" element={<ManagePatientAppointments />} />
        </Route>
        <Route path="/odontologist" element=
        {<AppointmentProvider>
            <TreatmentProvider>
                <OdontologistPortal />
            </TreatmentProvider>
        </AppointmentProvider>}>
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
