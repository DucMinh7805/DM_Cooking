# Kiểm thử thực tế — Studio Edition V0.6
Ngày: 07/10/2026. Môi trường: Node.js 24, TypeScript 5.9, Phaser 3.90.0, Vite 7.3.7, Playwright Chromium 153.

## Kết quả
- `npm run build`: TypeScript strict và build production đạt
- `npm test`: 10/10 nhóm đạt
- `npm run test:e2e`: 4/4 kịch bản đạt trên Chrome, gồm viewport iPad và luồng order không modal
- Production offline: nạp đủ bundle, 3 ảnh món và 6 nền bếp; reload khi offline và bắt đầu một món đạt
- Kiểm tra trực quan trong trình duyệt: sảnh ba chế độ, bồn rửa, HUD, modal hướng dẫn và bố cục dọc/ngang hiển thị đúng

## Những gì đã kiểm tra
1. Giới hạn điểm, speed, timeout và ngưỡng sao
2. Cắt theo đường, cắt sai, cancel và thứ tự Dice
3. Fold đúng nguồn/đích
4. Trộn vòng một chiều, không tính ngược hướng thành vòng hợp lệ
5. Boil đủ thời gian vùng nhiệt; pour đúng lượng; fry đúng timing
6. Find theo thứ tự, timeout không nhận thao tác tiếp
7. Bản lưu số hữu hạn, ID món hợp lệ, số kết quả checkpoint và version
8. Thái mỏng tự tăng mật độ đường cắt và bài băm nhận đủ 18 vị trí dao
9. Trên Chromium: chọn món → nấu trọn 9 bước bánh xếp áp chảo, gồm rửa, nêm và bày đĩa → kết quả → mở khóa gà
10. Pause giữ timer, reload rồi tiếp tục từ đầu bước đang lưu
11. Bài thực hành có mục tiêu, retry, thay cài đặt, reload giữ cài đặt, tải JSON export và từ chối JSON hỏng
12. Viewport 1024×768 với cảm ứng mô phỏng: chọn đúng 3 nguyên liệu bằng touch và nhận màn thành quả; có screenshot trong test-artifacts
13. Bản production tự precache từng tệp JS/CSS và toàn bộ ảnh cần thiết, không còn cache nhầm tên thư mục
14. Sáu nền bếp tải được trong canvas, ảnh chụp công đoạn không bị lỗi CORS và điều khiển cảm ứng vẫn giữ đúng tỉ lệ 960×560
15. Ba engine mới: rửa theo quỹ đạo, nêm theo vùng nhịp và bày đĩa kéo-thả đều hoàn thành đúng mục tiêu và từ chối thao tác sai
16. Bào bắt buộc đổi chiều, nhào bắt buộc gập luân phiên và lắp ráp lưu đúng sáu vị trí topping tự chọn
17. Ca phục vụ hiển thị ba order khách; Hộp bí mật tự chuyển từ rửa sang bào mà không tạo review modal

## Giới hạn
- Chưa thử Safari/iPad thật, bàn tay kéo trên màn cảm ứng thật hoặc hiệu năng thiết bị thật
- Touch e2e mới thử bước chọn nguyên liệu; kéo/circular gestures đã kiểm tra bằng chuột trong Chromium
- Đã kiểm tra logic đủ 15 engine; chưa chạy trọn gà/cơm chiên trong e2e
- Không sao chép tài sản hoặc bố cục 1:1 từ game tham chiếu; đây là game riêng với nhịp chơi cùng thể loại
- Âm thanh là hiệu ứng tổng hợp, chưa có nhạc; không kiểm định âm thanh bằng nghe trên máy thật
- Build cảnh báo bundle Phaser >500 kB; đây là cảnh báo kích thước, không phải lỗi build

## Chạy lại
`npm ci`, `npm test`, `npx playwright install chromium`, `npm run test:e2e`.
Kiểm tra offline: `npm run test:offline` (tự build và mở server preview cổng 5190).
Mở source bằng editor, chạy dev/build qua npm; không double-click file HTML.
