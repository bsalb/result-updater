const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  text: { type: String },
  type: { type: String, required: true },
});

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  columns: [ColumnSchema],
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
