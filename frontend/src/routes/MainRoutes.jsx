import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import PatientPortal from '../pages/PatientPortal'
import ReceptionistPortal from '../pages/ReceptionistPortal'
import OdontologistPortal from '../pages/OdontologistPortal'
import InventoryManagerPortal from '../pages/InventoryManagerPortal'
import { AuthContext } from '../context/AuthContext'

export const MainRoutes = () => {
  const {auth} = useContext(AuthContext);

  return (
    <Routes>
      {!auth.logged ?(
        <>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Navigate to = '/'/>}/>
        </>
      ):(
        <>
          <Route path="/patient" element={<PatientPortal />} />
          <Route path="/receptionist" element={<ReceptionistPortal />} />
          <Route path="/odontologist" element={<OdontologistPortal />} />
          <Route path="/inventoryManager" element={<InventoryManagerPortal />} />

          <Route path="/*" element={<Navigate to = '/'/>}/>
        </>
      )}
    </Routes>
  )
}
