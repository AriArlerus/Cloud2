const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // โหลด environment variables จาก .env

// นำเข้าเส้นทางของโมดูลที่เกี่ยวข้อง
const { router: cartRoutes } = require('./routes/cartRoutes');
const navigationRoutes = require('./routes/navigationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const accountRoutes = require('./routes/accountRoutes');
const loginRoutes = require('./routes/loginRountrs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// หน้า HTML หลัก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// เส้นทาง API
app.use('/api/cart', cartRoutes);
app.use('/navigation', navigationRoutes);
app.use('/checkout', orderRoutes);
app.use('/account', accountRoutes);
app.use('/login', loginRoutes);

// จัดการ 404
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// จัดการ 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// เชื่อมต่อ MongoDB แบบปลอดภัย
const mongoUri = process.env.MONGO_URL || 'mongodb://mongo-db:27017';

if (!mongoUri) {
    console.error('❌ Environment variable MONGO_URL is missing');
    process.exit(1);
}

// ป้องกันการเชื่อมต่อซ้ำ
if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });
} else {
    console.log('⚠️ Mongoose already connected');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}
