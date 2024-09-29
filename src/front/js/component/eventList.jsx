import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/lista-evento.css'

const EventList = () => {
  const { store, actions } = useContext(Context);
  const events = store.events || [];
  const info = ["Evento", "Lugar", "Fecha", "Aforo", "Precio", "Acciones"];


  const handleDelete = async (eventId) => {
    const success = await actions.deleteEvent(eventId);
    if (success) {
      console.log("Event deleted successfully");
    } else {
      console.error("Failed to delete event");
    }
  };

  useEffect(() => {
    actions.getEvents(); 
  }, []);


  return (
    <div className="container mt-4">
      <h1 className="text-start">Lista de Eventos</h1>
      <hr />
      {/* Aqui empieza el Contenedor responsivo de la tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              {info.length>0 && info.map((data,index)=><th key={index} scope="col">{data}</th>)} 
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.stock} personas</td>
                <td>S/.{event.price}</td>
                <td>
                  <Link to={`/editarEvento/${event.id}`} className="btn btn-outline-primary btn-sm me-1">
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(event.id)}
                  >
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

export default EventList;
