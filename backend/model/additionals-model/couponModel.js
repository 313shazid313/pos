const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0, 
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usageLimit: {
    type: Number,
    default: 1,
  },
  timesUsed: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, 
});


couponSchema.pre('save', function (next) {
  if (this.expiryDate < new Date()) {
    this.isActive = false;
  }
  next();
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
