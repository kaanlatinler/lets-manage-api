const { Subscription } = require("../../models/index");

exports.GetSubs = async (req, res) => {
  try {
    const subs = await Sub.findAll();
    res.status(200).json({ subs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.GetSub = async (req, res) => {
  const { id } = req.params;
  try {
    const sub = await Sub.findByPk(id);
    res.status(200).json({ sub, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.CreateSub = async (req, res) => {
  const { SubName, SubPrice, SubDuration, SubDescription } = req.body;

  try {
    const sub = await Sub.create({
      SubName,
      SubPrice,
      SubDuration,
      SubDescription,
    });
    res.status(201).json({ sub, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
