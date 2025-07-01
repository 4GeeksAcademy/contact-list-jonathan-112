import React, { useState, useEffect } from "react";

const Nuevo = () => {

// Estado para almacenar los contactos y el usuario
const [contact, setContact] = useState([]);
const [user, setUser] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");



//Funcion para crear nuevo contacto
function createContact(newContact) {
    let contact = newContact;   
    fetch('https://playground.4geeks.com/contact/contacts/pepitolio', {
        method: "POST",
        body: JSON.stringify(newContact),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            if (response.status === 201) {
                getContacts();
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
            setContact(data);
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
<form onSubmit={addContact}>
    <div className="mb-3">
        <label for="name" className="form-label">Full Name</label>
        <input type="text" className="form-control" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="mb-3">
        <label for="email" className="form-label">Email</label>
        <input type="text" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
        <label for="phone" className="form-label">Phone</label>
        <input type="text" className="form-control" id="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    <div className="mb-3">
        <label for="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary">Send</button>
</form>

);
};
export default Nuevo;