import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {createUser, getContacts} from "../fetchApi";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contact, setContact] = useState([]);
    const [user, setUser] = useState("");
   

    useEffect(() => {
        createUser(setUser);
        getContacts(setContact);
    }, []);



    //Funcion para borrar un contacto
    function deleteContact(id) {
        fetch(`https://playground.4geeks.com/contact/agendas/pepitolio/contacts/${id}`, { method: "DELETE" })
            .then((response) => {
                console.log(response);

                if (response.ok) {
                    getContacts(setContact);
                }
                return response.json();
            })
            .then((data) => setContact(data))
            .catch((error) => console.log(error))
    }

   

    return (
        <div>
            <div className="boton">
                <Link to="/formulario">
                    <button className="btn btn-success">Crea Contacto</button>
                </Link>
            </div>

            {contact.map((contact) => (
                <Card key={contact.id} contact={contact} onDelete={deleteContact}  />
            ))}
        </div>
    );
};