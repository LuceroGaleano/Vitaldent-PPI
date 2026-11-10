import { useCallback, useState } from 'react';

export default function useFormValidation() {
  const [hasInvalidFields, setHasInvalidFields] = useState(false);

  const handleInvalid = useCallback(() => {
    setHasInvalidFields(true);
  }, []);

  return {
    validationClassName: hasInvalidFields ? 'form-validation--attempted' : '',
    handleInvalid,
  };
}
