import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import ReceptionistPortal from '../pages/Receptionist/ReceptionistPortal'
import OdontologistPortal from '../pages/Odontologist/OdontologistPortal'
import InventoryManagerPortal from '../pages/InventoryManager/InventoryManagerPortal'
import AvailableAppointments from '../pages/Patient/AvailableAppointments'
import PatientClinicalHistory from '../pages/Patient/MedicalHistory'
import MyAppointments from '../pages/Patient/MyAppointments'
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
import UpdateUser from '../pages/UpdateUser'
import useAuth from '../hooks/useAuth'

export const MainRoutes = () => {
    const { auth } = useAuth();
  return (
    <Routes>
        {!auth.token ? (
            <>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Navigate to = '/'/>}/>
            </>
        ) : (
            <>  
                <Route
                    path="/"
                    element={
                        auth.role === 'PATIENT' ? <Navigate to="/patient" replace />
                            : auth.role === 'RECEPTIONIST' ? <Navigate to="/receptionist" replace />
                                : auth.role === 'DOCTOR' ? <Navigate to="/odontologist" replace />
                                    : auth.role === 'INVENTORY_MANAGER' ? <Navigate to="/inventoryManager" replace />
                                        : <Login />
                    }
                />
                {/* Ruta actualizar usuario */}
                <Route path="/actualizarUsuario" element={<Navigate to="/patient/actualizarUsuario" replace />} />
                {/* Rutas exclusivas para pacientes */}
                <Route path="/patient" element={auth.role === 'PATIENT' ? <PatientPortal /> : <Navigate to="/" replace/>}>
                    <Route index element = {<Navigate to = "citasDisponibles" replace/>}/>
                    <Route path="citasDisponibles" element={<AvailableAppointments />} />
                    <Route path="misCitas" element={<MyAppointments />} />
                    <Route path="historialMedico" element={<PatientClinicalHistory />} />
                    <Route path="actualizarUsuario" element={<UpdateUser />} />
                </Route>

                {/* Rutas exclusivas para gestor de recepcionista*/}
                <Route path="/receptionist" element={
                    auth.role === 'RECEPTIONIST' 
                    ?
                    <ReceptionistPortal />
                    : <Navigate to="/" replace/>
                }>
                    <Route index element={<Navigate to="createAppointment" replace />} />
                    <Route path="createAppointment" element={<CreateAppointment />} />
                    <Route path="viewAppointments" element={<ViewAppointments />} />
                    <Route path="createPatient" element={<CreatePatient />} />
                    <Route path="createUser" element={<CreateUser />} />
                    <Route path="deleteUser" element={<DeleteUser />} />
                    <Route path="viewMedicalHistory" element={<ViewMedicalHistory />} />
                    <Route path="createPayment" element={<CreatePayment />} />
                    <Route path="viewPayments" element={<ViewPayments />} />
                    <Route path="invoices/:invoiceId/pay" element={<CreatePayment />} />
                    <Route path="invoices/:invoiceId/payments" element={<ViewPayments />} />
                    <Route path="viewInvoices" element={<ViewInvoices />} />
                    <Route path="managePatientAppointments" element={<ManagePatientAppointments />} />
                    <Route path="actualizarUsuario" element={<UpdateUser />} />
                </Route>

                {/* Rutas exclusivas para odontologo */}
                <Route path="/odontologist" element= 
                {   auth.role === 'DOCTOR' 
                    ?
                    <OdontologistPortal />
                    : <Navigate to="/" replace/>
                }>
                    <Route index element={<Navigate to="appointments" replace />} />
                    <Route path="appointments" element={<DoctorAppointments />} />
                    <Route path="appointments/:appointmentId/treatments" element={<ViewTreatments />} />
                    <Route path="appointments/:appointmentId/treatments/:treatmentId/clinical-record" element={<CreateMedicalHistory />} />
                    <Route path="createMedicalHistory" element={<CreateMedicalHistory />} />
                    <Route path="searchMedicalHistory" element={<SearchMedicalHistory />} />
                    <Route path="createTreatment" element={<CreateTreatment />} />
                    <Route path="viewTreatments" element={<ViewTreatments />} />
                    <Route path="actualizarUsuario" element={<UpdateUser />} />
                </Route>

                {/* Rutas exclusivas para gestor inventario */}
                <Route path="/inventoryManager" element={
                    auth.role === 'INVENTORY_MANAGER'
                    ?
                    <InventoryManagerPortal />
                    : <Navigate to="/" replace/>
                }>
                    <Route index element={<Navigate to="viewItems" replace />} />
                    <Route path="viewItems" element={<ViewItems />} />
                    <Route path="createItem" element={<CreateItem />} />
                    <Route path="items/:id/editar" element={<UpdateItem />} />
                    <Route path="actualizarUsuario" element={<UpdateUser />} />
                </Route>

                <Route path="/citasDisponibles" element={<AvailableAppointments />} />
                <Route path="/historialMedico" element={<PatientClinicalHistory />} />
                <Route path="/misCitas" element={<MyAppointments />} />
            </>
        )}

    </Routes>
  )
}
