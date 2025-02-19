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

    const { board, column_values } = data;

    const number = parseFloat(column_values[0].text) || 0;

    const newResult = number * 5;

    const result = {
      columnId: column_values[1].id,
      text: newResult,
      value: newResult,
      boardId: board.id,
      type: column_values[1].type,
    };

    const response = await mondayService.updateColumnValue(
      shortLivedToken,
      itemId,
      column_values[1].id,
      newResult,
      board.id
    );

    if (response) {
      await saveOrUpdateColumn(result);

      res.json({ success: true });
    }
  } catch (error) {}
}

module.exports = {
  updateResult,
};
