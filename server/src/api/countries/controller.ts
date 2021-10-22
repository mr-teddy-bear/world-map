const getCountriesController = async (req, res) => {
  try {
    const query = req.query;

    res.json(query);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export { getCountriesController };
