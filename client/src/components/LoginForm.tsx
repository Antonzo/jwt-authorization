import React, {FC, useContext, useState} from 'react';
import {set} from "mobx";
import {StoreContext} from "../index";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {store} = useContext(StoreContext);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={email}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Register</button>
        </div>
    );
}

export default LoginForm;