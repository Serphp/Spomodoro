import React, { useEffect, useContext } from 'react'
import { DBContext } from '../src/Context/DbContext'
import { usersDb } from '../src/firebase'

export default function Db() {
    const { currentUser, doCreateUser, onceGetUsers, setLoading } = useContext(DBContext);

    useEffect(() => {
        usersDb.add({
            id: "user_1234",
            username: "johndoe",
            email: "johndoe@example.com",
            nombre: "John",
            apellido: "Doe",
            pais: "Estados Unidos",
            fechaNacimiento: "01/01/1990",
            genero: "Masculino",
            tipoUsuario: "Premium",
            fechaCreacion: "05/01/2022",
            fechaModificacion: "10/01/2022",
            fechaEliminacion: "",
            estadoUsuario: "Activo",
            estadoCuenta: "Verificada",
            estadoSuscripcion: "Activa",    
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
    }, [])


    return (
        <>
        <h1> Hola </h1>
        </>)
}