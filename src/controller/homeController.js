import pool from "../configs/connectDB";
import multer from "multer";


let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    const [rowsFilm, fieldsFilm] = await pool.execute('SELECT * FROM `films`');

    return res.render('index.ejs', { dataUser: rows, dataFilm: rowsFilm })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let user = await pool.execute(`select * from users where id = ?`, [userId]);

    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req, res) => {
    console.log('check req: ', req.body);
    let { firstName, lastName, email, password, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, password, address) values (?, ?, ?, ?, ?) ', [firstName, lastName, email, password, address]);
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    return res.render('update.ejs', { dataUser: user[0] })
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, password, address, id } = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, password = ?, address = ? where id = ?', [firstName, lastName, email, password, address, id]);
    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMutipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

let getDetailFilm = async (req, res) => {
    let idFilm = req.params.idFilm;
    let film = await pool.execute(`select * from films where idFilm = ?`, [idFilm]);

    return res.send(JSON.stringify(film[0]))
}

let createNewFilm = async (req, res) => {
    console.log('check req: ', req.body);
    let { nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking } = req.body;
    await pool.execute('insert into films(nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking) values (?, ?, ?, ?, ?, ?, ?, ?) ', [nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking]);
    return res.redirect('/')
}

let deleteFilm = async (req, res) => {
    let idFilm = req.body.idFilm;
    await pool.execute('delete from films where idFilm = ?', [idFilm]);
    return res.redirect('/')
}

let getEditFilm = async (req, res) => {
    let idFilm = req.params.idFilm;
    let [film] = await pool.execute('select * from films where idFilm = ?', [idFilm]);
    return res.render('updateFilm.ejs', { dataFilm: film[0] })
}

let postUpdateFilm = async (req, res) => {
    let { nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking, idFilm } = req.body;
    await pool.execute('update films set nameFilm = ?, author = ?, cast = ?, movieType = ?, time = ?, releaseDate = ?, image = ?, numberBooking = ? where idFilm = ?', [nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking, idFilm]);
    return res.redirect('/')
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMutipleFiles,
    getDetailFilm,
    createNewFilm,
    deleteFilm,
    getEditFilm,
    postUpdateFilm
}