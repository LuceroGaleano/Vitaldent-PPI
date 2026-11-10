import { useState } from 'react';

export default function useSuccessModal() {
  const [success, setSuccess] = useState(null);

  const showSuccess = (message, onConfirm) => {
    setSuccess({ message, onConfirm });
  };

  const confirmSuccess = () => {
    const onConfirm = success?.onConfirm;
    setSuccess(null);
    onConfirm?.();
  };

  return {
    successMessage: success?.message ?? '',
    showSuccess,
    confirmSuccess,
  };
}
