const db = require('./client')
//add product to order function,
//delete function single(to delete from cart)
//delete all function (clear cart by order ID)
// update quantity function

const addProduct = async ({ orderId, productId, quantity }) => {
    try{
        const { rows: [cart] } = await db.query(`
        INSERT INTO order_product ("orderId", "productId", quantity)
        VALUES($1, $2, $3)
        RETURNING *`, [orderId, productId, quantity]);
        return cart
    } catch (err){
        throw err;
    }
}


const deleteCartSingle = async ({ orderId, productId }) => {
    try{
        const { row } = await db.query(`
        DELETE FROM order_product
        WHERE "orderId" = $1 AND "productId" = $2`, [ orderId, productId])
    } catch (err){
        throw err;
    }
}

const deleteCart = async ({ orderId }) => {
    try{
        const { row } = await db.query(`
        DELETE FROM order_product
        WHERE "orderId" = $1`, [ orderId ])
    } catch (err){
        throw (err)
    }
}

const updateQuantity = async ({ orderId, productId, quantity }) => {
    try{
        const { rows } = await db.query(`
        UPDATE order_product
        SET quantity = $3
        WHERE "orderId" = $1 AND "productId" = $2
        RETURNING *
        `, [ orderId, productId, quantity ])
        return rows[0];

    }catch (err){
        throw err;
    }
}

const getOrderItems = async ({ orderId }) => { 
    try{
      const { rows } = await db.query(`
        SELECT * FROM order_product
        WHERE "orderId" = $1
        `, [ orderId ]);
        return rows;
    } catch (err) {
        throw err;
      }
    }

module.exports = {
    addProduct,
    deleteCartSingle,
    deleteCart,
    updateQuantity,
    getOrderItems
}
