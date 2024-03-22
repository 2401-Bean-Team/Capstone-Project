const db = require('./client')

const createProduct = async ({ name='coffee', price, description, roast, image }) => {
try{
  const { rows: [product ] } = await db.query(`
    INSERT INTO products(name, price, description, roast, image)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, [name, price, description, roast, image]);
    return product;
} catch (err) {
    throw err;
  }
}

const getProducts = async () => {
try{
  const { rows } = await db.query(`
    SELECT * FROM products;
  `)
    return rows;
} catch (err) {
    throw err;
  }
}


const getProductById = async (productId) => {
try{
    const { rows: [row] } = await db.query(`
    SELECT * FROM products
    WHERE id = $1`, [productId]);
    return row;
} catch (err) {
   throw err;
  }
}


const editProduct = async (newValues) => {
try{
    
    const { id, name, price, description, roast, image } = newValues
    const { rows: [editedProduct] } = await db.query(`
      UPDATE products
      SET name = $2, price = $3, description = $4, roast = $5, image = $6
      WHERE id = $1
      RETURNING *`, [id, name, price, description, roast, image]);
    return editedProduct
  } catch (err) {
    throw err;
  }
}


const deleteProduct = async (productId) => {
try{
  await db.query(`
    DELETE FROM products
    WHERE id = $1`, [productId])
    } catch (err) {
    throw err;
  }
}



module.exports = {
createProduct,
getProducts,
getProductById,
editProduct,
deleteProduct
}
