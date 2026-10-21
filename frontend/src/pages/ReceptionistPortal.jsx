import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ReceptionistPortal() {
  const {auth} = useContext(AuthContext);
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#128c5a' }}>Portal Recepcionista</h1>
      <p>Bienvenido al módulo de recepción.</p>

      <pre>
        {JSON.stringify(auth, null, 3)}
      </pre>
    </div>
  );
}

export default ReceptionistPortal;