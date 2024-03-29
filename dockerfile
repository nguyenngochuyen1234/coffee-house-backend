# Sử dụng một hình ảnh chứa Node.js
FROM node:18

# Tạo thư mục ứng dụng trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép tất cả các mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 3000 để ứng dụng Node.js lắng nghe
EXPOSE 8800

RUN chmod +x ./node_modules/.bin/nodemon
# Command để khởi động ứng dụng
CMD ["npm", "start"]
