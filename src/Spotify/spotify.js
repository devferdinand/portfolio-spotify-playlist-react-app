/*
    Use Implicit Grant Flow to get user's Spotify access token.
    Note: Implicit Grant Flow does not offer Access token refresh.
*/
const getUserAuthorization = () => {
    var client_id = '7548bd64b7224381a35daea267136094';
    var redirect_uri = 'http://localhost:3000/';
    var scope = 'user-read-private user-read-email playlist-modify-public';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    window.location.href = url;
};

const getFromURL = (queryParameter) => {
    // Check if there is a hash fragment in the URL (e.g., #access_token=...&token_type=...&expires_in=...)
    if(window.location.hash){
        // Remove the '#' character from the fragment so that you're left with query parameters.
        const fragment = window.location.hash.substring(1); // Remove the '#' character
        // Parse the fragment as URL parameters, so you can access the individual query parameters.
        const params = new URLSearchParams(fragment);

        if(params.has(queryParameter)){
            return params.get(queryParameter);
        }
    }
};

const getUserAccessToken = () => {
    return getFromURL('access_token');
};

// Future project - user pop up to reauthenticate before token expires
const getTokenExpirationTime = () => {
    return getFromURL('expires_in');
};


export {getUserAuthorization, getUserAccessToken};