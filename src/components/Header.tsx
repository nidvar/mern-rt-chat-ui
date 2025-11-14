import { Link } from 'react-router-dom';

const Header = function({logout, isLoggedIn}:{ logout: ()=> void, isLoggedIn: boolean }){
    return(
        <>  
            <Link to='/'>HOME</Link>
            <br />
            {
                isLoggedIn?
                <div>
                    <Link to='/profile'>PROFILE</Link>
                    <br /><br />
                    <button onClick={logout}>LOGOUT</button>
                </div>: 
                <div>
                    <Link to='/login'>LOGIN</Link>
                </div>
            }
        </>
    )
};

export default Header;