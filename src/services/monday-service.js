const initMondayClient = require('monday-sdk-js');
const logger = require('../../utils/logger');

const updateColumnValue = async (token, itemId, columnId, newValue, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion('2024-04');

    const mutation = `mutation change_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
      change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
        id
      }
    }`;

    const variables = { boardId, itemId, columnId, value: JSON.stringify(newValue) };

    const response = await mondayClient.api(mutation, { variables });
    logger.info(`Updated ${columnId} to ${newValue}:`, response.data);
    return response.data;
  } catch (error) {
    logger.error('Error updating column:', error);
    return null;
  }
};

const getColumnValue = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion('2024-04');

    const query = `query($itemId: [ID!]) {
      items(ids: $itemId) {
        id
        name
        column_values {
          id
          column {
          title
          }
          value
          text,
          type
        }
        board {
          id
          name
        }
      }
    }`;

    const variables = { itemId };

    const response = await mondayClient.api(query, { variables });

    const data = response.data.items[0];
    const columns = data.column_values.map((item) => ({
      ...item,
      title: item.column.title,
    }));

    return {
      ...data,
      column_values: columns,
    };
  } catch (error) {
    logger.error('Error fetching item details:', error);
    return null;
  }
};

module.exports = {
  updateColumnValue,
  getColumnValue,
};
