// EmpleadoButtons.js
import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EmpleadoButtons = ({ onAdd, onEdit, onDelete, onVacaciones, onPermiso, onIncapacidad, onDiaEconomico, isEditDisabled, isDeleteDisabled, isVacacionesDisabled, isPermisoDisabled, isIncapacidadDisabled, isDiaEconomicoDisabled }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button onClick={onAdd}>Agregar</Button>
      <Button onClick={onEdit} disabled={isEditDisabled}>
        Editar
      </Button>
      <Button onClick={onDelete} disabled={isDeleteDisabled}>
        Eliminar
      </Button>
      <Button onClick={onVacaciones} disabled={isVacacionesDisabled}>
        Vacaciones
      </Button>
      <Button onClick={onPermiso} disabled={isPermisoDisabled}>
        Permiso
      </Button>
      <Button onClick={onIncapacidad} disabled={isIncapacidadDisabled}>
        Incapacidad
      </Button>
      <Button onClick={onDiaEconomico} disabled={isDiaEconomicoDisabled}>
        Día Económico
      </Button>
      {/* Otros botones según tus necesidades */}
    </div>
  );
};

export default EmpleadoButtons;
