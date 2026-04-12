const notFound = (req, res) => res.status(404).send("The Route Does not exist");

module.exports = notFound;
