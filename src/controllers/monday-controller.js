const logger = require('../../utils/logger');
const { saveOrUpdateColumn } = require('../services/column-service');
const mondayService = require('../services/monday-service');

async function updateResult(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const {
      inputFields: { itemId },
    } = payload;

    const data = await mondayService.getColumnValue(shortLivedToken, itemId);

    const { board, column_values, name } = data;

    const numberColumn = column_values.find(({ title }) => title === 'Numbers');
    const resultColumn = column_values.find(({ title }) => title === 'Result');

    const number = parseFloat(numberColumn.text) || 0;

    const newResult = number * 5;

    const result = {
      ...resultColumn,
      text: newResult,
      value: newResult,
    };

    const existingColumns = column_values.filter((column) => column.id !== resultColumn.id);

    const columns = [...existingColumns, result];

    const response = await mondayService.updateColumnValue(shortLivedToken, itemId, result.id, result.value, board.id);

    if (response) {
      const data = {
        id: itemId,
        name,
        columns,
      };

      await saveOrUpdateColumn(data);

      res.json({ success: true });
    }
  } catch (error) {
    logger.error('failed to update result');
  }
}

module.exports = {
  updateResult,
};
