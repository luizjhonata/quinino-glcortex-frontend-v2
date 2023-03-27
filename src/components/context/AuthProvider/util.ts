
import { Api } from "../../../util/request";
import { IUser } from "./types";

//Função para armazenar dados no LocalStorage do navegador que receberá um objeto do tipo IUser ou null
export function setUserLocalStorage (user: IUser | null) {
// 'u' é o nome da chave em que os dados serão salvos, pode ser qualquer nome. User é o que vai ser passado, stringify converte os dados para Json que é o formato recebido pelo localStorage 
    localStorage.setItem('u', JSON.stringify(user));
}

//Função para utilizar os dados que estão no local Storage
export function getUserLocalStorage () {
    const json = localStorage.getItem('u')

    //Se não existir json com essa chave retorna null
    if (!json) {
        return null;
    }
    //Se existir user recebe os dados do json
    const user = JSON.parse(json)
    //Caso seja string vazia ou algo que não interessa retorna null
    return user ?? null;
}

export async function LoginRequest (email: string, password: string) {
    try {
        const request = await Api.post("/api/v1/auth/authenticate", {email, password})

        return (
            request.data
        )
    } catch (error) {
        return null;
    }
}