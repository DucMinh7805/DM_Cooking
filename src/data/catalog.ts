export type CountryId='china'|'italy'|'mexico'|'japan';
export interface CatalogDish {name:string;viName?:string;icon:string;ingredients:string;actions:string[];playableId?:string;sourceIncomplete?:boolean}
export interface CountryChapter {id:CountryId;name:string;subtitle:string;accent:string;dishes:CatalogDish[]}

const dish=(name:string,viName:string,icon:string,ingredients:string,actions:string,playableId?:string,sourceIncomplete=false):CatalogDish=>({name,viName,icon,ingredients,actions:actions.split(' → '),playableId,sourceIncomplete});

export const chapters:CountryChapter[]=[
 {id:'china',name:'Trung Quốc',subtitle:'Dim sum, mì và những chiếc chảo rực lửa',accent:'#b54735',dishes:[
  dish('Potstickers','Bánh xếp áp chảo','🥟','Thịt heo băm, bắp cải, hành lá, gừng, xì dầu, bột mì, nước, dầu ăn','Băm nhỏ bắp cải và hành lá → Trộn nhân cùng thịt và gia vị → Nhào và cán bột mỏng → Đặt nhân, gập đôi và nắn nếp gấp → Áp chảo giòn mặt đáy → Châm nước, đậy nắp hấp chín','dumplings'),
  dish('Wonton','Hoành thánh nước','🥣','Vỏ hoành thánh, thịt heo, tôm, dầu mè, hành lá, nước hầm xương gà','Bóc vỏ và băm tôm → Trộn nhân tôm thịt → Gói và xoắn kín miệng → Đun nước dùng → Luộc đến khi nổi → Hoàn thiện tô'),
  dish('Kung Pao Chicken','Gà xào Cung Bảo','🍗','Ức gà, ớt khô, đậu phộng, hành boa-rô, tỏi, giấm đen, xì dầu, bột bắp','Cắt gà hạt lựu → Thái tỏi và ớt → Làm nóng chảo → Phi thơm → Đảo gà → Rót sốt → Thêm đậu phộng','chicken'),
  dish('Egg Roll','Chả giò trứng','🌯','Vỏ chả giò, bắp cải, cà rốt, nấm mèo, thịt heo, lòng trắng trứng','Bào rau củ → Xào nhân → Trải vỏ và đặt nhân → Gập mép, cuốn chặt → Dán mép → Chiên vàng'),
  dish('Chow Mein','Mì xào giòn','🍜','Mì trứng, thịt bò hoặc gà, giá đỗ, cải thìa, xì dầu, dầu hào','Trụng mì → Thái rau và thịt → Chiên mì giòn → Xào thịt rau → Rưới sốt → Hoàn thiện đĩa'),
  dish('Sweet and Sour Pork','Thịt heo chua ngọt','🍖','Nạc thăn heo, dứa, ớt chuông, hành tây, sốt cà chua, giấm, đường, bột chiên','Cắt thịt → Áo bột và trứng → Chiên giòn → Cắt rau quả → Nấu sốt → Đảo áo sốt'),
  dish('Shumai','Xíu mại','🧺','Thịt heo, tôm, nấm đông cô, vỏ hoành thánh, trứng cá hoặc cà rốt','Băm tôm nấm → Quết nhân → Túm vỏ quanh nhân → Trang trí đỉnh → Hấp xửng tre')
 ]},
 {id:'italy',name:'Ý',subtitle:'Bột mì, cà chua và căn bếp đầy nắng',accent:'#b55b38',dishes:[
  dish('Pizza Margherita','Pizza Margherita','🍕','Bột mì, men nở, cà chua San Marzano, Mozzarella, húng quế, dầu ô-liu','Nhào bột → Xoay và kéo đế → Phết sốt xoắn ốc → Xếp Mozzarella → Nướng lò đá → Thêm húng quế và dầu'),
  dish('Spaghetti Bolognese','Mì Ý sốt bò băm','🍝','Spaghetti, thịt bò băm, hành tây, cần tây, cà rốt, cà chua, vang đỏ, Parmesan','Luộc mì → Thái rau hạt lựu → Xào thịt → Nấu rau với vang → Hầm sốt cà chua → Chan sốt và bào phô mai'),
  dish('Lasagna','Lasagna','🧀','Lá mì lasagna, sốt Bolognese, Béchamel, Mozzarella, Ricotta','Luộc lá mì → Nấu Béchamel → Quét sốt khay → Xếp các lớp → Phủ Mozzarella → Nướng vàng'),
  dish('Ravioli','Ravioli','🥟','Bột mì, trứng, rau chân vịt, Ricotta, bơ, lá xô thơm','Nhào bột trứng → Cán dải bột → Làm nhân → Chia nhân → Ép thoát khí → Cắt khuôn → Luộc và xóc bơ'),
  dish('Risotto','Cơm Ý','🍚','Gạo Arborio, nước dùng gà, vang trắng, nấm, hành tây, bơ, Parmesan','Thái nấm và hành → Rang gạo → Rót vang → Châm nước dùng và khuấy → Lặp đến dẻo mịn → Trộn bơ và Parmesan'),
  dish('Tiramisu','Tiramisu','🍰','Ladyfingers, Mascarpone, lòng đỏ trứng, đường, Espresso, cacao','Đánh trứng đường → Trộn Mascarpone → Pha cà phê → Nhúng bánh → Xếp bánh → Phết kem → Lặp tầng → Rây cacao → Làm lạnh'),
  dish('Gelato','Kem Gelato','🍨','Sữa nguyên kem, kem tươi, đường, lòng đỏ trứng, vani hoặc dâu','Đun sữa → Đánh trứng đường → Hòa sữa ấm → Nấu sệt → Làm nguội → Quay kem chậm → Múc viên')
 ]},
 {id:'mexico',name:'Mexico',subtitle:'Ngô, ớt và những sắc màu lễ hội',accent:'#d47b28',dishes:[
  dish('Tacos','Tacos','🌮','Vỏ bánh ngô, thịt bò, gia vị taco, cà chua, xà lách, Cheddar, kem chua','Thái rau → Xào bò gia vị → Làm ấm vỏ → Múc thịt → Xếp rau → Thêm phô mai và kem chua'),
  dish('Guacamole','Sốt bơ Guacamole','🥑','Bơ chín, cà chua, hành tím, Jalapeño, ngò rí, chanh, muối','Bổ và nạo bơ → Băm rau gia vị → Nghiền bơ → Thêm rau → Vắt chanh, rắc muối và trộn'),
  dish('Enchiladas','Enchiladas','🌯','Tortilla ngô, gà xé, sốt Enchilada, Monterey Jack, hành lá','Nhúng tortilla vào sốt → Đặt nhân → Cuộn chặt → Xếp khay → Rưới sốt → Phủ phô mai → Nướng'),
  dish('Quesadillas','Quesadillas','🫓','Tortilla bột mì, thịt gà hoặc bò, ớt chuông, Cheddar, Mozzarella','Đặt bánh lên chảo → Rải phô mai → Xếp nhân → Thêm phô mai → Gập bánh → Áp chảo hai mặt → Cắt tam giác'),
  dish('Tamales','Tamales','🫔','Bột ngô Masa, mỡ heo, nước luộc, thịt heo rim ớt, vỏ bắp','Ngâm vỏ bắp → Trộn bột → Quết bột lên vỏ → Đặt nhân → Gấp kín → Cột dây → Hấp'),
  dish('Chiles Rellenos','Ớt Poblano nhồi','🌶️','Ớt Poblano, phô mai, trứng, bột mì, sốt cà chua cay','Nướng cháy vỏ ớt → Lột vỏ và bỏ hạt → Nhồi phô mai → Áo bột → Đánh trứng → Nhúng ớt → Chiên vàng'),
  dish('Churros','Churros','🥨','Bột mì, nước, bơ, đường, muối, trứng, quế, chocolate','Nấu nước bơ → Khuấy bột → Đánh cùng trứng → Cho vào túi bắt kem → Bóp bột vào dầu → Vớt bánh → Lăn đường quế → Dùng với chocolate')
 ]},
 {id:'japan',name:'Nhật Bản',subtitle:'Tinh tế trong từng đường dao và cách bày món',accent:'#b54849',dishes:[
  dish('Sushi','Nigiri & Maki Roll','🍣','Gạo Nhật, giấm sushi, Nori, cá hồi hoặc cá ngừ, dưa leo, wasabi','Nấu và trộn cơm giấm → Thái cá → Nắm Nigiri → Trải cơm và nhân Maki → Cuộn mành tre → Cắt khoanh'),
  dish('Ramen','Ramen','🍜','Mì ramen, nước hầm, Chashu, trứng ngâm tương, Menma, rong biển, hành lá','Ninh nước dùng → Luộc mì → Cắt trứng → Thái Chashu → Chan nước và thả mì → Bày topping'),
  dish('Tempura','Tempura','🍤','Tôm sú, khoai lang, đậu bắp, bột mì, nước đá, dầu chiên','Khứa và ép thẳng tôm → Cắt khoai → Pha bột lạnh → Áo bột khô → Nhúng bột ướt → Chiên giòn',undefined,true)
 ]}
];
