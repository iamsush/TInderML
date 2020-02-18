const fs = require('fs');
let downloadImages = (userID, photos, like) => {
    // photos.forEach(async (photo, index) => {
    //   var viewSource = await page.goto(photo.url);
    //   let directory = like ? 'likes' : 'dislikes';
    //   fs.writeFile(path.join(__dirname, directory, `${userID}_${index}`), await viewSource.buffer(), err => 
    //   {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    //   });
    // });
    let photoObj = [];
    photos.forEach(photo => {
        photoObj.push(photo.url);
    });

    fs.readFile((like ? 'likes.json' : 'dislikes.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let oldData = JSON.parse(data);
            let newData = Object.assign(oldData, {
                [userID]: photoObj
            });
            json = JSON.stringify(newData);
            fs.writeFile((like ? 'likes.json' : 'dislikes.json'), json, 'utf8', err => {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
    });
};

let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    downloadImages,
    sleep
};