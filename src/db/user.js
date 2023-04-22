import { usersDb, AuthContext } from "./firebase";

export const doCreateUser = (id, username, email) =>
  usersDb.doc(id).set({
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

export const onceGetUsers = () => usersDb.get();

export const onceGetUser = (id) => usersDb.doc(id).get();

  const { currentUser } = useContext(AuthContext);
