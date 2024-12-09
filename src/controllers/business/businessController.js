const {
  Business,
  Manager,
  Table,
  Employee,
  Product,
  CheckOut,
} = require("../../models/index");

exports.GetBusinessDetails = async (req, res) => {
  const { BusinessName } = req.params;
  const { ManagerId } = req.user;

  try {
    const business = await Business.findOne({
      where: {
        BusinessName,
        ManagerId,
      },
      include: [
        {
          model: Employee,
        },
        {
          model: Table,
        },
        {
          model: Product,
        },
        {
          model: CheckOut,
        },
        {
          model: Manager,
        },
      ],
    });

    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    res.status(200).json({ business, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.CreateBusiness = async (req, res) => {
  const {
    BusinessName,
    BusinessEmail,
    BusinessPhone,
    BusinessAddress,
    BusinessDescription,
  } = req.body;

  const { ManagerId } = req.user;

  try {
    const business = await Business.create({
      BusinessName,
      BusinessEmail,
      BusinessPhone,
      BusinessAddress,
      BusinessDescription,
      ManagerId,
    });
    res.status(200).json({ business, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.UpdateBusiness = async (req, res) => {
  const { Bname } = req.params;
  const { ManagerId } = req.user;

  const {
    BusinessName,
    BusinessEmail,
    BusinessPhone,
    BusinessAddress,
    BusinessDescription,
  } = req.body;

  try {
    const business = await Business.update(
      {
        BusinessName,
        BusinessEmail,
        BusinessPhone,
        BusinessAddress,
        BusinessDescription,
      },
      {
        where: {
          BusinessName: Bname,
          ManagerId,
        },
      }
    );
    res.status(200).json({ business, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.DeleteBusiness = async (req, res) => {
  const { Bname } = req.params;
  const { ManagerId } = req.user;

  try {
    const business = await Business.destroy({
      where: {
        businessName: Bname,
        ManagerId,
      },
    });
    res.status(200).json({ business, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.GetBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({
      include: [
        {
          model: Employee,
        },
        {
          model: Table,
        },
        {
          model: Product,
        },
        {
          model: CheckOut,
        },
        {
          model: Manager,
        },
      ],
    });

    // Her business için toplamları hesaplayacağız
    const businessesWithTotals = await Promise.all(
      businesses.map(async (business) => {
        // BusinessId'ye göre CheckOutTotal toplamını al
        const totalCheckOutSumByBusinessId = await CheckOut.sum(
          "CheckOutTotal",
          {
            where: { BusinessId: business.BusinessId },
          }
        );

        return {
          ...business.toJSON(),
          totalCheckOutByBusinessId: totalCheckOutSumByBusinessId,
        };
      })
    );

    // Manager bazlı toplam CheckOut hesaplama
    const managerCheckOutTotals = await Promise.all(
      businesses.map(async (business) => {
        if (business.ManagerId) {
          // Manager'in sahip olduğu tüm işletmeleri al
          const managerBusinesses = await Business.findAll({
            where: { ManagerId: business.ManagerId },
          });

          // Bu işletmelerin BusinessId'lerine göre CheckOut toplamlarını al
          const businessIds = managerBusinesses.map((b) => b.BusinessId);
          const totalCheckOutForManager = await CheckOut.sum("CheckOutTotal", {
            where: { BusinessId: businessIds },
          });

          return {
            managerId: business.ManagerId,
            totalCheckOut: totalCheckOutForManager,
          };
        }
      })
    );

    res.status(200).json({
      businesses: businessesWithTotals,
      managerTotals: managerCheckOutTotals,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
