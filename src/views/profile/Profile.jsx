import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

export default function Profile() {
    const {request, token} = useContext(AppContext);
    const [userData, setUserData] = useState({});

    useEffect( () => {
        if(token == null) {
            setUserData({});
        }
        else {
            request("/api/user/profile")
            .then(setUserData)
            .catch(err => {
                console.error(err);
                setUserData({});
            });
        }
    }, [token] );

    return <>
        <h1>Кабінет користувача</h1>
        {!!userData.id ? <>
            <p>{userData.name}</p>
            <p>{userData.phone}</p>
            <p>{userData.email}</p>
        </> : <>
            <h3>Авторизуйтесь для перегляду інформації</h3>
        </>}
        
    </>;
}