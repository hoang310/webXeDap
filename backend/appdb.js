const mongoose = require("mongoose");


const connectDB = require("./db")
const product = require('./models/Product')

connectDB()
product()

async function createhh() {
  try {
    const products = [
      {
        name: 'Xe GRX 3.0',
        price: 5200000,
        stock: 8,
        category_id: '69c3f29216b6cee7372b6be4',
        image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=400&auto=format&fit=crop&q=60',
        desc: 'Xe địa hình GRX 3.0, khung nhôm cao cấp, truyền động Shimano 24 tốc độ',
        created_at: new Date(),
        __v: 0
      },
      {
        name: 'Xe GRX 4.0',
        price: 5500000,
        stock: 12,
        category_id: '69c3f29216b6cee7372b6be4',
        image: 'https://images.unsplash.com/photo-1520975693738-8b6a8d8f14d5?w=400&auto=format&fit=crop&q=60',
        desc: 'Xe địa hình GRX 4.0, hệ thống giảm xóc dầu, phanh đĩa thủy lực',
        created_at: new Date(),
        __v: 0
      }
      // ... thêm các sản phẩm khác
    ];

    // Lưu vào database
    await product.insertMany(products);
    console.log('đã được tạo:');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

createhh();

