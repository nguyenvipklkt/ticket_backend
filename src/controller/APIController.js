import { json } from "body-parser";
import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.status(200).json({
        message: 'ok',
        data: rows,
        result: true,
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, password, address } = req.body;

    if (!firstName || !lastName || !email || !password || !address) {
        return res.status(422).json({
            message: 'missing required params',
            result: false
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, password, address) values (?, ?, ?, ?, ?) ', [firstName, lastName, email, password, address]);

    return res.status(200).json({
        message: 'ok',
        result: true
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
        dataFilm: rows
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

let loginUser = async (req, res) => {
    const { email, passwordIn } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        // const allEmail = await pool.excute('select email from users', [allEmail]);
        // if (emailIn == allEmail) {
        const password = await pool.execute('select password from users where email = ?', [email]);
        const [row, field] = await pool.execute('select * from users where email = ?', [email]);
        console.log(password);
        // console.log(id);
        // console.log(firstName);
        const pass = JSON.stringify(password[0]).toString();

        const checkPasswordIn = `[{"password":"${passwordIn}"}]`;
        // Kiểm tra mật khẩu
        if (pass == checkPasswordIn) {
            var user = {
                id: row[0].id,
                firstName: row[0].firstName,
                email: row[0].email,
                lastName: row[0].lastName,
                address: row[0].address,
            };
            res.status(200).json({
                message: 'Đăng nhập thành công!',
                user: user,
                result: true
            });
        } else {
            res.status(422).json({ message: 'Thông tin đăng nhập không hợp lệ!', user: null, result: false });
        }
        // } else {
        //     res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ!' });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi!' });
    }
}

let getAllCinemas = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `cinemas`');

    return res.status(200).json({
        message: 'ok',
        dataCinema: rows,
        result: true,
    })
}

let createNewCinema = async (req, res) => {
    let { showRoom, logo } = req.body;
    if (!showRoom || !logo) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('insert into cinemas(showRoom, logo) values (?, ?)', [showRoom, logo]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateCinema = async (req, res) => {
    let { showRoom, logo, idCinema } = req.body;
    if (!showRoom || !logo || !idCinema) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update cinemas set showRoom = ?, logo = ? where idCinema = ?', [showRoom, logo, idCinema]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteCinema = async (req, res) => {
    let idCinema = req.params.idCinema;
    if (!idCinema) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from cinemas where idCinema = ?', [idCinema]);
    return res.status(200).json({
        message: 'ok'
    })
}

let getAllSchedules = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `schedules`');

    return res.status(200).json({
        message: 'ok',
        dataSchedules: rows,
        result: true,
    })
}

let createNewSchedule = async (req, res) => {
    let { idFilm, idCinema, showDate } = req.body;
    if (!idFilm || !idCinema || !showDate) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into schedules(idFilm, idCinema, showDate) values (?, ?, ?)', [idFilm, idCinema, showDate]);
    return res.status(200).json({
        message: 'ok',
    })

}

let updateSchedule = async (req, res) => {
    let { idFilm, idCinema, showDate, idSC } = req.body;

    if (!idSC || !idFilm || !idCinema || !showDate) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update schedules set idFilm = ?, idCinema = ?, showDate = ? where idSC = ?', [idFilm, idCinema, showDate, idSC]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteSchedule = async (req, res) => {
    let idSC = req.params.idSC;
    if (!idSC) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from schedules where idSC = ?', [idSC]);
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
    deleteFilm,
    loginUser,
    getAllCinemas,
    createNewCinema,
    updateCinema,
    deleteCinema,
    getAllSchedules,
    createNewSchedule,
    updateSchedule,
    deleteSchedule
}