//Funcion para obtener los contactos
export function getContacts(setContact) {
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

//Funcion para crear un usuario
export function createUser(setUser) {
    fetch('https://playground.4geeks.com/contact/agendas/pepitolio', { method: "POST" })
        .then((response) => {
            return response.json()
        })
        .then((data) => setUser(data))
        .catch((error) => console.log(error))
}   

