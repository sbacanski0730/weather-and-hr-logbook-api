const User = require('../models/userModel.js');
const isUserExist = async id => {
	if (!(await User.findById(id))) {
		return false;
	}
	return true;
};

module.exports = isUserExist;
