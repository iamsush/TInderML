const {downloadImages} = require('./util');

const userDataArray = [];
const handleResponse = async response => {
    if (response.url() == "https://api.gotinder.com/v2/recs/core?locale=en-GB" && response.status() === 200) {
        try {
            let responseData = await response.json();
            let newUserData = responseData.data.results.reduce((acc, currentUser) => Object.assign(acc, {
                [currentUser.user._id]: currentUser
            }), {});
            Object.assign(userDataArray, newUserData);
        } catch (err) {
            console.log('Parsing Error');
        }
    }
    if (response.url().startsWith('https://api.gotinder.com/pass/') && response.status() === 200) {
        try {
            let userID = response.url().match(/^https:\/\/api\.gotinder\.com\/pass\/([a-f0-9]*)\?.*/)[1];
            console.log(`user ID = ${userID}`);
            downloadImages(userID, userDataArray[userID].user.photos, false);
        } catch (err) {
            console.log('Parsing Errorin passs');
            console.log(err);
        }
    }
    if (response.url().startsWith('https://api.gotinder.com/like/') && response.status() === 200) {
        try {
            let userID = response.url().match(/^https:\/\/api\.gotinder\.com\/like\/([a-f0-9]*)\?.*/)[1];
            console.log(`user ID = ${userID}`);
            downloadImages(userID, userDataArray[userID].user.photos, true);
        } catch (err) {
            console.log('Parsing Error in like');
            console.log(err);
        }
    }
};

module.exports = {
    handleResponse
}