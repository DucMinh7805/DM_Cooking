# World Kitchen — Studio Edition V0.6

Dự án nhiều tệp **Phaser 3 + TypeScript + Vite**, không phải một file HTML chứa toàn bộ game. `index.html` chỉ là điểm vào. Đây là vertical slice 3 món, có mã chạy và build production; thiết kế lấy cảm hứng từ nhịp chơi của game học nấu ăn cổ điển nhưng dùng thương hiệu, giao diện và tài sản hình ảnh gốc riêng.

## Mới trong V0.6
- Ca phục vụ bắt đầu từ lời khách và ba loại order có ưu tiên riêng, thay vì nhảy thẳng vào một công thức cố định.
- Ba công việc mới có cử chỉ khác hẳn: bào đổi chiều, nhào/gập luân phiên và lắp ráp topping tự do.
- Rush Order và Hộp bí mật tự chuyển trạm sau khi hoàn tất; không còn hộp điểm bắt buộc giữa mọi công đoạn.
- Tổng cộng 15 engine công việc bếp và một tài liệu nghiên cứu 28 ý tưởng gameplay để mở rộng.

## Mới trong V0.5
- Ba nhịp chơi ngay tại sảnh bếp: học công thức, Rush Order giới hạn thời gian và Hộp nguyên liệu bí mật không ảnh hưởng hành trình.
- 12 cơ chế thao tác. Bổ sung rửa/chà theo quỹ đạo, nêm theo nhịp và bày đĩa bằng kéo-thả bên cạnh 9 kỹ năng hiện có.
- Năm không gian bếp ảnh lớn: bàn sơ chế, bếp nhiệt, kho nguyên liệu, bàn bột/tạo hình và quầy hoàn thiện món.
- Mỗi công thức đi qua tổ hợp trạm khác nhau; chuyển cảnh, nhãn màu, vật thể và mục tiêu cũng đổi theo công đoạn.
- Trang cài đặt có luồng cài PWA lên máy, giải thích chơi offline và cơ chế bản lưu local-only.
- Ưu tiên độ đẹp và trải nghiệm hơn dung lượng; toàn bộ ảnh bếp được precache vào bản production.

## Mới trong V0.4
- Hai không gian thao tác mới: bàn sơ chế gỗ sáng và bếp cảm ứng tối, dùng tài sản gốc được tạo riêng cho dự án.
- Thay emoji trong toàn bộ mini-game bằng vật thể vẽ nhất quán: dao, nguyên liệu, tô, nồi, chảo, bình rót và thực phẩm.
- Vật thể phản ánh tiến trình thật: lát cắt xuất hiện theo đường dao, rau băm phủ dần, vỏ bánh thay đổi qua từng nếp gấp, hơi nước tăng theo nhiệt và vòng chín đổi màu theo thời gian.
- Màn chọn nguyên liệu có minh họa riêng cho từng sản phẩm; các bước nấu dùng đúng trạm bếp thay vì một nền chung.
- HUD mới hiển thị trạm làm việc, mục tiêu thao tác trực tiếp, tiến độ công đoạn và đồng hồ cảnh báo.
- Trang học viện đổi hero sang ảnh thành phẩm và loại bỏ phần lớn biểu tượng emoji khỏi giao diện chính.
- Giữ nguyên save schema v2 và toàn bộ logic chấm điểm/mở khóa của V0.3.

## Mới trong V0.3
- Giao diện game hoàn chỉnh hơn với thương hiệu World Kitchen, hero, thống kê hành trình và thẻ món theo trạng thái mở khóa.
- Khu bếp canvas được vẽ lại với không gian, mặt bàn, bóng đổ, vật liệu, animation và chỉ dẫn rõ hơn cho cả 8 thao tác.
- HUD mới có tiến trình công thức, đồng hồ cảnh báo, thanh tiến độ, phản hồi màu/rung khi đúng hoặc sai.
- Khu luyện tập, cài đặt và màn thành phẩm được thiết kế lại; bảng kết quả có cả độ chính xác và tốc độ.
- Thao tác cắt hỗ trợ số đường dao thay đổi theo món: thái lát mỏng hơn, hạt lựu nhỏ hơn và bài băm 18 nhịp phủ đều mặt thớt.
- Phòng thực hành dùng bài tập có mục tiêu cụ thể thay cho luyện tự do; mỗi bài ghi rõ chuẩn điểm, độ chính xác hoặc số lỗi.
- Sau mỗi công đoạn hiển thị ảnh chụp chính trạng thái bàn bếp kèm animation và ba chỉ số; thành phẩm dùng ảnh món ăn tự nhiên riêng cho từng món.
- Vẫn dùng save schema v2 nên giữ được tiến độ từ bản V0.2.

## Chạy trên laptop
Cần **Node.js 24 LTS** (khuyến nghị để chạy cả kiểm thử) và npm.

```bash
npm ci
npm run dev
```

Mở URL Vite hiển thị (thường `http://127.0.0.1:5173`) trong Chrome. Windows có thể chạy `START_WINDOWS.cmd` sau khi giải nén. Không mở `index.html` bằng double click: mã TypeScript cần dev server hoặc bản build.

```bash
npm run build
npm run preview
```

