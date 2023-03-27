export interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    token?: string;
    roles?: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
}


export interface IAuthProvider {
    children: JSX.Element;
}