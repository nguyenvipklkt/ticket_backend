import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user', APIController.createNewUser);
    router.put('/update-user', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);
    router.get('/films', APIController.getAllFilms);
    router.post('/create-film', APIController.createNewFilm);
    router.put('/update-film', APIController.updateFilm);
    router.delete('/delete-film/:idFilm', APIController.deleteFilm);
    router.post('/login', APIController.loginUser);
    router.get('/cinemas', APIController.getAllCinemas);
    router.post('/create-cinema', APIController.createNewCinema);
    router.put('/update-cinema', APIController.updateCinema);
    router.delete('/delete-cinema/:idCinema', APIController.deleteCinema);
    router.get('/schedules', APIController.getAllSchedules);
    router.post('/create-schedule', APIController.createNewSchedule);
    router.put('/update-schedule', APIController.updateSchedule);
    router.delete('/delete-schedule/:idSC', APIController.deleteSchedule);


    return app.use('/api/v1/', router);

}

export default initAPIRoute;