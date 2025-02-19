const logger = require('../../utils/logger');
const Item = require('../models/column.schema');

const saveOrUpdateColumn = async (data) => {
  try {
    let item = await Item.findOne({ id: data.id });

    if (!item) {
      item = new Item({
        ...data,
      });
    } else {
      data.columns.forEach((col) => {
        const columnIndex = item.columns.findIndex((c) => c.id === col.id);

        if (columnIndex !== -1) {
          item.columns[columnIndex] = col;
        } else {
          item.columns.push(col);
        }
      });
    }

    await item.save();
    logger.info('Success');
    return item;
  } catch (error) {
    logger.error('Error saving or updating item:', error);
    throw error;
  }
};

module.exports = { saveOrUpdateColumn };