Bản build nằm trong `dist/`. Để đưa lên web server, chép **toàn bộ nội dung dist**, gồm assets, service worker, icon và manifest. Trong gói có sẵn dist được build từ mã nguồn này.

## Chơi trên iPad
Chạy `npm run dev -- --host 0.0.0.0` trên laptop, kết nối iPad cùng Wi-Fi và mở địa chỉ IP LAN của laptop với cổng Vite. Cách này dành cho chạy thử; cache offline/service worker cần **HTTPS** hoặc localhost. Có thể đưa dist lên hosting HTTPS để dùng Safari và thêm vào màn hình chính. Không có hosting đã triển khai hoặc app iOS native trong gói này.

Giao diện ưu tiên iPad nằm ngang. Engine giữ tỷ lệ vùng bếp 12:7 và tự scale tọa độ. Có thông báo xoay ngang khi cầm dọc. Mỗi người chơi trên máy riêng, không multiplayer hoặc đồng bộ tài khoản.

## Chức năng đã có
| Nhóm | Chức năng |
|---|---|
| Nội dung | Bánh xếp áp chảo (9 bước), gà Cung Bảo (8 bước), cơm chiên (7 bước), một ca sáng tạo 6 bước |
| Mini-game | 15 cơ chế, bổ sung bào đổi chiều, nhào/gập bột và lắp ráp món tự do |
| Chế độ | Giáo trình, ca phục vụ theo yêu cầu khách, Hộp nguyên liệu bí mật |
| Tiến trình | Món kế mở khi món trước đạt 70 điểm; lưu điểm cao nhất |
| Chơi | Tutorial trước mỗi bước, timer, phản hồi đúng/sai, pause, retry, kết quả từng bước |
| Practice | 12 bài mục tiêu, gồm rửa, nêm, bày đĩa, bào, nhào và lắp ráp; không làm thay đổi hành trình |
| Cài đặt | Dễ/tiêu chuẩn, gợi ý, giảm chuyển động, âm lượng, tắt tiếng |
| Âm thanh | Hiệu ứng tổng hợp bằng Web Audio: click, cắt, đúng/sai, hoàn thành; chưa có nhạc nền |
| Bản lưu | Tự lưu localStorage, tiếp tục từ đầu bước đang nấu, xuất/nhập JSON có kiểm tra schema |
| Reset | Hộp xác nhận trước khi xóa hoặc thay thế tiến độ |
| Offline | Manifest và service worker precache bundle cho bản production qua HTTPS/localhost |

Lưu ý: bản lưu v2 không nhập trực tiếp bản v1 của prototype cũ. Import thay thế tiến độ sau khi xác nhận. Không bảo đảm localStorage tồn tại nếu người dùng xóa dữ liệu web/đổi trình duyệt; dùng xuất JSON để chuyển máy. Chưa lưu vị trí giữa một cử chỉ; checkpoint là đầu bước.

## Cấu trúc
- `src/main.ts`: menu, chọn món, settings, practice và vòng đời recipe
- `src/types.ts`: kiểu dữ liệu chung
- `src/data/recipes.ts`: món và config các bước
- `src/core/scoring.ts`: điểm và sao
- `src/core/save.ts`: validation, tiến độ, checkpoint, import/export
- `src/core/audio.ts`: hiệu ứng âm thanh
- `src/minigames/engine.ts`: logic 15 thao tác, độc lập Phaser
- `src/scenes/KitchenScene.ts`: scene, input, scale và vòng cập nhật Phaser
- `src/render/kitchen.ts`: hình bếp, nguyên liệu và trạng thái được vẽ riêng
- `src/ui/dom.ts`, `src/styles.css`: thành phần giao diện
- `public/`: icon, manifest, service worker
- `scripts/precache.mjs`: ghép danh sách bundle vào cache offline sau build
- `tests/`: kiểm thử logic
- `e2e/`: kiểm thử trình duyệt
- `docs/`: kiến trúc, giới hạn và kết quả kiểm thử

## Kiểm thử
```bash
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```
`test:e2e` tự mở dev server cổng 5173. Nếu đã có server ở cổng này, hãy dùng đúng dự án hoặc đóng server cũ. Đọc `docs/TEST_REPORT.md` để biết kết quả thực tế; số lượng test đã viết không đồng nghĩa tất cả đã chạy đạt.

## Mở rộng
Thêm món bằng `recipes.ts`, dùng kind có sẵn. Thêm thao tác mới: khai báo Kind → engine → renderer → config → unit/e2e tests. Đồ họa tương tác được vẽ bằng canvas trên năm background ảnh lớn riêng cho từng trạm. Có thể mở rộng sang sprite atlas/animation khung hình mà không cần giữ giới hạn dung lượng web nhẹ. Không sử dụng hình, logo hoặc tài sản sao chép từ game tham chiếu.

## Tài liệu engine/build
- https://docs.phaser.io/api-documentation/3.90.0/class/scale-scalemanager
- https://docs.phaser.io/phaser/concepts/input
- https://vite.dev/guide/
- https://vite.dev/guide/static-deploy.html

Xem `THIRD_PARTY_NOTICES.md` để biết thư viện sử dụng. Không dùng hình, logo hoặc nhạc lấy từ Cooking Academy 2.
