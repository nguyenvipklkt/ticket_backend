import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('>>> check approot: ', appRoot)
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|avif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage)
    router.post('/update-user', homeController.postUpdateUser);
    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);
    router.post('/upload-multiple-images', upload.array('multiple_images', 3), homeController.handleUploadMutipleFiles);
    router.get('/detail/film/:idFilm', homeController.getDetailFilm);
    router.post('/create-new-film', homeController.createNewFilm);
    router.post('/delete-film', homeController.deleteFilm);
    router.get('/edit-film/:idFilm', homeController.getEditFilm);
    router.post('/update-film', homeController.postUpdateFilm);

    return app.use('/', router);

}

export default initWebRoute;