# 🍌 BananaShop Web Application
Full-stack web application (Node.js + Express + MongoDB)

## Table of Contents
- [Project Structure](#-project-structure)
- [Application Architecture](#-application-architecture)
- [BananaShop Webpage](#-bananashop-webpage)
- [การสร้าง Deployment Auto-scaling และ CI/CD ด้วย GitHub Actions](#-การสร้าง-deployment-auto-scaling-และ-cicd-ด้วย-github-actions)
- [การทดสอบประสิทธิภาพด้วย Load Testing](#-การทดสอบประสิทธิภาพด้วย-load-testing)
- [สรุป](#สรุป)

---
## 📂 Project Structure

```
+---.github
|   \---workflows
|       deploy.yml
+---controllers
+---data
+---node_modules
+---public
|   +---css
|   +---favicon_io
|   +---js
|   \---picture
+---routes
+---views
    +---login
    +---shop
|   |   index.html
Dockerfile
load-test.yml
package.json
server.js
```

# 🍌 Application Architecture
![Cloudy](https://github.com/user-attachments/assets/2cc4e0e2-4c54-4297-8477-7a68fe2d38c7)

โปรเจกต์นี้เป็น **แอปพลิเคชันแบบ Full-Stack** ที่มี **Node.js backend**, ใช้ **MongoDB** สำหรับการจัดการฐานข้อมูล, และโฮสต์แอปพลิเคชันด้วย **AWS** เพื่อให้รองรับการขยายตัวและการจัดการการบริการที่ดี
## โครงสร้างพื้นฐาน (Infrastructure)

### AWS Services ที่ใช้:
แอปพลิเคชันนี้ใช้บริการต่างๆ จาก **AWS** เพื่อทำให้ระบบทำงานได้อย่างมีประสิทธิภาพและสามารถขยายได้ตามความต้องการ

### 1. **Docker**:
- **Docker** ถูกใช้เพื่อ **containerize** แอปพลิเคชัน โดยการบรรจุโค้ด, ไลบรารี, และ dependencies ทั้งหมดใน **Docker container** เดียวกัน ซึ่งทำให้สามารถนำแอปพลิเคชันนี้ไปใช้ในสภาพแวดล้อมต่างๆ ได้โดยไม่มีปัญหากับความแตกต่างของระบบปฏิบัติการ
- Docker ช่วยให้แอปพลิเคชันสามารถรันได้ในทุกที่ ไม่ว่าจะเป็นในเครื่องของนักพัฒนา, สภาพแวดล้อมทดสอบ, หรือใน **AWS**

### 2. **Amazon Elastic Container Service (ECS)**:
- **ECS** ใช้สำหรับการจัดการและรัน **Docker containers** ซึ่งทำให้การ **deploy** แอปพลิเคชันบน AWS ง่ายและรวดเร็ว
- ECS ช่วยให้เราสามารถจัดการ **containers** ได้โดยไม่ต้องดูแล **EC2 instances** ด้วยตัวเองหากเลือกใช้ **Fargate** ในการรัน **ECS tasks** แบบ serverless
- **ECS Cluster** จะเก็บ **EC2 instances** หรือ **Fargate** ที่รัน **Docker containers** ที่มีแอปพลิเคชันของเราทำงาน

### 3. **EC2 (Elastic Compute Cloud)**:
- **EC2** คือ **เซิร์ฟเวอร์เสมือน** ที่เราสามารถรัน **ECS tasks** บน **EC2 instances**
- **EC2** มีหลายประเภท เช่น **t2.micro**, **t2.small** ซึ่งเหมาะกับขนาดการใช้งานที่แตกต่างกัน
- EC2 สามารถใช้ร่วมกับ **ECS** ในการรัน **Docker containers** ใน **ECS Cluster**

### 4. **Amazon ECR (Elastic Container Registry)**:
- **ECR** เป็นที่เก็บ **Docker images** ที่เราสร้างขึ้นจากโค้ดของแอปพลิเคชัน
- **ECR** ช่วยให้เราจัดการและเก็บ Docker images ที่จะใช้ใน **ECS tasks**
- ก่อนที่ **ECS** จะรัน **Docker containers**, เราจะต้อง **push** Docker image ไปยัง **ECR** ก่อน

### 5. **Security Group**:
- **Security Groups** เป็นไฟร์วอลล์ที่ใช้ควบคุมการเข้าถึง **ECS tasks**, **EC2 instances**, และ **ALB**
- ช่วยให้เราสามารถกำหนดว่าใครสามารถเข้าถึง **ECS tasks** หรือ **EC2 instances** ได้บ้าง

### 6. **Application Load Balancer (ALB)**:
- **ALB** ทำหน้าที่ในการ **กระจายคำขอ** ที่มาจากผู้ใช้ไปยัง **ECS tasks** ที่รันแอปพลิเคชัน
- ช่วยให้ระบบของเราไม่ถูกโหลดหนักเกินไปใน **ECS task** ใดๆ โดยการกระจายคำขอให้เท่าเทียม

### 7. **IAM (Identity and Access Management)**:
- **IAM** ใช้ในการจัดการสิทธิ์การเข้าถึงทรัพยากร AWS ต่างๆ
- **IAM roles** จะกำหนดสิทธิ์การเข้าถึงที่ **ECS tasks** และ **EC2 instances** สามารถทำได้ เช่น การเข้าถึง **ECR**, **S3**, **DynamoDB**, หรือบริการอื่นๆ

---
# 🍌 BananaShop Webpage
<img width="1354" height="753" alt="image" src="https://github.com/user-attachments/assets/f39d14f7-45b9-4e28-a022-6360b3f57404" />
<img width="1337" height="754" alt="image" src="https://github.com/user-attachments/assets/e3cc6d0b-d78e-4866-8c43-e594e3057d07" />
<img width="1332" height="754" alt="image" src="https://github.com/user-attachments/assets/78f2264a-d2fa-44ac-9510-9d6006ab10c7" />

## เทคโนโลยีที่ใช้ (Tech Stack)

### **Frontend (Client-side):**
- **HTML**: ใช้สำหรับการสร้างโครงสร้างของหน้าเว็บ
- **CSS**: ใช้สำหรับการตกแต่งและจัดรูปแบบของหน้าเว็บ
- **JavaScript**: ใช้สำหรับเพิ่มฟังก์ชันการทำงานบนหน้าเว็บ เช่น การจัดการฟอร์ม, การเชื่อมต่อกับ API ของ **Backend**, และการจัดการการแสดงผลบนหน้าเว็บ

### **Backend (Server-side):**
- **Node.js**: ใช้สำหรับรัน **JavaScript** บนเซิร์ฟเวอร์เพื่อจัดการกับการประมวลผลต่างๆ ของแอปพลิเคชัน เช่น การรับคำขอจากผู้ใช้, การจัดการข้อมูลในฐานข้อมูล, การยืนยันตัวตน, และการประมวลผลคำขอต่างๆ
- **MongoDB**: ฐานข้อมูลแบบ NoSQL ที่ใช้เก็บข้อมูลของผู้ใช้, ข้อมูลสินค้า, ข้อมูลการสั่งซื้อ และข้อมูลอื่นๆ ของแอปพลิเคชัน ซึ่งมีความยืดหยุ่นสูงในการจัดเก็บข้อมูล

## ฟีเจอร์หลักของแอปพลิเคชัน

1. **ระบบสมาชิก (Login/Signup)**:
   - ผู้ใช้สามารถสมัครสมาชิก, ล็อกอิน และจัดการโปรไฟล์ โดยใช้ **JWT (JSON Web Token)** สำหรับการยืนยันตัวตนที่ปลอดภัย
2. **ระบบแสดงสินค้าที่ขาย (Product Listing)**:
   - ผู้ใช้สามารถดูรายการสินค้า, รายละเอียดของสินค้า, ราคา และสามารถเลือกสินค้าลงในตะกร้า
3. **ระบบตะกร้าสินค้า (Shopping Cart)**:
   - ผู้ใช้สามารถเพิ่ม, ลบ, หรือปรับจำนวนสินค้าที่อยู่ในตะกร้าได้
แอปพลิเคชันนี้ให้ผู้ใช้สามารถสมัครสมาชิก, ล็อกอิน, เลือกสินค้าจากร้านค้า และเพิ่มสินค้าลงในตะกร้าสินค้า โดยใช้เทคโนโลยีที่ทันสมัยเช่น **Docker**, **ECS**, **ECR**, **EC2**, **ALB**, **IAM**, **GitHub Actions** และ **MongoDB** ที่ช่วยให้การทำงานของแอปพลิเคชันในระบบคลาวด์เป็นไปอย่างราบรื่น

---
# 🍌 การสร้าง Deployment Auto-scaling และ CI/CD ด้วย GitHub Actions 
<img width="1012" height="500" alt="image" src="https://github.com/user-attachments/assets/0759a508-4f00-4b8f-9a48-d1e6132886c5" />

## สถาปัตยกรรมการทำงานของระบบ

ระบบนี้มีการทำงานแบบผสมผสานระหว่าง Railway และ AWS Cloud เพื่อให้สามารถรับคำขอจากผู้ใช้งาน ประมวลผล และจัดการการ Deploy แบบอัตโนมัติ โดยแบ่งออกเป็น 4 ขั้นตอนหลัก ดังนี้

### 1. การรับคำขอจากผู้ใช้งาน (Client Request)
- ผู้ใช้งาน (Client) ส่งคำขอมาที่โดเมนของ **Railway**
- **Railway** ทำหน้าที่เป็นตัวกลาง (Proxy) ในการรับคำขอและส่งต่อไปยัง **AWS Cloud**

### 2. การประมวลผลบน AWS Cloud
- คำขอจาก Railway จะถูกส่งต่อมายัง **ALB (Application Load Balancer)** ซึ่งอยู่ใน AWS Cloud
- **ALB** ทำหน้าที่กระจายคำขอไปยังส่วนประมวลผลหลักด้านหลัง เช่น **EC2 Instance** หรือ **Amazon ECS Cluster** ที่รัน **ECS Task**
- **Security Group** ทำหน้าที่ควบคุมการเข้าออกของทราฟฟิกเพื่อความปลอดภัยของระบบ

### 3. การทำงานภายในระบบ (Internal Processing)
- **EC2** หรือ **ECS Task** จะเริ่มประมวลผลคำขอที่ได้รับ
- **ECS Task** จะดึงอิมเมจ (Image) จาก **Amazon ECR (Elastic Container Registry)** ซึ่งเป็นที่เก็บ Docker Image เพื่อนำมาสร้าง Container สำหรับรันแอปพลิเคชัน
- ระหว่างการประมวลผล ECS Task อาจมีการเชื่อมต่อไปยัง **External Model Providers** เช่น **MongoDB Atlas** เพื่อดึงหรือบันทึกข้อมูล

### 4. การทำงานของ CI/CD Pipeline และการ Deploy
- เมื่อมีการ **Push** โค้ดใหม่ไปที่ **GitHub**, **GitHub Actions CI/CD Pipeline** จะทำงานทันทีเพื่อ **Build** โค้ดให้เป็น **Docker Image** แล้วทำการ **Push** image นั้นไปยัง **Amazon ECR** โดยตรง ซึ่งเป็น **คลังเก็บ Docker Image** บน **AWS**
- หลังจากที่ **image** ใหม่ถูกเก็บไว้ที่ **Amazon ECR** เรียบร้อยแล้ว, **GitHub Actions** จะทำการ **Deploy** ทั้งไปที่ **AWS ECS** และ **Railway**
   - **Railway** จะดึง **Docker Image** เวอร์ชันใหม่จาก **ECR** และทำการ **Deploy** ไปยัง **Railway Platform**
   - **GitHub Actions** จะใช้ **AWS CLI** เพื่อสั่งให้ **AWS (ECS)** สร้างหรือ **อัปเดต ECS Task** ให้ใช้ **image** เวอร์ชันล่าสุดที่อยู่ใน **Amazon ECR**
- **ECS** จะดึง **image** ใหม่จาก **ECR** มาประมวลผลเพื่อ **รันแอปพลิเคชันเวอร์ชันล่าสุด** บน **ECS Task** ใหม่ที่ถูกสร้างขึ้น
<img width="946" height="359" alt="image" src="https://github.com/user-attachments/assets/03293084-2393-4927-9474-ac5f73044ae4" />

---
# 🍌 การทดสอบประสิทธิภาพด้วย Load Testing
<img width="1916" height="1079" alt="Screenshot 2025-08-25 001258" src="https://github.com/user-attachments/assets/f9433d20-409c-4ec8-9e1c-bf17509edf9a" />
<img width="1918" height="1048" alt="Screenshot 2025-08-25 001237" src="https://github.com/user-attachments/assets/54ac2fbd-3f96-4998-bf3a-3339b1866c0c" />

## การทดสอบการทำงานและ Auto Scaling

### การทดสอบ Load ด้วย k6:
การทดสอบได้ถูกดำเนินการโดยการสร้างคำขอ HTTP จำนวน 25 คำขอต่อวินาที (RPS) เป็นระยะเวลา 1 นาที ซึ่งมีการวัดการใช้งาน **CPU** และ **Memory** เพื่อประเมินว่าระบบสามารถจัดการกับการโหลดได้ดีเพียงใด

### ผลลัพธ์จากการทดสอบ k6:
ระบบสามารถทำการส่งคำขอ HTTP จำนวน 46 คำขอในช่วงเวลา 2 วินาที โดยเวลาตอบกลับของคำขอมีการผันแปร ซึ่งบ่งบอกถึงการเปลี่ยนแปลงของประสิทธิภาพของระบบในระหว่างการทดสอบ

### การใช้งาน CPU:
- การใช้งาน CPU มีการผันแปรตามระยะเวลา โดยในบางช่วงเวลาการใช้งานสูงสุดของ CPU สูงถึง 6.5% ในช่วงที่มีการจราจรสูง
- การใช้งาน CPU เฉลี่ยมีค่าต่ำ ซึ่งแสดงให้เห็นว่าระบบสามารถจัดการกับการโหลดได้โดยไม่ทำให้ CPU เกินขีดความสามารถในช่วงเวลาส่วนใหญ่
- **ข้อสรุป**: ระบบสามารถจัดการกับการโหลดได้ดีและระบบ **Auto Scaling** ทำงานได้อย่างมีประสิทธิภาพโดยไม่ทำให้ CPU เกินขีดความสามารถ

### การใช้งาน Memory:
- การใช้งาน Memory มีการผันแปรในลักษณะเดียวกับ CPU โดยในบางช่วงการใช้งานสูงสุดถึงประมาณ 1.17%
- การใช้งาน Memory ยังคงอยู่ภายใต้การควบคุมและมีการลดลงหลังจากที่มีการเพิ่มการโหลด ซึ่งบ่งบอกว่าระบบสามารถคืนพื้นที่ความจำได้เมื่อโหลดลดลง
- **ข้อสรุป**: เช่นเดียวกับ CPU ระบบสามารถจัดการกับการใช้งาน Memory ได้อย่างมีประสิทธิภาพ

### ประสิทธิภาพของ Auto Scaling:
- จากกราฟจะเห็นได้ว่า **Auto Scaling** ทำงานได้ดี เมื่อ **CPU** และ **Memory** ใช้งานเพิ่มขึ้นในช่วงที่มีการโหลดสูง ระบบสามารถขยายขีดความสามารถของตัวเองได้
- **Auto Scaling** ดูเหมือนจะตอบสนองได้ดีต่อการเพิ่มขึ้นของโหลดและการใช้งานทรัพยากร
- การปรับขนาดของระบบสามารถเกิดขึ้นได้เมื่อ **CPU** และ **Memory** ใช้งานเกินขีดจำกัดที่กำหนดไว้

---

## สรุป

โปรเจกต์นี้แสดงให้เห็นถึงการใช้ **AWS services** และ **Docker** เพื่อสร้างระบบ **scalable** ที่สามารถรองรับการขยายตัวได้อย่างมีประสิทธิภาพ โดยการใช้ **ECS** ในการจัดการ **Docker containers**, **ECR** ในการเก็บ **Docker images**, **ALB** ในการกระจายโหลด, และ **IAM** ในการจัดการสิทธิ์การเข้าถึง

การใช้ **GitHub Actions** ช่วยให้การ **CI/CD** ทำงานได้อย่างรวดเร็วและอัตโนมัติ, ทำให้การ deploy แอปพลิเคชันใหม่ๆ ง่ายขึ้น

- **Frontend** โฮสต์บน **Railway**
- **Backend (Node.js)** รันใน **ECS** โดยใช้ **Docker containers**
- **MongoDB** ใช้เป็นฐานข้อมูล
- **ECR** ใช้ในการจัดเก็บ **Docker images**
- **GitHub Actions** ใช้ในการทำ **CI/CD** ตั้งแต่การ build จนถึงการ deploy

---
