import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contact, setContact] = useState([]);
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        createUser();
        getContacts();
    }, []);

    //Funcion para crear un usuario
    function createUser() {
        fetch('https://playground.4geeks.com/contact/agendas/pepitolio', { method: "POST" })
            .then((response) => {
                return response.json()
            })
            .then((data) => setUser(data))
            .catch((error) => console.log(error))
    }

    //Funcion para obtener los contactos
    function getContacts() {
        fetch('https://playground.4geeks.com/contact/agendas/pepitolio')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.contacts);
                setContact(data.contacts);
            })
            .catch((error) => console.log(error));
    }

    //Funcion para borrar un contacto
    function deleteContact(id) {
        fetch(`https://playground.4geeks.com/contact/agendas/pepitolio/contacts/${id}`, { method: "DELETE" })
            .then((response) => {
                console.log(response);

                if (response.ok) {
                    getContacts();
                }
                return response.json();
            })
            .then((data) => setContact(data))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <div className="boton">
                <Link to="/nuevo">
                    <button className="btn btn-success">Crea Contacto</button>
                </Link>
            </div>

            {contact.map((contact) => (
                <Card key={contact.id} contact={contact} onDelete={deleteContact} />
            ))}
        </div>
    );
};