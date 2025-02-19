const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema(
  {
    columnId: { type: String, required: true, unique: true },
    type: { type: String, required: false },
    value: { type: mongoose.Schema.Types.Mixed, default: null },
    boardId: { type: String, required: true },
  },
  { timestamps: true }
);

const Column = mongoose.model('Column', ColumnSchema);
module.exports = Column;
