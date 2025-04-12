import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function Category() {
    const {id} = useParams();
    const {request} = useContext(AppContext);
    const [category, setCategory] = useState({products:[]});

    useEffect( () => {
        request("/api/category/" + id)
        .then(data => setCategory(data))
        .catch(j => console.error(j));
    }, [id] );

    return <>
        <h1>Розділ {category.name}</h1>
        {category.products.map(p => <div key={p.id}>
            {p.name}
            <img src={p.imagesCsv.split(',')[0]} alt="Product" />
        </div>)}
    </>;
}