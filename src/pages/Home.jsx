import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx"
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
    getContacts();
}, []);

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

	return (
<div>
		<div className="boton">
			<Link to="/nuevo">
				<button className="btn btn-success">Crea Contacto</button>
			</Link>
		</div>
		
		<Card contact={contact} />
		</div>

	);
}; 