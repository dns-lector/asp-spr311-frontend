import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const {request} = useContext(AppContext);

    useEffect( () => {
        request("/api/category")
        .then(data => setCategories(data))
        .catch(j => console.error(j));
    }, [] );

    return <>
        <h1>Крамниця</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {categories.map( ctg => <div key={ctg.id} className="col">
                <Link to={"/category/" + ctg.slug} className="nav-link text-dark h-100" >
                    <div className="card h-100">
                        <img src={ctg.imageUrl} alt="Image" className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{ctg.name}</h5>
                            <p className="card-text">{ctg.description}</p>
                        </div>
                    </div>
                </Link>
            </div>)}
        </div>
    </>;
}