
// function to turn vanityURL into apikey meaning pretty much it is a function that is supposed to be called when we need to
// convert username into an unique Steamid.
export async function fetchSteamID(apikey, vanityURL){
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apikey}&vanityurl=${vanityURL}`;
    const response = await fetch(url);
    // turn the fetched result into json format cause it will be much easier to manipulate the data
    const resultingjson = await response.json();
    if(resultingjson.response.success == 42){
        // In the app side if the steam ID is 0 it will throw error and prompt the user to try again.
        return 0;
    }else{
        return resultingjson.response.steamid;
    }
}


// function to fetch user's basic data

export async function getUserData(apikey, userid){
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${userid}`;
    const response = await fetch(url);
    const resultjson = await response.json();
    return resultjson.response.players[0]
}