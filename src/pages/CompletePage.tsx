import { Link } from 'react-router-dom';

const CompletePage = function(){
    return(
        <div className='complete-page'>
            <h1>Sign Up Complete</h1>
            <p>Please login to continue</p>
            <Link to='/login' className='link'>LOGIN</Link>
        </div>
    )
};

export default CompletePage;