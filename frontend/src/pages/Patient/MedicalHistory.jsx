import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';


const initialState = {
  loading: false,
  error: null
};

export function PatientClinicalHistory() {
  const [clinicalHistory, setClinicalHistory] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const loadClinicalHistory = async () =>{
    dispatch({type: 'LOADING', payload: true});

    try{
      const data = await getFetch(
        'http://localhost:8080/patient/clinical_record',
        auth.user
      );

      dispatch({type: 'LOADING', payload: false});
      const mappedHistory = data.map((item) => ({
        id: item.clinicalRecordId,
        date: item.date,
        description: item.diagnostic
      }));
      setClinicalHistory(mappedHistory);
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  }
  useEffect(() => {
    loadClinicalHistory();
  }, [clinicalHistory]);

  return (
    <div>
      <h2 className="text-success mb-4">Historial Clínico</h2>
      {state.error && (
        <div className="alert alert-danger py-2 small text-center" role="alert">
           {state.error}
        </div>
      )}
      {clinicalHistory.map(item => (
        <div className="card border-success mb-3 shadow-sm" key={item.id}>
          <div className="card-header bg-success text-white">Fecha: {item.date}</div>
          <div className="card-body">
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientClinicalHistory;