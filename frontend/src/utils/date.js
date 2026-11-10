//Funcion para obtener la fecha actual
export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDate = (date) => {
  const [year, month, day] = date.split('-').map(Number);
  const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(
    new Date(year, month - 1, 1)
  );

  return `${day}/${monthName}/${year}`;
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};
