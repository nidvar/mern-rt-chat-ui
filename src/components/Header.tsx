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
                    <div>
                        <Link to='/login'>LOGIN</Link>
                    </div>
                    <div>
                        <Link to='/signup'>REGISTER</Link>
                    </div>
                </div>
            }
        </>
    )
};

export default Header;