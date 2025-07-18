import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createUser, getContacts, } from "../fetchApi"; 

const Nuevo = () => {
let infoContact = JSON.parse(localStorage.getItem("infoContact"));
console.log(infoContact);

// Estado para almacenar los contactos y el usuario
const [contact, setContact] = useState([]);
const [user, setUser] = useState("");
const [name, setName] = useState(infoContact.name);
const [email, setEmail] = useState(infoContact.email);
const [phone, setPhone] = useState(infoContact.phone);
const [address, setAddress] = useState(infoContact.address);
const { id } = useParams(); 

useEffect (() => {
    getContacts(setContact);
}, []);
console.log(contact);



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

 //Funcion para editar un contacto
    function editContact(e) {
        e.preventDefault();
        console.log(name);
       fetch(`https://playground.4geeks.com/contact/agendas/pepitolio/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address,
            })
        })
            .then((response) => {
                console.log(response);
                
                if (response.ok) {
                    getContacts();
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            }); 
        };
 
console.log(name);

        


return (
<form onSubmit={editContact}>
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
  
</form>

);
};
export default Nuevo;