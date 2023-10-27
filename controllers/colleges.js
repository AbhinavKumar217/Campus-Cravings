const College = require('../models/college');

module.exports.collegeIndex = async (req, res) => {
    const colleges = await College.find({});
    res.render('colleges/index', { colleges })
}

module.exports.renderNewCollegeForm = (req, res) => {
    res.render('colleges/new');
}

module.exports.createCollege = async (req, res, next) => {
    const college = new College(req.body.college);
    college.author = req.user._id;
    await college.save();
    console.log(college);
    req.flash('success', 'Successfully added a new college!');
    res.redirect(`/colleges/${college._id}`)
}

module.exports.showCollege = async (req, res,) => {
    const college = await College.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!college) {
        req.flash('error', 'Cannot find that college!');
        return res.redirect('/colleges');
    }
    res.render('colleges/show', { college });
}

module.exports.renderEditCollegeForm = async (req, res) => {
    const { id } = req.params;
    const college = await College.findById(id)
    if (!college) {
        req.flash('error', 'Cannot find that college!');
        return res.redirect('/colleges');
    }
    res.render('colleges/edit', { college });
}

module.exports.updateCollege = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const college = await College.findByIdAndUpdate(id, { ...req.body.college });
    await college.save();
    req.flash('success', 'Successfully updated college!');
    res.redirect(`/colleges/${college._id}`)
}

module.exports.deleteCollege = async (req, res) => {
    const { id } = req.params;
    await College.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/colleges');
}