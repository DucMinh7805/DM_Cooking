import type {Kind,Recipe,Step} from '../types';
export const kinds:Kind[]=['slice','dice','mince','mix','fold','boil','find','pour','fry','wash','season','plate','grate','knead','assemble'];
export function step(kind:Kind,ingredient='rau củ'):Step {
 const defs:Record<Kind,[string,string,number,number,number]>={
 slice:['Thái nguyên liệu','Kéo từ điểm vàng tới điểm xanh theo đường cắt',6,30,75],
 dice:['Cắt hạt lựu','Cắt 5 đường dọc, sau đó 4 đường ngang',9,40,90],
 mince:['Băm nguyên liệu','Chạm đúng nhịp dao trên toàn bộ vùng nguyên liệu',18,28,55],
 mix:['Trộn đều','Kéo vòng quanh tô theo một chiều; tránh đi qua tâm',3,25,75],
 fold:['Gấp há cảo','Kéo điểm vàng sang vùng màu xanh',3,30,75],
 boil:['Canh nhiệt','Dùng thanh nhiệt, giữ vùng xanh 50–75 đủ 10 giây',10,25,75],
 find:['Chọn nguyên liệu','Chạm đúng nguyên liệu được yêu cầu, theo thứ tự',3,20,60],
 pour:['Rót nước sốt','Giữ trong vùng bình để rót; thả khi thanh nằm trong vùng xanh',1,15,60],
 fry:['Áp chảo','Chạm từng miếng khi vòng nấu nằm trong vùng xanh',4,20,65],
 wash:['Rửa nguyên liệu','Giữ và chà qua toàn bộ bề mặt đến khi sạch',8,24,60],
 season:['Nêm theo nhịp','Chạm hũ gia vị khi kim chạy qua vùng xanh',4,18,55],
 plate:['Bày đĩa','Kéo từng thành phần vào đúng vùng trên đĩa',3,24,70],
 grate:['Bào nguyên liệu','Kéo nguyên liệu lên xuống trên mặt bào; giữ nhịp đều tay',8,20,55],
 knead:['Nhào bột','Đẩy và gập khối bột luân phiên sang hai phía',6,28,70],
 assemble:['Lắp ráp món','Kéo topping từ khay vào món; tự chọn vị trí trình bày',6,30,80]};
 const[n,h,t,pa,li]=defs[kind];return{id:kind,kind,name:n,hint:h,ingredient,target:t,par:pa,limit:li};
}
export const recipes:Recipe[]=[
 {id:'dumplings',name:'Bánh xếp áp chảo',country:'Trung Quốc',emoji:'🥟',art:'/assets/dishes/potstickers-v1.png',description:'Potstickers nhân thịt rau, đáy vàng giòn và lớp vỏ hấp mềm.',steps:[step('find'),{...step('wash','bắp cải'),name:'Rửa bắp cải giòn sạch'}, {...step('mince','bắp cải và hành lá'),name:'Băm rau làm nhân'},step('mix','nhân thịt'),step('season','nhân bánh'),step('fold'),step('fry','bánh xếp'),{...step('pour','nước'),name:'Châm nước hấp',hint:'Giữ để châm nước vào chảo; thả khi lượng nước nằm trong vùng xanh'},step('plate','bánh xếp')]},
 {id:'chicken',name:'Gà xào Cung Bảo',country:'Trung Quốc',emoji:'🍗',art:'/assets/dishes/kung-pao-v1.png',description:'Gà xào lửa lớn cùng ớt khô, sốt đậm và đậu phộng rang.',requires:'dumplings',steps:[step('find'),{...step('dice','thịt gà'),target:14,name:'Cắt gà hạt lựu nhỏ',hint:'Cắt 8 đường dọc và 6 đường ngang; lát càng đều điểm càng cao'},{...step('slice','tỏi và ớt'),target:12,name:'Thái tỏi ớt thật mỏng',hint:'Thái 12 lát mỏng, đều tay theo đường dẫn'},step('season','thịt gà'),step('fry','thịt gà'),step('pour','sốt Cung Bảo'),step('mix','gà và đậu phộng'),step('plate','gà Cung Bảo')]},
 {id:'rice',name:'Cơm chiên rau củ',country:'Trung Quốc',emoji:'🍚',art:'/assets/dishes/fried-rice-v1.png',description:'Rau giòn, hạt cơm tơi và một chảo nóng có mùi thơm rang.',requires:'chicken',steps:[step('find'),{...step('wash','gạo'),name:'Vo gạo trong nước sạch'},{...step('dice','cà rốt'),target:14,name:'Cắt cà rốt hạt lựu mịn',hint:'Cắt dày vừa đủ để tạo hạt lựu nhỏ và đều'},step('fry','rau củ'),step('season','cơm chiên'),step('mix','cơm và rau củ'),step('plate','cơm chiên')]}
];
