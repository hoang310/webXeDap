const fs = require('fs');
const path = require('path');

// Xác định đường dẫn: đi ra khỏi 'backend' và vào 'uploads'
const filePath = path.join(__dirname, '..', 'uploads', 'test.txt');
const content = 'Nội dung file trong thư mục uploads';

// Tạo file
fs.writeFile(filePath, content, (err) => {
    if (err) {
        return console.error('Không thể tạo file:', err);
    }
    console.log('File đã được lưu tại: ' + filePath);
});
