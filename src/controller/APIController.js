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

let getUser = async (req, res) => {
    let id = req.params.id;
    const user = await pool.execute('select * from users where id = ?', [id]);
    return res.status(200).json({
        message: 'ok',
        user: user[0],
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
    let id = req.params.id;
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);

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

let getFilm = async (req, res) => {
    let idFilm = req.params.idFilm;
    const film = await pool.execute('select * from films where idFilm = ?', [idFilm]);
    return res.status(200).json({
        message: 'ok',
        film: film[0],
    })
}

let createNewFilm = async (req, res) => {
    let { nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking } = req.body;
    if (!nameFilm || !author || !cast || !movieType || !time || !releaseDate || !image || !numberBooking) {
        return res.status(200).json({
            message: 'missing required params',
            result: false
        })
    }
    await pool.execute('insert into films(nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking) values (?, ?, ?, ?, ?, ?, ?, ?)', [nameFilm, author, cast, movieType, time, releaseDate, image, numberBooking]);
    return res.status(200).json({
        message: 'ok',
        result: true
    })
}

let updateFilm = async (req, res) => {
    let idFilm = req.params.idFilm;
    let { nameFilm, author, cast, movieType, time, releaseDate, image } = req.body;
    if (!nameFilm || !author || !cast || !movieType || !time || !releaseDate || !image) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update films set nameFilm = ?, author = ?, cast = ?, movieType = ?, time = ?, releaseDate = ?, image = ? where idFilm = ?', [nameFilm, author, cast, movieType, time, releaseDate, image, idFilm]);
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
            message: 'missing required params',
            result: false
        })
    }
    await pool.execute('insert into cinemas(showRoom, logo) values (?, ?)', [showRoom, logo]);
    return res.status(200).json({
        message: 'ok',
        result: true
    })
}

