import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Nuevo from "../components/Nuevo.jsx";

export const Contact = () => {

  const {store, dispatch} =useGlobalReducer()

    return (
        
        < Nuevo />
    );
}; 