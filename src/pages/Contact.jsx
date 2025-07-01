import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Nuevo from "../components/Nuevo.jsx";
import Card from "../components/Card.jsx";
import { Link } from "react-router-dom";


export const Contact = () => {

  const {store, dispatch} =useGlobalReducer()

    return (

        <div>
          <h1 className="text-center mt-5">
              ADD A NEW CONTACT </h1>
          < Nuevo />
          <Link className="enlace" to="/">or get back to contacts</Link>
        </div>
    );
}; 