import { useContext, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppointmentContext } from '../../context/AppointmentContext';
import { TreatmentContext } from '../../context/TreatmentContext';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/LogoDoctor@4x-8.png';
import {
  FaCalendarAlt, FaNotesMedical, FaSearch, FaSyringe, FaListUl,
  FaUserEdit, FaSignOutAlt, FaChevronDown, FaChevronUp, FaClinicMedical
} from 'react-icons/fa';

const MENU_SECTIONS = [
  {
    key: 'agenda',
    label: 'Agenda',
    icon: FaCalendarAlt,
    items: [
      { to: '/odontologist/appointments', label: 'Mis Citas', icon: FaCalendarAlt },
    ],
  },
  {
    key: 'clinica',
    label: 'Clínica',
    icon: FaClinicMedical,
    items: [
      { to: '/odontologist/createMedicalHistory', label: 'Crear Historial', icon: FaNotesMedical },
      { to: '/odontologist/searchMedicalHistory', label: 'Buscar Historial', icon: FaSearch },
    ],
  },
  {
    key: 'tratamientos',
    label: 'Tratamientos',
    icon: FaSyringe,
    items: [
      { to: '/odontologist/createTreatment', label: 'Crear Tratamiento', icon: FaSyringe },
      { to: '/odontologist/viewTreatments', label: 'Ver Tratamientos', icon: FaListUl },
    ],
  },
];

const findSectionByPath = (pathname) =>
  MENU_SECTIONS.find((section) => section.items.some((item) => pathname.startsWith(item.to)))?.key ?? null;

function OdontologistPortal() {
  const { setAuth } = useAuth();
  const { setAppointment } = useContext(AppointmentContext);
  const { setTreatment } = useContext(TreatmentContext);
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = findSectionByPath(location.pathname);
  const [sectionPreference, setSectionPreference] = useState({
    pathname: location.pathname,
    openSection: activeSection,
  });
  const openSection = sectionPreference.pathname === location.pathname
    ? sectionPreference.openSection
    : activeSection;

  const goToAppointment = (appointment) => {
    setAppointment(appointment);
    navigate('/odontologist/createMedicalHistory');
  };

  const goToTreatment = (treatment) => {
    setTreatment(treatment);
    navigate('/odontologist/createMedicalHistory');
  };

  const handleLogout = () => {
    setAuth({ logged: false, token: null });
    navigate('/');
  };

  const handleSectionClick = (event, key) => {
    if (openSection === key) event.preventDefault();
    setSectionPreference({
      pathname: location.pathname,
      openSection: openSection === key ? null : key,
    });
  };

  const getSectionClass = (key) => {
    const isActive = activeSection === key;
    const isOpen = openSection === key;
    const state = isActive
      ? 'bg-white text-success fw-bold shadow-sm'
      : isOpen
        ? 'bg-white bg-opacity-25 text-white fw-bold'
        : 'bg-transparent text-white';
    return `btn w-100 text-start d-flex align-items-center justify-content-between py-2 px-3 rounded-3 border-0 ${state}`;
  };

  const getNavLinkClass = ({ isActive }) =>
    `btn w-100 text-start d-flex align-items-center gap-3 py-2 px-3 rounded-3 mb-1 border-0 transition-all ${
      isActive
        ? 'bg-white text-success fw-bold shadow-sm'
        : 'bg-transparent text-white opacity-75 hover-opacity-100'
    }`;

  const getSubItemClass = ({ isActive }) =>
    `btn w-100 text-start text-nowrap d-flex align-items-center gap-2 py-2 px-2 rounded-3 mb-1 border-0 transition-all ${
      isActive
        ? 'bg-white text-success fw-bold shadow-sm'
        : 'bg-transparent text-white opacity-75 hover-opacity-100'
    }`;

  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="text-white p-4 d-flex flex-column shadow-lg" style={{ width: '280px', background: 'linear-gradient(180deg, #198754 0%, #146c43 100%)' }}>
        <div className="mb-4 text-center">
          <img
            src={logo}
            alt="Logo Vitaldent Odontólogo"
            style={{ width: '220px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="nav flex-column mb-auto overflow-auto custom-scrollbar pe-2">
          {MENU_SECTIONS.map((section) => {
            const isOpen = openSection === section.key;
            const SectionIcon = section.icon;

            if (section.items.length === 1) {
              const single = section.items[0];
              const SingleIcon = single.icon;
              return (
                <div key={section.key} className="mb-2">
                  <NavLink to={single.to} className={getNavLinkClass}>
                    <SingleIcon size={18} /> {single.label}
                  </NavLink>
                </div>
              );
            }

            return (
              <div key={section.key} className="mb-2">
                <NavLink
                  to={section.items[0].to}
                  className={() => getSectionClass(section.key)}
                  onClick={(event) => handleSectionClick(event, section.key)}
                  aria-expanded={isOpen}
                >
                  <span className="d-flex align-items-center gap-3">
                    <SectionIcon size={18} /> {section.label}
                  </span>
                  {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </NavLink>

                {isOpen && (
                  <div className="ps-2 mt-1 border-start border-white border-opacity-25 ms-3">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <NavLink key={item.to} to={item.to} className={getSubItemClass} style={{ fontSize: '0.9rem' }}>
                          <ItemIcon size={14} className="flex-shrink-0" /> {item.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-top border-white border-opacity-25">
          <NavLink to="/odontologist/actualizarUsuario" className={getNavLinkClass}>
            <FaUserEdit size={18} /> Mi Perfil
          </NavLink>
          <button
            className="btn btn-danger w-100 mt-2 d-flex align-items-center justify-content-center gap-2 rounded-3"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh', backgroundColor: '#f4f6f8' }}>
        <div className="container-fluid max-w-7xl">
          <Outlet context={{ onAppointmentClick: goToAppointment, onTreatmentClick: goToTreatment }} />
        </div>
      </div>
    </div>
  );
}

export default OdontologistPortal;