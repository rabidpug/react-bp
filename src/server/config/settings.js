const { PASSPORT_SECRET = 'secret', } = process.env;
const settings = { secret: PASSPORT_SECRET, };

export default settings;
