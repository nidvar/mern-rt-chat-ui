import { Link } from 'react-router-dom';

const Header = function({logout, isLoggedIn}:{ logout: ()=> void, isLoggedIn: boolean }){
    return(
        <>
            {
                isLoggedIn?
                <div>
                    <Link to='/profile'>PROFILE</Link>
                    <br /><br />
                    <button onClick={logout}>LOGOUT</button>
                </div>: 
                <div>
                    <Link to='/login'>Login</Link>
                </div>
            }
        </>
    )
};

export default Header;