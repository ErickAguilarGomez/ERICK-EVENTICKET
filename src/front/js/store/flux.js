const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			users: [],
			ticket: [],
			currentUser: null,
			accessToken: localStorage.getItem("access_token") || false,
			admin: null,
			adminToken: localStorage.getItem("adminToken") || false,
			favourites: [{ user_id: "", event_id: "" }],
			favorites: [],
		},
		actions: {
			getEvents: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/events', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
					const events = await response.json();
					setStore({ events: events });
					return "Eventos obtenidos exitosamente"
				} catch (error) {
					console.error("Error en la llamada fetch de eventos:", error);
					return "Error en la llamada fetch de eventos"
				}
			},

			getUsers: async () => {
				try {
					let adminToken = localStorage.getItem("adminToken")
					const response = await fetch(process.env.BACKEND_URL + "/api/getusers", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});
					const data = await response.json();
					if (!response.ok) { console.log("error al obtener usuario" + response.msg) }
					setStore({ users: data });
					console.log("Usuarios Obtenidos de manera exitosa")
					return "Usuarios Obtenidos de manera exitosa";
				} catch (error) {
					console.error("Error al obtener los usuarios", error);
					return "Error al obtener los usuarios";
				}
			},

			createUser: async (userData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});

					const data = await response.json();
					if (!response.ok) {
						console.log("error " + data.message)
						return false
					}
					console.log(data)
					// setStore({users:[...users]})
					return true;
				} catch (error) {
					console.error("Error en la solicitud para crear usuario:", error);
					return false;
				}
			},

			deleteUser: async (userId) => {
				const adminToken = localStorage.getItem("adminToken")
				console.log(adminToken)

				console.log(userId)
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});

					const data = await response.json();
					const store = getStore();
					const updatedUsers = store.users.filter(user => user.id !== userId);
					setStore({ users: updatedUsers });
					return data.message;
				} catch (error) {
					console.error("Error deleting user:", error);
					return "Error deleting user";
				}
			},

			loginUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});
					const data = await response.json();
					if (!response.ok) {
						return false
					}
					localStorage.setItem("access_token", data.access_token);
					setStore({ currentUser: data, accessToken: data.access_token })
					return "Usuario logueado exitosamente";
				} catch (error) {
					console.error("Error en la solicitud de inicio de sesión:", error);
					return false;
				}
			},

			getDataUser: async () => {
				try {
					const userToken = localStorage.getItem("access_token");
					if (!userToken) {
						console.error("Token no encontrado");
						return;
					}

					console.log(userToken);

					const request = await fetch(process.env.BACKEND_URL + '/api/user', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${userToken}`,
						},
					});

					if (!request.ok) {
						console.log(`Error en la solicitud: ${request.status}`);
					}

					const response = await request.json();
					setStore({ currentUser: response.user_data });
				} catch (error) {
					console.log(error);
				}
			},

			// Acción para actualizar la información del usuario
			updateUser: async (user_id, updatedData) => {
				const accessToken = localStorage.getItem("access_token")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${user_id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify(updatedData),
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ currentUser: data });
						console.log("Usuario actualizado exitosamente", data);
					} else {
						const error = await response.json();
						console.error("Error al actualizar usuario:", error);
					}
				} catch (error) {
					console.error("Error en la conexión con el servidor:", error);
				}
			},

			loginAdmin: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/loginadmin", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					const data = await response.json();
					if (!response.ok) {
						return false
					}
					localStorage.setItem("adminToken", data.access_token);
					setStore({ admin: data, adminToken: data.access_token })
					return "Administrador logueado exitosamente";
				} catch (error) {
					console.log("Error de conexión con el servidor" + "" + error)
					return false;
				}
			},

			getDatadmin: async () => {
				try {
					const adminToken = localStorage.getItem("adminToken")
					const request = await fetch(process.env.BACKEND_URL + "/api/datadmin", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						},
					})
					const response = await request.json()
					if (!request.ok) { console.log(response) }
					setStore({ admin: response.data })
					console.log("data de admin obtenida de manera exitosa")
				}
				catch (error) {
					console.log(error)
				}
			},

			logout: () => {
				const store = getStore()
				if (store.accessToken) {
					localStorage.removeItem("access_token");
					setStore({ accessToken: null, currentUser: null })
					return "Usuario Deslogeado"
				} else if (store.adminToken) {
					localStorage.removeItem("adminToken");
					setStore({ adminToken: null, admin: null })
					return "Administrador deslogeado"
				}
			},

			// Acción para crear un evento
			createEvent: async (eventData) => {
				const adminToken = localStorage.getItem("adminToken")
				const store = getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						},
						body: JSON.stringify(eventData)
					});

					const data = await response.json();
					if (!response.ok) { console.log(data) }
					setStore({ events: [...store.events, data.event] })
					return "Evento creado con éxito";
				} catch (error) {
					console.error("Error al crear el evento", error);
					return error;
				}
			},

			getEventById: async (eventId) => {
				let adminToken = localStorage.getItem("adminToken");

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});
					const data = await response.json();
					if (!response.ok) {
						console.error(data)
						return false
					}
					return data;
				} catch (error) {
					console.error("Error al obtener el evento", error);
					return null;
				}
			},

			deleteEvent: async (eventId) => {
				try {
					const adminToken = localStorage.getItem("adminToken")
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						}
					});

					const data = await response.json();
					console.log(data.message);
					const store = getStore();
					const updatedEvents = store.events.filter(event => event.id !== eventId);
					setStore({ events: updatedEvents });

					return true;
				} catch (error) {
					console.error("Error en la solicitud para eliminar evento:", error);
					return false;
				}
			}, // Fin deleteEvent

			updateEvent: async (eventId, eventData) => {
				const adminToken = localStorage.getItem("adminToken")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${adminToken}`
						},
						body: JSON.stringify(eventData)
					});
					const updatedEvent = await response.json();
					if (response.ok) {
						const store = getStore();
						const updatedEvents = store.events.map(event =>
							event.id === eventId ? updatedEvent : event
						);
						setStore({ events: updatedEvents });

						return "Evento Actualizado Exitosamente";
					} else {
						const errorData = await response.json();
						console.error("Error al actualizar evento:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud para actualizar evento:", error);
					return false;
				}
			}, // Fin updateEvent
			addFavourite: async (event_id) => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					// Realiza la llamada POST al backend para agregar el favorito
					const response = await fetch(process.env.BACKEND_URL + '/api/favourites', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`  // Agrega el token en el encabezado de autorización
						},
						body: JSON.stringify({ event_id: event_id })  // Enviamos solo el event_id
					});
					const favourite = await response.json();  // Obtener el favorito agregado
					console.log(favourite)
					if (response.ok) {
						const store = getStore();

						// Actualiza el store con el nuevo favorito
						setStore({ favorites: [...store.favorites, favourite.favourite] });
						console.log("Favorito agregado exitosamente:", favourite);
						return true;  // Indica que la acción fue exitosa
					} else {
						const errorData = await response.json();
						console.error("Error al agregar favorito:", errorData.error);
						return false;  // Indica que hubo un error en la acción
					}
				} catch (error) {
					console.error("Error en la solicitud para agregar favorito:", error);
					return false;  // Indica que hubo un error en la solicitud
				}
			},

			getFavourites: async () => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					// Realiza la llamada GET al backend para obtener los favoritos del usuario
					const response = await fetch(process.env.BACKEND_URL + "/api/favourites", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`  // Incluye el token en el encabezado de autorización
						}
					});

					if (response.ok) {
						const favourites = await response.json();
						const eventDetailsPromises = favourites.map(async (favourite) => {
							const eventResponse = await fetch(process.env.BACKEND_URL + `/api/events/${favourite.event_id}`, {
								method: "GET",
								headers: {
									"Content-Type": "application/json",
									"Authorization": `Bearer ${token}`  // Incluye el token
								}
							});
							return eventResponse.ok ? await eventResponse.json() : null;
						});

						// Esperamos todas las promesas para obtener los detalles de los eventos
						const eventDetails = await Promise.all(eventDetailsPromises);

						// Filtramos eventos válidos (no nulos)
						const validEventDetails = eventDetails.filter(event => event !== null);

						// Guardamos los detalles de los eventos en el store como favoritos
						setStore({ favorites: validEventDetails });
						console.log("Favoritos obtenidos exitosamente:", validEventDetails);
					} else {
						const errorData = await response.json();
						console.error("Error al obtener favoritos:", errorData.error);
					}
				} catch (error) {
					console.error("Error en la solicitud para obtener favoritos:", error);
				}
			},

			sendEmailToRecover: async (email) => {
				try {
					const data = await fetch(process.env.BACKEND_URL + '/api/recovery', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ "email": email })
					})
					const response = await data.json()
					return response
				} catch (error) {
					console.log(error)
				}
			},
			changepass: async (token, new_password) => {
				try {
					const data = await fetch(process.env.BACKEND_URL + '/api/changepass', {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ "new_password": new_password })
					})
					const response = await data.json()
					return response
				} catch (error) {
					console.log(error)
				}
			},
			createPurchase: async (event_id, state, quantity) => {
				try {
					const token = localStorage.getItem("access_token");
					if (!token) {
						console.error("No access token available");
						return false;
					}

					if (state !== "COMPLETED") {
						console.error("Purchase cannot be completed: Invalid status");
						return false;
					}

					const response = await fetch(process.env.BACKEND_URL + "/api/purchases", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							event_id: event_id,
							estado: state,
							quantity: quantity,
						}),
					});


					const data = await response.json();
					if (!response.ok) {
						console.log("Purchase error:", data);
						return false;
					}
					console.log("Purchase created successfully:", data);
					return true;


				} catch (error) {
					console.error("Error in the purchase request:", error);
					return false;
				}
			},




			getTicketsByUser: async () => {
				try {
					const token = localStorage.getItem("access_token");
					const response = await fetch(process.env.BACKEND_URL + "/api/tickets/user", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error fetching tickets:", errorData.error);
						return null;
					}

					const data = await response.json();
					console.log("Tickets data:", data);
					return data;
				} catch (error) {
					console.error("Error in getTicketsByUser:", error);
					return null;
				}
			},

			deleteFavourite: async (favouriteID) => {
				try {
					const store = getStore()
					const currentUserToken = localStorage.getItem("access_token")
					const request = await fetch(process.env.BACKEND_URL + `/api/favourites/${favouriteID}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${currentUserToken}`
						}
					})
					const response = await request.json()
					const eventFiltered = store.favorites.filter(event => event.id !== favouriteID);
					setStore({ favorites: eventFiltered });
					console.log(response)
					return true
				}
				catch (error) {
					return false
				}

			},

		}
	};
};

export default getState;
