const Event = require('../models/Event')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc get all Events
// @route GET /api/v1/events
// @access Public(No token Needed)
exports.getEvents = asyncHandler(async (req, res, next) => {
    let query = {};
    if (req.query.ename)
        query.lower_event_name = req.query.ename
    if (req.query.hname)
        query.lower_host_name = req.query.hname
    if (req.query.etype)
        query.event_type = req.query.etype
    if (req.query.urtng)
        query.host_rating = { '$gt': parseInt(req.query.urating) }
    if (req.query.audcnt)
        query.audience = { '$gt': parseInt(req.query.audcnt) }
    if (req.query.atnd)
        query.attending = req.query.atnd
    console.log(query)
    const events = await Event.find(query)
    return res.status(200).
        json({ success: true, count: events.length, data: events })
})

// @desc get Single Event
// @route GET /api/v1/events:id
// @access Public(No token Needed)
exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id)

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with ID of ${req.params.id}`, 404)
        )
    }

    res.status(200).
        json({ success: true, data: event })
})
// @desc create new Event
// @route POST /api/v1/events
// @access Private
exports.createEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.create(req.body)

    res.status(201).
        json({ success: true, data: event })
})

// @desc Update Event
// @route PUT /api/v1/events:id
// @access Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with ID of ${req.params.id}`, 404)
        )
    }

    res.status(200).
        json({ success: true, data: event })
})

// @desc delete Event
// @route DELETE /api/v1/events:id
// @access Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with ID of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        message: `${event.event_name} has been deleted`,
        data: {}
    })
})