const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // โหลดตัวแปรจาก .env

// นำเข้าเส้นทางของโมดูลที่เกี่ยวข้อง
const { router: cartRoutes } = require('./routes/cartRoutes'); // เส้นทางสำหรับจัดการตะกร้าสินค้า
const navigationRoutes = require('./routes/navigationRoutes'); // เส้นทางสำหรับการนำทาง
const orderRoutes = require('./routes/orderRoutes'); // เส้นทางสำหรับการสั่งซื้อสินค้า
const accountRoutes = require('./routes/accountRoutes'); // เส้นทางสำหรับบัญชีผู้ใช้
const loginRoutes = require('./routes/loginRountrs'); // เส้นทางสำหรับการล็อกอิน

const app = express();
const PORT = process.env.PORT || 3000; // รองรับ PORT จาก Railway หรือใช้ 3000 เป็นค่าเริ่มต้น

// ใช้ express.json() เพื่อจัดการข้อมูล JSON ในคำขอ
app.use(express.json());

// ใช้ static middleware เพื่อให้สามารถเข้าถึงไฟล์ในโฟลเดอร์ 'public'
app.use(express.static(path.join(__dirname, 'public')));

// เส้นทางสำหรับแสดงหน้า HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // หน้าแรก
});

// เส้นทาง API
app.use('/api/cart', cartRoutes); // เส้นทางสำหรับ API ของตะกร้าสินค้า
app.use('/navigation', navigationRoutes); // เส้นทางสำหรับการนำทาง
app.use('/checkout', orderRoutes); // เส้นทางสำหรับการชำระเงิน
app.use('/account', accountRoutes); // เส้นทางสำหรับบัญชีผู้ใช้
app.use('/login', loginRoutes); // เส้นทางสำหรับการล็อกอิน

// การจัดการข้อผิดพลาด
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' }); // ส่งข้อผิดพลาด 404
});

app.use((err, req, res, next) => {
    console.error(err.stack); // แสดงรายละเอียดข้อผิดพลาดใน console
    res.status(500).json({ error: 'Internal Server Error' }); // ส่งข้อผิดพลาด 500
});

// เชื่อมต่อ MongoDB และเริ่มเซิร์ฟเวอร์
mongoose.connect(process.env.MONGO_URL, {
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
