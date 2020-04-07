const Ticket = require('../models/ticket');
const Flight = require('../models/flight')




const newTicket = (req, res) => {
    Flight.find({}, (err, flights)=>{
        Ticket.find({}, (err, tickets)=>{
            res.render('tickets/new', {
                title: "Add Ticket",
                tickets : tickets,
                flights : flights,
            })
        })

    })
   
}

const create = (req, res) => {
    const s = req.body.seat;
    console.log(req.body)
    Ticket.create(req.body, (err, ticket) =>{
     console.log(ticket) 
     console.log(flight.id)
        res.redirect(`/flights/${flight._id}`);
    })
}

function addToFlight(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        console.log(req.params.id)
        flight.tickets.push(req.body.ticketId)
        flight.save((err) => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

// const create = (req, res) => {
//     Flight.findById(req.params.id, (err, flight) => {
//           // associate ticket with the current flight
//           req.body.flight = req.params.id;
//           // create a new instance of a ticket with the req.body
//           let ticket = new Ticket(req.body);
//           // Save the ticket
//           ticket.save((err) => {
//             res.redirect(`/flights/${req.params.id}`);
//           });
//        });
//     }



module.exports = {
    new: newTicket,
    create,
    addToFlight,
};



