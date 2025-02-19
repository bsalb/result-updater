const logger = require('../../utils/logger');
const Column = require('../models/column.schema');

const saveOrUpdateColumn = async (columnData) => {
  try {
    const { columnId, title, type, value, boardId } = columnData;

    const existingColumn = await Column.findOne({ columnId });

    if (existingColumn) {
      existingColumn.value = value;
      existingColumn.type = type;
      existingColumn.boardId = boardId;

      await existingColumn.save();

      logger.info(`Column ${columnId} updated successfully.`);
      return existingColumn;
    } else {
      const newColumn = new Column({ columnId, title, type, value, boardId });

      await newColumn.save();

      logger.info(`Column ${columnId} saved successfully.`);
      return newColumn;
    }
  } catch (error) {
    logger.error('Error saving/updating column:', error);
    throw error;
  }
};

module.exports = { saveOrUpdateColumn };
