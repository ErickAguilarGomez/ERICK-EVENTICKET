import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { useLocation } from "react-router-dom";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			if(localStorage.getItem("adminToken") )state.actions.getUsers()
		}, [state.store.adminToken]);

		useEffect(() => {
			state.actions.getEvents(); 
		  }, []);

		  useEffect(() => {
			if(localStorage.getItem("adminToken"))state.actions.getDatadmin(); 
		  }, []);

		  
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
