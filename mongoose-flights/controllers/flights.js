const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

// const show = (req, res) => {
//   Flight.findById(req.params.id) 
//   .populate('tick')
//   .exec((err, flight) => {
//     Ticket.find({flight: flight._id}, (err, tickets) => {
//       res.render('flights/show', { 
//         title: 'Flight Detail', flight, tickets});
//     })
//   })
// } 
  
function show(req, res, next) {
    Flight.findById(req.params.id, (err, flight) => {
      Ticket.find({flight: flight._id}, (err, tickets) => {
        res.render('flights/show', { 
          title: 'Flight Details', flight, tickets
      })
    })
  })
}


const newFlight = (req, res) => {
    res.render('flights/new', { title: 'Add Flight'});
}

const create = (req, res) => {
    console.log(req.body)
  for(let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  
    const flight = new Flight(req.body);
  flight.save(function(err) {
    // one way to handle errors
    if (err)
      return res.redirect('/flights/new');
    else {
      console.log(flight);
      res.redirect(`/flights/${flight._id}`);
    }
  });
}

const index = (req, res) => {
  console.log(req.body.airport)  
  Flight.find({}, (err, flights) =>{
        res.render('flights/index', { title: 'All Flights', flights });
    });
}

module.exports = {
    index,
    new: newFlight,
    create,
    show
}