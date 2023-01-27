import mongoose from 'mongoose';

const connectDatabase = callback => {
	mongoose.set('strictQuery', false);
	let connectionURL = '';

	if (process.env.PROJECT_STATUS === ('dev' || 'development')) {
		connectionURL = process.env.CONNECTION_URL.replace('<clusterName>', 'dev');
	}
	if (process.env.PROJECT_STATUS === ('prod' || 'production')) {
		connectionURL = process.env.CONNECTION_URL.replace('<clusterName>', 'production');
	}

	mongoose.connect(connectionURL, callback());
};

export default connectDatabase;