let updateCinema = async (req, res) => {
    let idCinema = req.params.idCinema;
    let { showRoom, logo } = req.body;
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

let getSchedule = async (req, res) => {
    const { idFilm, idCinema } = req.params;

    // Lấy ngày hiện tại
    // const currentDate = new Date();

    // console.log(currentDate);

    if (!idFilm || !idCinema) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    const [rows, fields] = await pool.execute('select * from schedules where idFilm = ? and idCinema = ?', [idFilm, idCinema]);

    const filteredSchedules = rows.filter(schedule => {
        // const scheduleDate = schedule.showDate.split(' ')[0];
        const scheduleDate = schedule.showDate;
        if (schedule.statusSC == 0) {
            // return [scheduleDate, schedule.idSC]
            return scheduleDate;
        }
    });
    res.status(200).json({
        message: 'ok',
        data: filteredSchedules,
    });
}

let createNewSchedule = async (req, res) => {
    let { idFilm, idCinema, showDate } = req.body;
    if (!idFilm || !idCinema || !showDate) {
        return res.status(200).json({
            message: 'missing required params',
            result: false
        })
    }

    await pool.execute('insert into schedules(idFilm, idCinema, showDate) values (?, ?, ?)', [idFilm, idCinema, showDate]);
    return res.status(200).json({
        message: 'ok',
        result: true
    })

}

let updateSchedule = async (req, res) => {
    let idSC = req.params.idSC;
    let { idFilm, idCinema, showDate } = req.body;

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

let getShowDate = async (req, res) => {
    let { idFilm } = req.body;
    if (!idFilm) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    const [rows, fields] = await pool.execute('SELECT showDate FROM schedules WHERE idFilm = ?', [idFilm]);
    const [row, field] = await pool.execute('SELECT idCinema FROM schedules WHERE idFilm = ?', [idFilm]);
    const [row1, field1] = await pool.execute('SELECT idSC FROM schedules WHERE idFilm = ?', [idFilm]);
    return res.status(200).json({
        message: 'ok',
        dataShowDate: rows,
        dataIdCinema: row,
        dataIdSC: row1
    })

}

let getAllTickets = async (req, res) => {
    const [rows, fields] = await pool.execute('select t.*, u.* from ticket t join users u on t.idUser = u.id');

    return res.status(200).json({
        message: 'ok',
        dataTickets: rows,
        result: true,
    })
}

let getTicket = async (req, res) => {
    let idTicket = req.params.idTicket;
    const ticket = await pool.execute('select * from ticket where idTicket = ?', [idTicket]);
    return res.status(200).json({
        message: 'ok',
        ticket: ticket[0],
    })
}

let getSeats = async (req, res) => {
    let idSC = req.params.idSC;
    const seats = await pool.execute('select seats from ticket where idSC = ?', [idSC]);
    return res.status(200).json({
        message: 'ok',
        seats: seats[0],
    })
}

let createNewTicket = async (req, res) => {
    let { idSC, idUser, cost, seats, pay, tkStatus } = req.body;
    const bookingDate = new Date().toISOString().split('T')[0];

    await pool.execute('insert into ticket(idSC, idUser, cost, seats, bookingDate, pay, tkStatus) values (?, ?, ?, ?, ?, ?, ?)', [idSC, idUser, cost, seats, bookingDate, pay, tkStatus]);
    return res.status(200).json({
        message: 'ok',
        result: true
    })
}


let updateTicket = async (req, res) => {
    let idTicket = req.params.idTicket;
    let { idSC, idUser, cost, seats, bookingDate, pay, tkStatus } = req.body;

    if (!idSC || !idUser || !cost || !seats || !bookingDate || !pay || !tkStatus) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update ticket set idSC = ?, idUser = ?, cost = ?, seats = ?, bookingDate = ?, pay = ?, tkStatus = ? where idTicket = ?', [idSC, idUser, cost, seats, bookingDate, pay, tkStatus, idTicket]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteTicket = async (req, res) => {
    let idTicket = req.params.idTicket;
    if (!idTicket) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from ticket where idTicket = ?', [idTicket]);
    return res.status(200).json({
        message: 'ok'
    })
}

let getTkByUser = async (req, res) => {
    let idUser = req.params.idUser;
    if (!idUser) {
        return res.status(200).json({
            message: 'missing required params',
            result: false
        })
    }
    const tk = await pool.execute('select t.*, s.*, f.* from ticket t join schedules s on t.idSC = s.idSC join films f on s.idFilm = f.idFilm where t.idUser = ?', [idUser]);

    return res.status(200).json({
        message: 'ok',
        result: true,
        dataTicket: tk[0]
    })
}

let updateTkStatus = async (req, res) => {
    const currentDate = new Date();
    const [rows, fields] = await pool.execute('select t.*, s.* from ticket t join schedules s on t.idSC = s.idSC');
    let tkStatus = 1;
    rows.map(async (row) => {
        if (row.showDate <= currentDate) {
            await pool.execute('update ticket set tkStatus = ? where idTicket = ?', [tkStatus, row.idTicket]);
        }
    })
    return res.status(200).json({
        message: 'ok',
    })
}

let updateStatusSchedule = async (req, res) => {
    const currentDate = new Date();
    const [rows, fields] = await pool.execute('SELECT * FROm `schedules`');
    let statusSC = 1;
    rows.map(async (row) => {
        if (row.showDate <= currentDate) {
            await pool.execute('update schedules set statusSC = ? where idSC = ?', [statusSC, row.idSC]);
        }
    })
    return res.status(200).json({
        message: 'ok',
    })

}

let handleUploadFileFilm = (req, res) => {
    if (req.fileValidationError) {
        return res.status(200).json(req.fileValidationError);
    }
    else if (!req.file) {
        return res.status(200).json({
            message: 'Please select an image to upload'
        });
    }

    else {
        return res.status(200).json({
            message: 'ok',
            fileUrl: `http://localhost:4000/image/${req.file.filename}`
        })
    }
}

let handleUploadFileCinema = (req, res) => {
    if (req.fileValidationError) {
        return res.status(200).json(req.fileValidationError);
    }
    else if (!req.file) {
        return res.status(200).json({
            message: 'Please select an image to upload'
        });
    }

    else {
        return res.status(200).json({
            message: 'ok',
            fileUrl: `http://localhost:4000/image/logo-cinemas/${req.file.filename}`
        })
    }
}

let searchFilm = async (req, res) => {
    const name = req.params.name;

    const [rows, fields] = await pool.execute('select * from films');

    if (name == '') {
        return res.status(200).json({
            message: 'name is empty'
        })
    }
    else {
        const films = rows.filter((film) =>
            film.nameFilm.toLowerCase().includes(name.toLowerCase())
        );

        if (films.length == 0) {
            return res.status(200).json({
                message: 'name is empty'
            })
        }
        else {
            return res.status(200).json({
                message: 'ok',
                films: films
            })
        }
    }
}

let nowFilm = async (req, res) => {
    // Lấy ngày đầu tuần (thứ 2)
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    // Lấy ngày cuối tuần (Chủ nhật)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Truy vấn danh sách phim đang khởi chiếu trong tuần
    const [rows, fields] = await pool.execute(`SELECT * FROM films WHERE releaseDate BETWEEN ? AND ?`, [firstDayOfWeek, lastDayOfWeek]);

    return res.status(200).json({
        message: 'ok',
        films: rows
    })

}

let futureFilm = async (req, res) => {
    const today = new Date();
    const [rows, fields] = await pool.execute('select * from films where releaseDate > ?', [today]);
    return res.status(200).json({
        message: 'ok',
        films: rows
    })
}

let sumTicket = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from ticket');
    // console.log(rows);
    const totalSales = rows.reduce((total, ticket) => total + ticket.cost, 0);
    // console.log(totalSales);
    const totalTicketsSold = rows.length;
    // console.log(totalTicketsSold);
    return res.status(200).json({
        message: 'ok',
        totalSales: totalSales,
        totalTicketsSold: totalTicketsSold
    })
}

module.exports = {
    getAllUsers,
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
    getAllFilms,
    getFilm,
    createNewFilm,
    updateFilm,
    deleteFilm,
    loginUser,
    getAllCinemas,
    createNewCinema,
    updateCinema,
    deleteCinema,
    getAllSchedules,
    getSchedule,
    createNewSchedule,
    updateSchedule,
    deleteSchedule,
    getShowDate,
    getAllTickets,
    getTicket,
    createNewTicket,
    updateTicket,
    deleteTicket,
    getSeats,
    getTkByUser,
    updateTkStatus,
    updateStatusSchedule,
    handleUploadFileFilm,
    handleUploadFileCinema,
    searchFilm,
    nowFilm,
    futureFilm,
    sumTicket
}