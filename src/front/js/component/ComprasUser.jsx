import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const ComprasUser = () => {
    const { store } = useContext(Context);
    const { currentUser } = store;
    const events = store.events || [];

    useEffect(() => {
    }, [currentUser]);

    return (
        <div className="container mt-2">
            <h1 className="text-center fs-1 text-primary">Mis Compras</h1>
            {currentUser && currentUser.tickets.length > 0 ? (
                currentUser.tickets.map((ticket) => {
                    const event = events.find(evento => evento.id === ticket.event_id);
                    return (
                        <div className="card mb-3" key={ticket.numero_ticket}>
                            <div className="card-header bg-primary text-white">
                                <h5 className="card-title">Ticket #{ticket.numero_ticket}</h5>
                            </div>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Evento ID: {ticket.event_id}</h6>
                                <h5 className='fs-bolder text-primary'>Evento: {event.title}</h5>
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
                        </div>
                    );
                })
            ) : (
                <div className="text-center text-black bg-danger bg-gradient">No tienes Tickets por mostrar</div>
            )}
        </div>
    );
};

export default ComprasUser;
