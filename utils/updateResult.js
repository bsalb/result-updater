const axios = require('axios');

const updateColumnValue = async (itemId, columnId, newValue, boardId) => {
  const mutation = `
        mutation {
            change_column_value(
                board_id: ${boardId}, 
                item_id: ${itemId}, 
                column_id: "${columnId}", 
                value: "${newValue}"
            ) {
                id
            }
        }
    `;

  try {
    const response = await axios.post(
      process.env.MONDAY_API_URL,
      { query: mutation },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.MONDAY_API_TOKEN,
        },
      }
    );

    console.log(`Updated ${columnId} to ${newValue}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating column:', error.response?.data || error.message);
    return null;
  }
};

const getItemDetails = async (itemId) => {
  console.log('id', itemId);
  const query = `
          query {
              items (ids: [${itemId}]) {
                  id
                  name
                  column_values {
                      id
                      text 
                      value
               
                  }
                  board {
                      id
                      name
                  }
              }
          }
      `;

  try {
    const response = await axios.post(
      process.env.MONDAY_API_URL,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.MONDAY_API_TOKEN,
        },
      }
    );

    return response.data.data.items[0]; // Return item details
  } catch (error) {
    console.error('Error fetching item details:', error.response?.data || error.message);
    return null;
  }
};

module.exports = {
  updateColumnValue,
  getItemDetails,
};
