const subscription = require("../Model/SubscriptionModel");

const createSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(403).json({
        success: false,
        mess: "Email is required",
      });
    }
    const data = await subscription.create({
      email,
    });

    res.status(200).json({
      success: true,
      mess: "Subscription created",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

const getSubscription = async (req, res) => {
  try {
    const data = await subscription.find().sort({ createdAt: -1 });
 
    res.status(200).json({
      success: true,
      mess: "Subscription found",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

module.exports = {
  createSubscription,
  getSubscription
};