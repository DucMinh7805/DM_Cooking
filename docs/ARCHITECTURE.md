# Kiến trúc và quyết định V0.3

Phaser Scene nhận pointer theo tọa độ logic 960×560, gọi MiniEngine, rồi dùng renderer vẽ canvas texture. MiniEngine không biết DOM/Phaser; scoring và save độc lập. Main controller ghép các step config thành recipe và cập nhật HUD/menu.

Trạng thái UI: menu → tutorial → running → review → tutorial/result. Pause chỉ từ running, chặn cập nhật timer/heat và hủy gesture. Mất focus hoặc tab ẩn tự pause. Pointer ngoài canvas hủy gesture. Input chỉ giữ một pointer chủ tại mỗi thời điểm. Chế độ dễ tăng time limit 1.6 lần và mở rộng dung sai.

SaveStore schema version 2. ActiveRun gồm recipeId/index/results/difficulty; checkpoint được ghi đầu lượt và sau khi chấp nhận bước. Chơi lại bước chưa ghi score vào checkpoint. Reload khởi động ở menu, cho tiếp tục đầu bước hiện tại. Kết quả cuối cập nhật best và xóa active. Practice chỉ giữ state trong bộ nhớ, không đè active save. Khi storage bị chặn, chơi vẫn tiếp tục và hiển thị thông báo.

Import kiểm tra finite score, ID món, số bước, settings và version. Độ khó lượt đang lưu được giữ dù đổi độ khó trong cài đặt. Score 70/30, ngưỡng sao và tiêu chí unlock là thiết kế của demo, không phải các thông số đã xác nhận của game gốc.

Vite đóng gói TS, CSS, Phaser; lockfile giữ phiên bản cài. Bản build bundle Phaser còn lớn khoảng 1.2 MB trước gzip. Cần thử hiệu năng và thời gian tải trên iPad thật trước khi phát hành. Offline cache precache tất cả bundle assets trong build qua service worker; không có backend hoặc cloud save. Khi tạo bản mới, tên cache thay đổi theo bundle; không xóa cache của ứng dụng khác.

Ưu tiên tiếp theo: test thiết bị thật, thay đồ họa bằng asset đã duyệt, thêm nhạc nền, mở rộng công thức và accessibility cho thao tác không dùng chuột. Tương tác canvas cần drag nên chưa điều khiển đầy đủ bằng bàn phím; menu/settings có nút và label native.
