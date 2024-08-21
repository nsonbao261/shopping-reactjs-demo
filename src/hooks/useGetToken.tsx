import { useCookies } from "react-cookie"

export const useGetToken = () => {
    try {
        const [cookies, _] = useCookies(["access_token"]);
        return cookies?.access_token;

    } catch (error) {
        console.log(error);
        return;
    }
}