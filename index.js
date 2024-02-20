import app from './app.js';

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
