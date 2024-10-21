import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/lista-evento.css'
import Swal from "sweetalert2";


const UserList = () => {
  const info = ["Nombre", "Apellido", "Email", "Contraseña", "Celular", "Acciones"]
  const { store, actions } = useContext(Context);
  const users = store.users || [];

  const handleDelete = async (userId) => {
    const success = await actions.deleteUser(userId);
    if (success) {
      Swal.fire({
        icon: 'success',
        title: "User deleted successfully",
        confirmButtonText: 'Ok'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "Failed to delete user",
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Usuarios</h1>
      <hr className="text-color-gray" />
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-info">
            <tr>
              {info.length > 0 && info.map((inf, index) =>
                <th scope="col" key={index}>{inf} </th>
              )}
            </tr>
          </thead>
          <tbody >
            {users.length > 0 && users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td className="text-start">
                  <button className="btn btn-outline-primary btn-sm me-2">
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default UserList;
