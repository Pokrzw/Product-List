import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

interface Props{
    children: React.ReactElement
}
const Secured = ({children}:Props)=> {
    const auth = useAuth();

    useEffect(() => {
        console.log(auth.isAuthenticated, auth.isLoading);
    }, [auth.isAuthenticated, auth.isLoading])

    if(!auth.isAuthenticated)
        return (
            <div>
                <h1>Not authorized...</h1>
                <button onClick={() => auth.signinRedirect({redirect_uri: `${window.location.href}`})}> Log in</button>
            </div>
        )
    else
        return children
}

export default Secured