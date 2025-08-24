# ใช้ image เล็กและใหม่
FROM node:20-alpine
WORKDIR /app

# ติดตั้งเฉพาะ dependencies ที่ต้องใช้รันจริง
COPY package*.json ./
RUN npm ci --only=production

# คัดลอกซอร์ส
COPY . .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]