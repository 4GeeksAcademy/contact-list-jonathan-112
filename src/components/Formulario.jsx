import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createUser, getContacts, } from "../fetchApi"; 

export const Formulario = () => {


// Estado para almacenar los contactos y el usuario
const [contact, setContact] = useState([]);
const [user, setUser] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");

useEffect (() => {
    getContacts(setContact);
}, []);

//Funcion para crear nuevo contacto
function createContact(newContact) {
    let contact = newContact;   
    fetch('https://playground.4geeks.com/contact/agendas/pepitolio/contacts', {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.status === 201) {
                alert("Contact created successfully!");
            }
            return response.json()
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}


// Añadir un contacto
function addContact(event) {
    event.preventDefault();
    const newContact = {
        name: name,
        email:email,
        phone: phone,
        address: address,
    };
    createContact(newContact);
    // Limpiar el formulario después de enviar
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
}     

        


return (
<form onSubmit={addContact}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type="text" className="form-control" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input type="text" className="form-control" id="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
    </div>

    <button type="submit" className="btn btn-primary">Send</button>
    <Link className="enlace" to="/">or get back to contacts</Link>
  
</form>

);
};
