import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, password, address } = req.body;

    if (!firstName || !lastName || !email || !password || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, password, address) values (?, ?, ?, ?, ?) ', [firstName, lastName, email, password, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, password, address, id } = req.body;

    if (!firstName || !lastName || !email || !password || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, password = ?, address = ? where id = ?', [firstName, lastName, email, password, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;

    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('delete from users where id = ?', [userId]);

    return res.status(200).json({
        message: 'ok'
    })
}

let getAllFilms = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `films`');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewFilm = async (req, res) => {
    let { nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking } = req.body;
    if (!nameFilm || !author || !cast || !movieType || !time || !releaseDate || !image || !numberBooking) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('insert into films(nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking) values (?, ?, ?, ?, ?, ?, ?, ?)', [nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateFilm = async (req, res) => {
    let { nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking, idFilm } = req.body;
    if (!nameFilm || !author || !cast || !movieType || !time || !releaseDate || !image || !numberBooking || !idFilm) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update films set nameFilm = ?, author = ?, cast = ?, movieType = ?, time = ?, releaseDate = ?, image = ?, numberBooking = ? where idFilm = ?', [nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking, idFilm]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteFilm = async (req, res) => {
    let idFilm = req.params.idFilm;
    if (!idFilm) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from films where idFilm = ?', [idFilm]);
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getAllFilms,
    createNewFilm,
    updateFilm,
    deleteFilm
}