import express from "express";
import APIController from '../controller/APIController';
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


//up load cinema
const storageCinema = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('>>> check approot: ', appRoot)
        cb(null, appRoot + "/src/public/image/logo-cinemas/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilterCinema = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|avif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadCinema = multer({ storage: storageCinema, fileFilter: imageFilterCinema });

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers);
    router.get('/user/:id', APIController.getUser);
    router.post('/create-user', APIController.createNewUser);
    router.put('/update-user/:id', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);
    router.get('/films', APIController.getAllFilms);
    router.get('/film/:idFilm', APIController.getFilm);
    router.post('/create-film', APIController.createNewFilm);
    router.put('/update-film/:idFilm', APIController.updateFilm);
    router.delete('/delete-film/:idFilm', APIController.deleteFilm);
    router.post('/login', APIController.loginUser);
    router.get('/cinemas', APIController.getAllCinemas);
    router.post('/create-cinema', APIController.createNewCinema);
    router.put('/update-cinema/:idCinema', APIController.updateCinema);
    router.delete('/delete-cinema/:idCinema', APIController.deleteCinema);
    router.get('/schedules', APIController.getAllSchedules);
    router.get('/schedule/:idFilm/:idCinema', APIController.getSchedule);
    router.post('/create-schedule', APIController.createNewSchedule);
    router.put('/update-schedule/:idSC', APIController.updateSchedule);
    router.delete('/delete-schedule/:idSC', APIController.deleteSchedule);
    router.post('/getShowDateAndIdCinema', APIController.getShowDate);
    router.get('/tickets', APIController.getAllTickets);
    router.get('/ticket/:idTicket', APIController.getTicket);
    router.get('/getSeat/:idSC', APIController.getSeats);
    router.post('/create-ticket', APIController.createNewTicket);
    router.put('/update-ticket/:idTicket', APIController.updateTicket);
    router.delete('/delete-ticket/:idTicket', APIController.deleteTicket);
    router.get('/getTkByUser/:idUser', APIController.getTkByUser);
    router.get('/updateTkStatus', APIController.updateTkStatus);
    router.get('/updateStatusSchedule', APIController.updateStatusSchedule);
    router.post('/upload-film', upload.single('image'), APIController.handleUploadFileFilm);
    router.post('/upload-cinema', uploadCinema.single('logo'), APIController.handleUploadFileCinema);

    return app.use('/api/v1/', router);

}

export default initAPIRoute;