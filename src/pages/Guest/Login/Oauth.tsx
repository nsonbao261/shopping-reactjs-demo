import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Oauth = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [_, setCookies] = useCookies(['access_token']);


    useEffect(() => {
        const access_token = searchParams.get("access_token");
        if (access_token) {
            setCookies("access_token", access_token);
            navigate("/home");
        } else {
            alert("Server Error");
            navigate("/");
        }
    })

    return (
        <></>
    )
}

export default Oauth
