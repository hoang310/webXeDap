
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

exports.gen = async (req, res) => {
    try {
    const { specs } = req.body;

    if (!specs) {
      return res.status(400).json({ error: 'Vui lòng cung cấp thông số sản phẩm.' });
    }

    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      Bạn là một chuyên gia viết bài quảng cáo sản phẩm chuyên nghiệp. 
      Hãy viết một đoạn ngắn mô tả sản phẩm hấp dẫn, mượt mà và tự nhiên dựa trên các thông số kỹ thuật sau đây:

      ${specs}

      Yêu cầu:
      - Viết bằng tiếng Việt.
      - Giọng văn cuốn hút, làm nổi bật được ưu điểm của sản phẩm.
      - Không lặp lại nguyên văn danh sách thông số một cách khô khan.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ description: text });
  } catch (error) {
    console.error('Error with AI:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo mô tả từ AI.' });
  }
}