const ProfilePage = function(){
    const updateProfile = async function(){
        const payload = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include' as RequestCredentials,
            body: JSON.stringify({
                profileImage: '',
            })
        };

        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/update', payload);
        const data = await res.text();
        console.log(data);
    };

    return(
        <>
            <div>
                <h1>Profile Page</h1>
                
                <button onClick={updateProfile}>UPDATE</button>
            </div>
        </>
    )
};

export default ProfilePage;