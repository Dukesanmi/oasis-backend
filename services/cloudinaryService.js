//DOESNOT WORK YET FOR UPLOADING IMAGES TO CLOUD AND RETURNING LIGHT SECURE_URL
const log = console.log;
const cloudinary = require('cloudinary');
const streamifier = require('streamifier');
const fileUpload = multer();


//exports.uploadImage =
app.post('/upload', fileUpload.single('image'), function (req, res, next) {
let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};

async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
}

upload(req);
});