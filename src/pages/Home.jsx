import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
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
    fetch('https://playground.4geeks.com/contact/contacts/pepitolio')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } 
        })
        .then((data) => {
            setContacts(data);
        })
        .catch((error) => console.log(error));
}  

//Funcion para borrar un contacto
	 function deleteContact(id) {
    fetch(`https://playground.4geeks.com/contact/contacts/${id}`, { method: "DELETE" })
        .then((response) => {
            if (response.ok) {
                getContacts();  
            }
            return response.json()
        })
        .then((data) => setContact(data))
        .catch((error) => console.log(error)) }

	return (
<div>
		<div className="boton">
			<Link to="/nuevo">
				<button className="btn btn-success">Crea Contacto</button>
			</Link>
		</div>

		{contacts.map((contact) => (
                <Card key={contact.id} contact={contact} onDelete={deleteContact} />
            ))}
        </div>
    );
};