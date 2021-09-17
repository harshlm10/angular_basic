const mongoose = require('mongoose')
const slugify = require('slugify')

const EventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: [true, 'Please provide Event Name'],
        trim: true,
        maxlength: [200, 'Event name Cannot be more than 200 characters']
    },
    slug: String,
    lower_event_name: {
        type: String,
        required: [true, 'Please provide Event Name'],
        trim: true,
        maxlength: [200, 'Event name Cannot be more than 200 characters']
    },
    event_time: {
        type: String,
        required: [true, 'Please Provide Event timing'],
        maxlength: [20, 'event time cannot be more than 20 characters']
    },
    event_date: {
        type: String,
        required: [true, 'Please Provide Event Date'],
        maxlength: [15, 'data cannot be more than 15 characters']
    },
    event_description: {
        type: String,
        required: [true, 'Please provide Event Description'],
        maxlength: [1000, 'Description Cannot be more than 1000 characters']
    },
    host_name: {
        type: String,
        required: [true, 'Please provide host name'],
        trim: true,
        maxlength: [50, 'host name Cannot be more than 50 characters']
    },
    lower_host_name: {
        type: String,
        required: [true, 'Please provide host name'],
        trim: true,
        maxlength: [50, 'host name Cannot be more than 50 characters']
    },
    host_bio: {
        type: String,
        trim: true,
        maxlength: [500, `host bio cannot be more than 500 characters`]
    },
    event_url: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please provide a valid URL with HTTP or HTTPS']
    },
    event_address: {
        type: String,
    },
    event_type: {
        type: String
    },
    phone_code: {
        type: String,
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    audience: {
        type: Number,
    },
    host_rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    attending: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Create bootcamp slug from the name
//improves SEO and client-side routing
EventSchema.pre('save', function (next) {
    //console.log('slugify ran' , this.event_name);
    this.slug = slugify(this.event_name, { lower: true })
    next()
})

module.exports = mongoose.model('Event', EventSchema);