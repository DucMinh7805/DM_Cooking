# Luồng chơi V0.7

## Trục chính

```text
Sảnh bếp
├─ Học công thức → mở khóa món → điểm cao → bài tiếp theo
├─ Ca phục vụ → nhập kho → mở cửa → hàng chờ → order → sơ chế/nấu → giao → tiền + tip
└─ Hộp bí mật → 7 công việc liền mạch → kết quả riêng, không ảnh hưởng hành trình
```

Một lượt chơi không còn lặp một mặt bàn. Mỗi công đoạn chuyển sang một sân khấu phù hợp:

1. Kho đầu ca: nhập rau củ, thịt/cơm/bột và dụng cụ phục vụ trước khi mở cửa.
2. Quầy order: đọc món, khẩu phần, mức cay, sốt riêng và giới hạn thời gian; chọn đúng phần ăn/dụng cụ.
3. Bồn sơ chế: giữ và chà theo quỹ đạo để làm sạch.
4. Bàn dao: thái, hạt lựu hoặc băm theo những cử chỉ khác nhau.
5. Trạm phối trộn/bàn bột: trộn, nhào, gấp hoặc tạo hình.
6. Trạm xử lý/lắp ráp: bào, chọn topping và tự bố trí.
7. Bếp nhiệt/định lượng: canh nhiệt, áp chảo, nêm và rót đúng lượng.
8. Quầy hoàn thiện: bày đĩa, tách sốt, giao order và nhận thưởng.

## Nguyên tắc chống nhàm chán

- Mỗi món dùng một tổ hợp kỹ năng khác, không chỉ thay tên nguyên liệu.
- Cơ chế xen kẽ độ chính xác, nhịp điệu, phản xạ, giữ/kéo và thẩm mỹ.
- Ca phục vụ thêm lời khách, ràng buộc và ưu tiên trước khi vào bếp.
- Hộp bí mật tạo một đường chơi ngắn cho người muốn thử tự do.
- Ảnh nền, bảng màu trạm, HUD và vật thể đổi theo loại thao tác.
- Rush và Sáng tạo tự chuyển trạm thay vì mở modal điểm sau mọi bước.

## Cài đặt và dữ liệu

- Bản production là PWA `standalone`, hỗ trợ `orientation:any`, safe-area và cả portrait/landscape.
- Worker kiểm tra bản mới khi mở lại app, khi quay lại tab và mỗi giờ. Bản mới chờ người chơi bấm **Cập nhật ngay** rồi mới thay thế.
- Tiến trình nằm trong `localStorage` của đúng trình duyệt/thiết bị; không có tài khoản hoặc cloud sync.
- Xóa dữ liệu trang web hoặc dùng nút **Xóa dữ liệu chơi** sẽ mất tiến trình.
- Gỡ PWA có xóa dữ liệu hay không phụ thuộc hệ điều hành/trình duyệt, vì vậy không được hứa rằng thao tác gỡ app luôn xóa save.
- Người chơi có thể xuất JSON trước khi xóa và nhập lại trên cùng hoặc máy khác.

## Hướng mở rộng tiếp theo

- Cho nhiều order chạy song song thay vì người chơi chỉ xử lý một order tại một thời điểm.
- Sự kiện theo ngày: VIP, thanh tra, khách dị ứng, nguyên liệu giới hạn.
- Trang trí/nâng cấp quầy bếp có ảnh hưởng nhẹ đến gameplay.
- Thêm âm thanh môi trường, nhạc theo quốc gia và voice reaction của khách.
- Đóng gói Capacitor/Tauri nếu cần hành vi cài/gỡ và save hoàn toàn theo chuẩn ứng dụng native.
