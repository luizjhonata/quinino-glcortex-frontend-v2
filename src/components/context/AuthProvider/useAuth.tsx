import { useContext } from "react"
import { AuthContext } from "."

export const useAuth = () => {

    //context recebe o contexto AuthContext criado
    const context = useContext(AuthContext);

    //disponibiliza o context
    return context;
};