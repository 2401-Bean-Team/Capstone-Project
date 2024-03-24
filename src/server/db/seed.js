const db = require('./client');
const { createUser } = require('./users');
const { createAdminUser } = require('./users');
const { createProduct } = require('./product')
const { createOrder } = require( './order' )
const { addProduct } = require( './order_product' )

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];

const adminUsers = [
  {
    name: 'Admin User',
    password: 'beans',
  },
];

const products = [
  {
    name: "Sunrise Blend",
    price: "19.99",
    description: "Start your day with this vibrant blend of light and medium roast beans, offering a smooth and energizing flavor profile with hints of citrus and floral notes.",
    roast: "Light/Medium",
    image: "https://pbs.twimg.com/media/GJH6kFZbcAAHbXt?format=png&name=small",
  },
  {
    name: "Mountain Mocha",
    price: "19.99",
    description: "Crafted from beans grown at high altitudes, this medium-dark roast delivers a bold and rich taste, featuring deep chocolate undertones and a satisfyingly smooth finish.",
    roast: "Medium/Dark",
    image: "https://pbs.twimg.com/media/GJH5Ur8aIAAINNs?format=png&name=small",
  },
  {
    name: "Golden Sunrise",
    price: "19.99",
    description: "Wake up to the golden hues of this light roast, boasting a delicate aroma and a lively flavor profile characterized by fruity and floral notes, reminiscent of a crisp morning breeze.",
    roast: "Light",
    image: "https://pbs.twimg.com/media/GJH6py-aEAAsxl9?format=png&name=small",
  },
  {
    name: "Midnight Espresso",
    price: "19.99",
    description: "Indulge in the deep, intense flavors of this dark roast espresso blend, with its robust body, bold aroma, and bittersweet chocolate overtones, perfect for a late-night pick-me-up.",
    roast: "Dark",
    image: "https://pbs.twimg.com/media/GJH6mF0acAAg19T?format=png&name=small",
  },
  {
    name: "Harvest Haze",
    price: "19.99",
    description: "Embrace the warmth of autumn with this medium roast blend, offering a comforting blend of caramelized sweetness, nutty undertones, and a hint of spice, reminiscent of a cozy harvest gathering.",
    roast: "Medium",
    image: "https://pbs.twimg.com/media/GJH6ovfbEAAaxGL?format=png&name=small",
  },
  {
    name: "Tropical Sunrise",
    price: "19.99",
    description: "Transport yourself to a tropical paradise with this exotic blend of light and medium roast beans, featuring bright and fruity flavors, accented by hints of coconut and pineapple, for a taste of sunshine in every cup.",
    roast: "Light/Medium",
    image: "https://pbs.twimg.com/media/GJH6iyIaUAAMuss?format=png&name=small",
  },
  {
    name: "Silken Sunset",
    price: "19.99",
    description: "Unwind with the smooth and velvety texture of this medium-dark roast, boasting a rich caramel sweetness, subtle hints of toasted almonds, and a lingering finish that evokes the tranquility of a peaceful sunset.",
    roast: "Medium/Dark",
    image: "https://pbs.twimg.com/media/GJH6lLSaUAAGu8E?format=png&name=small",
  },
  {
    name: "Fireside Reserve",
    price: "19.99",
    description: " Cozy up by the fireplace with this bold and robust dark roast, offering deep, smoky flavors, earthy undertones, and a touch of spice, reminiscent of a crackling fire on a chilly evening.",
    roast: "Dark",
    image: "https://pbs.twimg.com/media/GJH6qxJasAAYvUt?format=png&name=small",
  },
  {
    name: "Moonlight Mocha",
    price: "19.99",
    description: " Savor the velvety smoothness of this medium-dark roast mocha blend, featuring decadent chocolate flavors, balanced by subtle undertones of toasted nuts and a hint of sweetness, for a luxurious coffee experience under the moonlight.",
    roast: "Medium/Dark",
    image: "https://pbs.twimg.com/media/GJH7UEEaQAAfPBl?format=png&name=small",
  },
  {
    name: "Artisanal Amber",
    price: "19.99",
    description: " Discover the artisanal craftsmanship of this light roast blend, characterized by its vibrant amber color, delicate floral aroma, and complex flavor profile, showcasing notes of honey, jasmine, and citrus zest, for a truly refined coffee experience.",
    roast: "Light",
    image: "https://pbs.twimg.com/media/GJH6rhmbEAAQVk-?format=png&name=small",
  },

]

const orders = [
  {
    userId: "1",
    address: "123 sesame street, USA",
    status: true
  },
  {
    userId: "2",
    address: "456 cinnamon street, Canada",
    status: true
  },
  {
    userId: "3",
    address: "789 vanilla street, Australia",
    status: true
  },
  {
    userId: "4",
    address: "123 sesame street, USA",
    status: true
  },
  {
    userId: "5",
    address: "123 sesame street, USA",
    status: true
  }
]

const carts = [
  {
    orderId: '1',
    productId:  '3',
    quantity: '1'
  },
  {
    orderId: '1',
    productId:  '4',
    quantity: '1'
  },
  {
    orderId: '2',
    productId:  '5',
    quantity: '2'
  },
  {
    orderId: '3',
    productId:  '6',
    quantity: '1'
  },
  {
    orderId: '3',
    productId:  '1',
    quantity: '1'
  }
]

const dropTables = async () => {
  try {
      await db.query(`
      DROP TABLE IF EXISTS users;
      `)

      await db.query(`
      DROP TABLE IF EXISTS products;
      `)

      await db.query(`
      DROP TABLE IF EXISTS orders;
      `)

      await db.query(`
      DROP TABLE IF EXISTS order_product;
      `)
      await db.query(`
      DROP TABLE IF EXISTS adminUsers;
      `)
  }
  catch(err) {
      throw err;
  }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`)
        await db.query(`
        CREATE TABLE adminUsers(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            password VARCHAR(255) NOT NULL
        )`)

        await db.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name TEXT,
          price DECIMAL,
          description TEXT,
          roast TEXT,
          image TEXT
      )`)

      await db.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "userId" TEXT,
          address TEXT,
          status BOOLEAN
      )`)

      await db.query(`
        CREATE TABLE order_product(
          id SERIAL PRIMARY KEY,
          "orderId" TEXT,
          "productId" TEXT,
          quantity INTEGER
      )`)

    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertAdminUser = async () => {
  try {
    for (const adminUser of adminUsers) {
      await createAdminUser({name: adminUser.name, password: adminUser.password});
    }
    console.log('Seed data (Admin Users) inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({name: product.name, price: product.price, description: product.description, roast: product.roast, image: product.image});
    }
    console.log('Seed data (products) inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertOrders = async () => {
  try {
    for (const order of orders) {
      await createOrder({"userId": order.userId, address: order.address, status: order.status});
    }
    console.log('Seed data (orders) inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertOrderProduct = async () => {
  try {
    for (const cart of carts) {
      await addProduct({orderId: cart.orderId, productId: cart.productId, quantity: cart.quantity});
    }
    console.log('Seed data (Cart) inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};



const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertProducts();
        await insertOrders();
        await insertOrderProduct();
        await insertAdminUser();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
