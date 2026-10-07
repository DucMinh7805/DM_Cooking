# Luồng chơi V0.6

## Trục chính

```text
Sảnh bếp
├─ Học công thức → mở khóa món → điểm cao → bài tiếp theo
├─ Ca phục vụ → đọc lời khách → chọn order → chuỗi việc ưu tiên riêng
└─ Hộp bí mật → 7 công việc liền mạch → kết quả riêng, không ảnh hưởng hành trình
```

Một lượt chơi không còn lặp một mặt bàn. Mỗi công đoạn chuyển sang một sân khấu phù hợp:

1. Kho nguyên liệu: chọn đúng nhóm nguyên liệu.
2. Bồn sơ chế: giữ và chà theo quỹ đạo để làm sạch.
3. Bàn dao: thái, hạt lựu hoặc băm theo những cử chỉ khác nhau.
4. Trạm phối trộn: điều khiển vòng trộn liên tục một chiều.
5. Bàn bột: gấp/tạo hình bằng kéo-thả.
6. Trạm xử lý: bào nguyên liệu theo hai chiều.
7. Bàn lắp ráp: tự bố trí topping trong vùng món.
8. Bếp nhiệt: canh nhiệt, áp chảo, nêm theo nhịp và rót đúng lượng.
9. Quầy hoàn thiện: kéo từng thành phần vào bố cục trên đĩa.

## Nguyên tắc chống nhàm chán

- Mỗi món dùng một tổ hợp kỹ năng khác, không chỉ thay tên nguyên liệu.
- Cơ chế xen kẽ độ chính xác, nhịp điệu, phản xạ, giữ/kéo và thẩm mỹ.
- Ca phục vụ thêm lời khách, ràng buộc và ưu tiên trước khi vào bếp.
- Hộp bí mật tạo một đường chơi ngắn cho người muốn thử tự do.
- Ảnh nền, bảng màu trạm, HUD và vật thể đổi theo loại thao tác.
- Rush và Sáng tạo tự chuyển trạm thay vì mở modal điểm sau mọi bước.

## Cài đặt và dữ liệu

- Bản production là PWA `standalone`, tải asset vào cache sau lần tải đầu và có thể mở như ứng dụng.
- Tiến trình nằm trong `localStorage` của đúng trình duyệt/thiết bị; không có tài khoản hoặc cloud sync.
- Xóa dữ liệu trang web hoặc dùng nút **Xóa dữ liệu chơi** sẽ mất tiến trình.
- Gỡ PWA có xóa dữ liệu hay không phụ thuộc hệ điều hành/trình duyệt, vì vậy không được hứa rằng thao tác gỡ app luôn xóa save.
- Người chơi có thể xuất JSON trước khi xóa và nhập lại trên cùng hoặc máy khác.

## Hướng mở rộng tiếp theo

- Ca phục vụ nhiều khách nối tiếp và combo không sai thao tác.
- Sự kiện theo ngày: VIP, thanh tra, khách dị ứng, nguyên liệu giới hạn.
- Trang trí/nâng cấp quầy bếp có ảnh hưởng nhẹ đến gameplay.
- Thêm âm thanh môi trường, nhạc theo quốc gia và voice reaction của khách.
- Đóng gói Capacitor/Tauri nếu cần hành vi cài/gỡ và save hoàn toàn theo chuẩn ứng dụng native.
