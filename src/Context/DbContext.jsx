import React, { useState, useEffect, createContext } from "react"

import { usersDb, db } from "../firebase"

export const DBContext = createContext();

const DatabaseProvider = ({ children }) => {
    const [currentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    const doCreateUser = (id, username, email) =>
    usersDb.doc(id).set({
      id,
      username,
      email,
      nombre,
      apellido,
      telefono,
      direccion,
      ciudad,
      estado,
      codigoPostal,
      pais,
      fechaNacimiento,
      genero,
      tipoUsuario,
      fechaCreacion,
      fechaModificacion,
      fechaEliminacion,
      estadoUsuario,
      estadoCuenta,
      estadoSuscripcion,
    });
  
   const onceGetUsers = () => usersDb.get();
  
  const value = {
    usersDb,
    currentUser,
    doCreateUser,
    onceGetUsers,
    setLoading,
  }

  return (
    <DBContext.Provider value={value}>
      {children}
    </DBContext.Provider>
  )
}

export default DatabaseProvider;