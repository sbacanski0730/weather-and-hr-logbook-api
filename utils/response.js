const response = (status, message, content) => {
	return {
		status: status,
		message: message,
		content: content,
	};
};

export default response;
