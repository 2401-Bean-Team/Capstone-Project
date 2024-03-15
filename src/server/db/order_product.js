const db = require('./client')
//add product to order function,
//delete function single(to delete from cart)
//delete all function (clear cart by order ID)
// update quantity function

const addProduct = async ({ orderId, productId, quantity }) => {
    try{
        const { row: [cart ] } = await db.query(`
        SELECT * FROM productId;
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
        WHERE id = $1, productId = $2`, [ orderId, productId])
    } catch (err){
        throw err;
    }
}

const deleteCart = async ({ orderId }) => {
    try{
        const { row } = await db.query(`
        DELETE FROM order_product
        WHERE id = $1`, [ orderId ])
    } catch (err){
        throw (err)
    }
}

const updateQuantity = async ({ orderId, productId, quantity }) => {
    try{
        const { row } = await db.query(`
        UPDATE order_product
        SET quantity = $3
        WHERE id = $1, productId = $2
        RETURNING *
        `, [ orderId, productId, quantity ])
        return row

    }catch (err){
        throw err;
    }
}

module.exports = {
    addProduct,
    deleteCartSingle,
    deleteCart,
    updateQuantity
}
