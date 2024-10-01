import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';

const ComprasUser = () => {
    const { store, actions } = useContext(Context);
    const [tickets, setTickets] = useState([]);
    const { currentUser } = store;
    const events = JSON.parse(localStorage.getItem("events"))

    useEffect(() => {
        if (currentUser) {
            const fetchTickets = async () => {
                const fetchedTickets = await actions.getTicketsByUser();
                if (fetchedTickets && fetchedTickets.length > 0) {
                    setTickets(fetchedTickets);
                } else {
                    setError('No se encontraron tickets para este usuario.');
                }
            };
            fetchTickets();
        }

    }, [currentUser]);

    if (tickets.length <= 0) return <div className="text-center text-black bg-danger bg-gradient">No tienes Tickets por mostrar</div>;


    return (
        <div className="container mt-2">
            <h1 className="text-center fs-1 text-primary">Mis Compras</h1>
            {tickets.map((ticket) => {
                const event = events.find(evento => evento.id === ticket.event_id);
                return (
                    <div className="card mb-3" key={ticket.numero_ticket}>
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title">Ticket #{ticket.numero_ticket}</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Evento ID: {ticket.event_id}</h6>
                            <h5 className='fs-bolder text-primary'>Evento: {event.title ? event.title : "None"}</h5>
                            <p className='card-text'>
                                <strong className="text-primary">Fecha:</strong> {event.date}<br />
                                <strong className="text-primary">Hora:</strong> {event.time}<br />
                                <strong className="text-primary">Lugar:</strong> {event.location}
                            </p>
                            <p className="card-text">
                                <strong className="text-primary">Precio:</strong> ${ticket.price}<br />
                                <strong className="text-primary" >ID de compra:</strong> {ticket.purchase_id}<br />
                                <strong className="text-primary" >Comprador:</strong> {currentUser.name} {currentUser.last_name}<br />
                                <strong className="text-primary">DNI:</strong> {currentUser.dni}<br />
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Ticket #{ticket.numero_ticket}</small>
                        </div>
                    </div>)
            })}
        </div>
    );
};

export default ComprasUser;