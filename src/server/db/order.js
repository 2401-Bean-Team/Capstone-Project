const db = require('./client')

// -create neworder, -getorder function,
// updateorders (patch: shipping-address, status),

const createOrder = async ({ userId, address, status }) => {
    try{
      const { rows: [ order ] } = await db.query(`
        INSERT INTO orders("userId", address, status)
        VALUES ($1, $2, $3)
        RETURNING *`, [ userId, address, status ]);
        return order;
    } catch (err) {
        throw err;
      }
    }

const getOrder = async ({ userId }) => {
    try{
      const { rows } = await db.query(`
        SELECT * FROM orders
        WHERE userId=$1
        `, [ userId ]);
        return rows;
    } catch (err) {
        throw err;
      }
    }

const updateAddress = async (orderId, address) => {
    try{
        const { rows } = await db.query(`
        UPDATE orders
        SET address=$2
        WHERE  id= $1
        RETURNING *
        `, [ orderId, address ]);
        return rows;
    } catch (err) {
        throw err;
        }
    }

const updateStatus = async (orderId, status) => {
    try{
        const { rows } = await db.query(`
        UPDATE orders
        SET status=$2
        WHERE id= $1
        RETURNING *
        `, [ orderId, status ]);
        return rows;
    } catch (err) {
        throw err;
        }
    }

module.exports = {
createOrder,
getOrder,
updateAddress,
updateStatus
}
