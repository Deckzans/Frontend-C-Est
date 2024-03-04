export const commonValidationRules = {
  required: 'Este campo es requerido',
  minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
  validate: {
    onlyLetters: value => /^[A-Za-z]+$/.test(value) || 'Solo se permiten letras',
  },
  // Agrega más reglas según tus necesidades
};
export const commonValidationRulesNumber = {
  required: 'Este campo es requerido',
  validate: {
    nonNegative: value => parseFloat(value) >= 0 || 'El valor no puede ser negativo',
    positive: value => parseFloat(value) > 0 || 'El valor debe ser mayor que cero',
    // Agrega más reglas según tus necesidades
    // ...
  },
};



