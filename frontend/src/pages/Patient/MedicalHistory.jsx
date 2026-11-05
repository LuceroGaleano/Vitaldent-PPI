import React, { useState, useEffect, useReducer, useContext } from 'react'
import { getFetch } from '../../fetchs/GetFetch';
import { AuthContext } from '../../context/AuthContext';
import { apiFetchReduce } from '../../reduces/ApiFetchReduce';

const initialState = { loading: true, error: null };

export function PatientClinicalHistory() {
  const [clinicalHistory, setClinicalHistory] = useState([]);
  const { auth } = useContext(AuthContext);
  const [state, dispatch] = useReducer(apiFetchReduce, initialState);

  const loadClinicalHistory = async () => {
    dispatch({type: 'LOADING', payload: true});
    try {
      const data = await getFetch('http://localhost:8080/patient/clinical_record', auth.user);
      dispatch({type: 'LOADING', payload: false});
      const mappedHistory = data.map((item) => ({
        id: item.clinicalRecordId,
        date: item.date,
        description: item.diagnostic
      }));
      setClinicalHistory(mappedHistory);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  }
  
  // ¡Corregido el bucle infinito dejando el arreglo de dependencias vacío!
  useEffect(() => {
    loadClinicalHistory();
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <h2 className="text-success fw-bold mb-4">Historial Clínico</h2>
      
      {state.error && (
        <div className="alert alert-danger py-2 px-3 small text-center rounded-3 border-0 bg-danger bg-opacity-10 text-danger fw-semibold" role="alert">
           {state.error}
        </div>
      )}

      {state.loading && clinicalHistory.length === 0 ? (
        <div className="text-center py-5">
          <span className="spinner-border text-success" role="status"></span>
        </div>
      ) : clinicalHistory.length > 0 ? (
        <div className="d-flex flex-column gap-4 mt-4">
          {clinicalHistory.map(item => (
            <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden" key={item.id}>
              <div className="card-header bg-success bg-opacity-10 border-0 py-3 px-4 d-flex align-items-center gap-2">
                <span className="fs-5">📋</span>
                <span className="text-success fw-bold">Atención del {item.date}</span>
              </div>
              <div className="card-body p-4">
                <p className="small text-uppercase fw-bold text-muted mb-2">Diagnóstico y Anotaciones</p>
                <p className="card-text text-dark bg-light p-3 rounded-3 mb-0">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <span className="fs-1 opacity-50 mb-3 d-block">📁</span>
          <h5 className="fw-bold text-dark">Historial vacío</h5>
          <p className="text-muted small">No tienes registros clínicos en el sistema por el momento.</p>
        </div>
      )}
    </div>
  );
}

export default PatientClinicalHistory;