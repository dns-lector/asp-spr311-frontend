import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

export default function Signup() {
    const {request} = useContext(AppContext);

    const onRegister = (e) => {
        e.preventDefault();
        request('/api/user', {
            method: 'POST',
            body: new FormData(e.target)
        }).then(console.log).catch(console.error);
    };

    return <>
    <h1>Реєстрація</h1>
    <form onSubmit={onRegister} encType="multipart/form-data">    
        Login: <input name="user-login"/>
        Full name: <input name="user-name"/>
        Password: <input name="user-password" type="password" minLength="3"/>    
        Repeat password: <input name="repeat-password" type="password" minLength="3"/>    
        Phone: <input name="user-phone" placeholder="+"/>
        Email: <input name="user-email" type="email"/>
        Country: <input name="user-country"/>
        Birth date: <input name="user-birthDate" type="date"/>    
        <button type="submit">Register now</button>
    </form>
    </>;
}