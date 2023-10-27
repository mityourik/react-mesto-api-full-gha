import { useState, useCallback } from 'react';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;//деструктуризация объекта события
    const form = e.target.closest('form');//ближайшая родительская форма относительно текущего элемента
    
    //валидация
    let errorMessage = ""; // переменная пустой ошибки
    if (!value) { //проверка значени инпутов если пустые
        errorMessage = "";//то очистить
    } else {
        errorMessage = e.target.validationMessage;//показать станд сообщение об ошибке
    }
    
    //обновление состояний
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
    setIsValid(form.checkValidity());//обновление состояния валидности формы на соответствие паттерну
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}