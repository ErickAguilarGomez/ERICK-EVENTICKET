import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Swal from "sweetalert2";

const PerfilUser = () => {
  const { store, actions } = useContext(Context);
  const { currentUser } = store;
  const [profileData, setProfileData] = useState({
    name: "",
    last_name: "",
    date_of_birth: "",
    dni: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || "",
        last_name: currentUser.last_name || "",
        date_of_birth: currentUser.date_of_birth || "",
        dni: currentUser.dni || "",
        phone: currentUser.phone || "", // corrected phone field
        email: currentUser.email || ""  // corrected email field
      });
    }
  }, [currentUser]);

  const formFields = [
    { label: "Nombre", name: "name", type: "text", placeholder: "Nombre" },
    { label: "Apellidos", name: "last_name", type: "text", placeholder: "Apellido Paterno" },
    { label: "F. de Nac", name: "date_of_birth", type: "date", placeholder: "Fecha de Nacimiento" },
    { label: "DNI", name: "dni", type: "text", placeholder: "DNI" },
    { label: "Celular", name: "phone", type: "text", placeholder: "Celular" },
    { label: "E-mail", name: "email", type: "email", placeholder: "Correo Electrónico", disabled: true }
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };


  const handleUpdateUser = async () => {
    const userId = currentUser.id;
    await actions.updateUser(userId, profileData);
    Swal.fire({
      icon: 'success',
      title: 'Datos actualizados correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="container justify-content-center">
      <h2 className="mb-4 w-100 text-center">Datos Personales</h2>
      <form className='d-flex flex-wrap w-100 justify-content-center'>
        {(formFields.length > 0 && profileData) && formFields.map((data, index) => (
          <div className="m-3 w-25" key={index}>
            <label className='text-nowrap' htmlFor={data.name}>{data.label}</label>
            <input
              type={data.type}
              className="form-control"
              placeholder={data.placeholder}
              name={data.name}
              value={profileData[data.name]}
              onChange={handleChange}
              disabled={data.disabled || false}
            />
          </div>
        ))}
        <div className='w-100 d-flex justify-content-center'>
          <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilUser;
