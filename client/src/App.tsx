import React, {FC, useEffect, useContext, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {StoreContext} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(StoreContext);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    if (!store.isAuth) {
        return <LoginForm />
    }
    return (
        <div>
            <h1>{store.isAuth ? `User is authenticated: ${store.user.email}` : "Authenticate yourself"}</h1>
            <h1>{store.user.isActivated ? 'Account is activated' : 'Activate the account'}</h1>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={getUsers}>Get users</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
}

export default observer(App);