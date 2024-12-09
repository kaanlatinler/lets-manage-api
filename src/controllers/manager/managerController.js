const { Business, Manager } = require("../../models/index");

exports.GetManagerDetails = async (req, res) => {
  const { ManagerId } = req.user;

  try {
    const manager = await Manager.findByPk(ManagerId, {
      include: [
        {
          model: Business,
        },
      ],
    });
    res.status(200).json({ manager, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
