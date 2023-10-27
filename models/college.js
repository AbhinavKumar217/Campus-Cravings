const mongoose = require('mongoose');
const Campground = require('./campground')
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    title: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    campgrounds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Campground'
        }
    ]
});



CollegeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Campground.deleteMany({
            _id: {
                $in: doc.campgrounds
            }
        })
    }
})

module.exports = mongoose.model('College', CollegeSchema);