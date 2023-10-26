const service = require("./reservations.service");

async function create(req, res, next) {
  const reservation = req.body.data;
  try {
    const newReservation = await service.create(reservation);
    res.status(201).json({ data: newReservation });
  } catch (error) {
    next(error);
  }
}

async function list(req, res) {
  const { date } = req.query;
  const reservations = await service.list(date);
  res.json({ data: reservations });
}


module.exports = {
  create,
  list,
};