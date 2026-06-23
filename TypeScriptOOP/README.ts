/**
 * HƯỚNG DẪN HỌC OOP TRONG TYPESCRIPT
 * 
 * CÁC FILE TRONG WORKSPACE
 * ═══════════════════════════════════════════
 * 
 * 1. OOP_CheatSheet.ts
 *    - Tóm tắt các khái niệm OOP
 *    - Ví dụ từng khái niệm
 *    - Đọc trước khi làm bài tập
 * 
 * 2. Exercise1_Animal.ts (BÀI TẬP 1)
 *    - Mục tiêu: Abstract Class, Inheritance, super()
 *    - Độ khó: ⭐⭐ (dễ)
 *    - Thời gian: 20-30 phút
 *    - Hướng dẫn chi tiết trong file
 * 
 * 3. Exercise2_Employee.ts (BÀI TẬP 2)
 *    - Mục tiêu: Interface, Encapsulation, Getter/Setter
 *    - Độ khó: ⭐⭐⭐ (vừa)
 *    - Thời gian: 30-40 phút
 *    - Hướng dẫn chi tiết trong file
 * 
 * 4. Exercise3_Geometry.ts (BÀI TẬP 3)
 *    - Mục tiêu: Interface + Abstract, Polymorphism
 *    - Độ khó: ⭐⭐⭐⭐ (khó)
 *    - Thời gian: 40-60 phút
 *    - Hướng dẫn chi tiết trong file
 * 
 * 5. Solution1/2/3_*.ts
 *    - Giải pháp hoàn chỉnh cho mỗi bài tập
 *    - So sánh với code của bạn sau khi xong
 * 
 * 
 * LỰA HỌC TẬP TỐI ƯU
 * ═══════════════════════════════════════════
 * 
 * BƯỚC 1: Đọc lý thuyết
 *   → Mở OOP_CheatSheet.ts
 *   → Đọc và hiểu từng khái niệm
 *   → Chạy các ví dụ: npx ts-node --transpileOnly OOP_CheatSheet.ts
 * 
 * BƯỚC 2: Làm bài tập từ dễ đến khó
 *   → Exercise1_Animal.ts (Start here!)
 *   → Viết code để hoàn thành bài tập
 *   → Chạy để test: npx ts-node --transpileOnly Exercise1_Animal.ts
 *   → So sánh với Solution1_Animal.ts
 *   → Học từ khác biệt
 * 
 * BƯỚC 3: Tiếp tục bài tập khác
 *   → Exercise2_Employee.ts
 *   → Exercise3_Geometry.ts
 * 
 * BƯỚC 4: Tạo bài tập riêng
 *   → Kết hợp các khái niệm đã học
 *   → Ví dụ: Hệ thống quản lý sách (Book, Author, Library)
 * 
 * 
 * CÁCH CHẠY CÁC FILE
 * ═══════════════════════════════════════════
 * 
 * Terminal:
 * cd C:\\Users\\Viet Anh\\HOC\\TypeScriptOOP
 * 
 * Chạy một file:
 * npx ts-node --transpileOnly Exercise1_Animal.ts
 * 
 * Hoặc dùng tsc (nếu đã config tsconfig.json):
 * npx tsc Exercise1_Animal.ts && node Exercise1_Animal.js
 * 
 * 
 * TIPS & TRICKS
 * ═══════════════════════════════════════════
 * 
 * 1. Console.log để debug
 *    console.log("value:", variableName);
 * 
 * 2. typeof để kiểm tra type
 *    console.log(typeof variable);
 * 
 * 3. instanceof để kiểm tra class
 *    if (animal instanceof Dog) { ... }
 * 
 * 4. Dùng spread operator để copy mảng
 *    const copy = [...originalArray];
 * 
 * 5. Array methods
 *    arr.forEach(item => { ... })
 *    arr.map(item => item.name)
 *    arr.filter(item => item.age > 20)
 *    arr.reduce((sum, item) => sum + item.salary, 0)
 * 
 * 
 * CÂU HỎI THƯỜNG GẶP
 * ═══════════════════════════════════════════
 * 
 * Q: Khi nào dùng Interface vs Abstract Class?
 * A: - Interface: Chỉ định nghĩa (no implementation)
 *    - Abstract Class: Có implementation + định nghĩa
 *    - Nếu class cần logic sẵn → dùng Abstract Class
 *    - Nếu chỉ cần contract → dùng Interface
 * 
 * Q: Tại sao phải gọi super()?
 * A: Để khởi tạo class cha (parent constructor)
 *    Bắt buộc khi parent có constructor
 * 
 * Q: Private vs Protected khác gì?
 * A: - private: chỉ dùng trong class đó
 *    - protected: dùng trong class + subclass
 *    - public: dùng ở bất kỳ đâu
 * 
 * Q: Làm sao để chạy code?
 * A: npx ts-node --transpileOnly FileName.ts
 * 
 * 
 * NEXT STEPS
 * ═══════════════════════════════════════════
 * 
 * Sau khi hoàn thành 3 bài tập:
 * 1. Tạo project thực tế nhỏ
 * 2. Học về Modules (import/export)
 * 3. Học về Generics
 * 4. Học về Decorators (advanced)
 * 5. Áp dụng vào dự án React/Node.js
 */
