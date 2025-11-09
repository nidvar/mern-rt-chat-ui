import { Link } from 'react-router-dom';

const CompletePage = function(){
    return(
        <>
            <div>
                <h1>Sign Up Complete!</h1>
                <p>Please login to continue</p>
                <Link to='/login'>Login</Link>
            </div>
        </>
    )
};

export default CompletePage;