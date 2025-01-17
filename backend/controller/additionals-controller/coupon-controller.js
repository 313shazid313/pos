const Coupon = require("../models/Coupon"); // Adjust path as per your project structure

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate, usageLimit } = req.body;

    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      usageLimit,
    });

    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating coupon", error: error.message });
  }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coupons", error: error.message });
  }
};

// Get a single coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coupon", error: error.message });
  }
};

// Update a coupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const coupon = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon updated successfully", coupon });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating coupon", error: error.message });
  }
};

// Delete a coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting coupon", error: error.message });
  }
};

// Apply a coupon (validate and check usage)
const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Check if coupon is active and not expired
    if (!coupon.isActive || coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon is expired or inactive" });
    }

    // Check if coupon usage limit has been reached
    if (coupon.timesUsed >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    // Increment the times used
    coupon.timesUsed += 1;

    // Deactivate coupon if usage limit is reached
    if (coupon.timesUsed >= coupon.usageLimit) {
      coupon.isActive = false;
    }

    await coupon.save();

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: coupon.discount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error applying coupon", error: error.message });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
