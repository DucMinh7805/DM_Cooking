import type {MiniEngine} from '../minigames/engine';

const TAU=Math.PI*2;
const prepStation=typeof Image==='undefined'?null:new Image();
const cooktopStation=typeof Image==='undefined'?null:new Image();
const pantryStation=typeof Image==='undefined'?null:new Image();
const pastryStation=typeof Image==='undefined'?null:new Image();
const platingStation=typeof Image==='undefined'?null:new Image();
const washStation=typeof Image==='undefined'?null:new Image();
const asset=(path:string)=>`${import.meta.env.BASE_URL}${path}`;
if(prepStation)prepStation.src=asset('assets/kitchen/prep-station-v1.png');
if(cooktopStation)cooktopStation.src=asset('assets/kitchen/cooktop-station-v1.png');
if(pantryStation)pantryStation.src=asset('assets/kitchen/pantry-station-v1.png');
if(pastryStation)pastryStation.src=asset('assets/kitchen/pastry-station-v1.png');
if(platingStation)platingStation.src=asset('assets/kitchen/plating-station-v1.png');
if(washStation)washStation.src=asset('assets/kitchen/wash-station-v1.png');

export function drawKitchen(c:CanvasRenderingContext2D,e:MiniEngine,hints:boolean,motion:boolean,time:number){
 const box=(x:number,y:number,w:number,h:number,r:number,color:string,stroke='')=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
 const circle=(x:number,y:number,r:number,color:string,stroke='')=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
 const ellipse=(x:number,y:number,rx:number,ry:number,color:string,stroke='')=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
 const text=(t:string,x:number,y:number,size=22,color='#244a3c',weight=800)=>{c.font=`${weight} ${size}px Inter, ui-rounded, system-ui, sans-serif`;c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.fillText(t,x,y)};
 const line=(ax:number,ay:number,bx:number,by:number,color:string,width=5)=>{c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(ax,ay);c.lineTo(bx,by);c.stroke()};
 const shadow=(blur=20,color='#24190f55',y=10)=>{c.shadowBlur=blur;c.shadowColor=color;c.shadowOffsetY=y};
 const clearShadow=()=>{c.shadowBlur=0;c.shadowColor='transparent';c.shadowOffsetY=0};
 const pulse=motion?1+Math.sin(time/180)*.08:1;
 const k=e.step.kind,isCooktop=k==='boil'||k==='fry'||k==='pour'||k==='season';

 const station=(k==='find'||k==='choose')?pantryStation:k==='wash'?washStation:(k==='fold'||k==='knead'||k==='grate')?pastryStation:(k==='plate'||k==='assemble')?platingStation:isCooktop?cooktopStation:prepStation;
 drawStation(station,isCooktop);
 drawTaskBadge();

 if(k==='slice'||k==='dice')drawCutting();
 else if(k==='mince')drawMincing();
 else if(k==='mix')drawMixing();
 else if(k==='fold')drawFolding();
 else if(k==='boil')drawBoiling();
 else if(k==='find')drawPantry();
 else if(k==='choose')drawPortionChoice();
 else if(k==='pour')drawPouring();
 else if(k==='fry')drawFrying();
 else if(k==='wash')drawWashing();
 else if(k==='season')drawSeasoning();
 else if(k==='plate')drawPlating();
 else if(k==='grate')drawGrating();
 else if(k==='knead')drawKneading();
 else if(k==='assemble')drawAssembly();

 if(e.last&&k!=='mix'&&k!=='slice'&&k!=='dice'){circle(e.last.x,e.last.y,13,'#ffffffd9','#174b3b');circle(e.last.x,e.last.y,4,'#174b3b')}

 function drawStation(image:HTMLImageElement|null,cooktop:boolean){
  c.clearRect(0,0,960,560);
  if(image?.complete&&image.naturalWidth){c.drawImage(image,0,0,960,560);return}
  const fallback=c.createLinearGradient(0,0,0,560);fallback.addColorStop(0,'#174438');fallback.addColorStop(.22,cooktop?'#eadcc4':'#cf9965');fallback.addColorStop(1,cooktop?'#bba184':'#8c5c38');c.fillStyle=fallback;c.fillRect(0,0,960,560);
  shadow(25,'#06181166',12);box(78,78,804,432,34,cooktop?'#242827':'#e2b77d',cooktop?'#b9875c':'#f2d5a8');clearShadow();
 }
 function drawTaskBadge(){
  const labels:Record<typeof k,string>={slice:'KỸ THUẬT DAO',dice:'CẮT HẠT LỰU',mince:'BĂM NHUYỄN',mix:'TRỘN ĐỀU',fold:'TẠO HÌNH',boil:'KIỂM SOÁT NHIỆT',find:'MISE EN PLACE',choose:'ĐỌC PHIẾU ORDER',pour:'ĐỊNH LƯỢNG',fry:'CANH ĐỘ CHÍN',wash:'RỬA & LÀM SẠCH',season:'NÊM THEO NHỊP',plate:'TRÌNH BÀY MÓN',grate:'BÀO THÀNH SỢI',knead:'NHÀO & GẬP BỘT',assemble:'LẮP RÁP TỰ DO'};
  box(32,22,168,34,17,'#143d32e8','#ffffff33');text(labels[k],116,39,11,'#fff1c8',900);
 }
 function drawKnife(x:number,y:number,angle:number){
  c.save();c.translate(x,y);c.rotate(angle);shadow(10,'#15201f55',5);box(-13,-88,26,70,7,'#273f3b');box(-17,-28,34,13,5,'#c9984d');c.fillStyle='#e8ece7';c.beginPath();c.moveTo(-7,-16);c.lineTo(12,-16);c.lineTo(8,78);c.lineTo(-7,63);c.closePath();c.fill();c.strokeStyle='#ffffffaa';c.lineWidth=2;c.stroke();clearShadow();c.restore();
 }
 function drawCutting(){
  const chicken=e.step.ingredient.includes('thịt gà'),aromatics=e.step.ingredient.includes('tỏi')||e.step.ingredient.includes('ớt'),carrot=e.step.ingredient.includes('cà rốt');
  shadow(17,'#4b2e1855',8);
  if(chicken){
   box(280,151,400,218,70,'#cb775f');box(302,169,354,176,57,'#eda58d');
   for(let i=0;i<10;i++)ellipse(330+(i%5)*70,205+Math.floor(i/5)*92,18,10,'#f6c2a7aa');
  }else if(aromatics){
   for(let i=0;i<7;i++){c.save();c.translate(320+i*52,270+(i%2)*22);c.rotate(i%2?.22:-.16);ellipse(0,0,31,20,i%3?'#ead8ae':'#b9362c','#8d281f55');c.restore()}
  }else if(carrot){
   const g=c.createLinearGradient(285,0,670,0);g.addColorStop(0,'#f7aa43');g.addColorStop(1,'#d85a22');c.fillStyle=g;c.beginPath();c.roundRect(285,161,390,195,48);c.fill();
   for(let i=0;i<18;i++)line(315+(i*37)%330,188+((i*29)%5)*33,325+(i*37)%330,195+((i*29)%5)*33,'#f8c06f55',3);
  }else{
   for(let i=0;i<12;i++){c.save();c.translate(480,266);c.rotate(i*.45);ellipse(0,-57,128,68,i%2?'#7d9e5d':'#a7c675');c.restore()}circle(480,266,70,'#dce8a5');
  }
  clearShadow();
  e.lines().forEach(([a,b],i)=>{
   if(i<e.accepted){line(a.x,a.y,b.x,b.y,'#713f27aa',3);if(k==='slice'){const dx=(i-e.accepted/2)*4;line(a.x+dx,a.y+8,b.x+dx,b.y-8,'#fff4d055',2)}}
   else if(hints){c.setLineDash(i===e.accepted?[13,9]:[3,13]);line(a.x,a.y,b.x,b.y,i===e.accepted?'#fff7c5':'#ffffff55',i===e.accepted?7:2);c.setLineDash([]);if(i===e.accepted){c.save();c.translate(a.x,a.y);c.scale(pulse,pulse);circle(0,0,18,'#ffc857','#fff4bd');c.restore();circle(b.x,b.y,20,'#246f56','#a8e5ba')}}
  });
  const current=e.lines()[Math.min(e.accepted,e.lines().length-1)];if(current){const[a,b]=current,p=e.last??{x:a.x,y:a.y+48};drawKnife(p.x+(a.x===b.x?28:0),p.y+(a.y===b.y?28:0),a.x===b.x?0:-Math.PI/2)}
  box(336,429,288,42,21,'#173f34e8','#ffffff22');text(`${e.step.ingredient.toUpperCase()} · ${e.accepted}/${e.step.target}`,480,450,15,'#fff1cf',900);
 }
 function drawMincing(){
  shadow(18,'#57351d44',8);ellipse(480,292,202,92,'#4e6d3d55');clearShadow();
  const colors=['#315c34','#527d43','#78a454','#abc671','#d0bc48'];for(let i=0;i<128;i++){const x=320+(i*67)%320,y=188+((i*41)%6)*33+(i%3)*5;c.save();c.translate(x,y);c.rotate((i%7)*.31);ellipse(0,0,7+(i%5)*2,4+(i%3)*2,colors[i%colors.length]);c.restore()}
  e.minceHits.forEach((p,i)=>{line(p.x-17,p.y+12,p.x+14,p.y-15,'#f3efd6',3);for(let j=0;j<3;j++)circle(p.x-11+j*11,p.y+18+(j%2)*5,3,'#315d34')});
  const target=e.mincePoints()[e.accepted];if(target&&hints){c.save();c.translate(target.x,target.y);c.scale(pulse,pulse);circle(0,0,28,'#f2be4299','#fff1a8');text('↓',0,-2,24,'#234d3c');c.restore()}
  drawKnife((target??e.last??{x:480,y:270}).x+25,(target??e.last??{x:480,y:270}).y-12,-.16);
  box(326,429,308,42,21,'#173f34e8');text(`${e.accepted} / ${e.step.target} NHÁT BĂM ĐỀU`,480,450,15,'#fff1cf',900);
 }
 function drawMixing(){
  shadow(24,'#33221766',11);ellipse(480,281,203,177,'#294f4a');ellipse(480,267,185,160,'#f4ead6');ellipse(480,267,156,129,'#907d45');clearShadow();
  const colors=['#eea44a','#3f733e','#f2cf6a','#c74e3d','#efe4bd'];for(let i=0;i<58;i++){const a=i*2.399+(motion?e.amount*1.1:0),r=24+(i%7)*17;ellipse(480+Math.cos(a)*r,267+Math.sin(a)*r,7+(i%3),5+(i%2),colors[i%colors.length])}
  if(hints){c.setLineDash([12,12]);c.strokeStyle='#fff0a8';c.lineWidth=5;c.beginPath();c.arc(480,267,111,0,TAU);c.stroke();c.setLineDash([]);text('↻',480,267,50,'#fff0a899')}
  const spoon=e.last??{x:585,y:267};line(480,267,spoon.x,spoon.y,'#76502d',18);ellipse(spoon.x,spoon.y,19,26,'#b98b53','#ead0a4');
  box(366,445,228,38,19,'#173f34e8');text(`${e.amount.toFixed(1)} / ${e.step.target} VÒNG`,480,464,15,'#fff1cf',900);
 }
 function drawFolding(){
  shadow(20,'#4d321d55',9);ellipse(480,278,207,139,'#f4dfaf','#cfae72');clearShadow();
  if(e.accepted<3){ellipse(480,281,76,53,'#648552');for(let i=0;i<20;i++){const a=i/20*TAU;circle(480+Math.cos(a)*56,281+Math.sin(a)*37,6,i%3?'#a8633e':'#e3a447')}}
  if(e.accepted>=1){c.fillStyle='#f8e8bd';c.beginPath();c.moveTo(275,278);c.quadraticCurveTo(360,174,480,180);c.lineTo(480,362);c.quadraticCurveTo(350,356,275,278);c.fill()}
  if(e.accepted>=2){c.fillStyle='#f5dfa9';c.beginPath();c.moveTo(685,278);c.quadraticCurveTo(600,174,480,180);c.lineTo(480,362);c.quadraticCurveTo(610,356,685,278);c.fill()}
  if(e.accepted>=3){ellipse(480,271,205,98,'#f1d798','#c6a064');for(let i=0;i<9;i++)line(320+i*40,254,338+i*35,222,'#c79f64',5)}
  if(!e.done&&hints){const[a,b]=e.folds()[e.accepted];c.setLineDash([9,10]);line(a.x,a.y,b.x,b.y,'#805d39',5);c.setLineDash([]);c.save();c.translate(a.x,a.y);c.scale(pulse,pulse);circle(0,0,29,'#f5bd3f','#fff2b6');c.restore();circle(b.x,b.y,31,'#267257aa','#b5e2ba')}
  box(350,433,260,40,20,'#173f34e8');text(`NẾP GẤP ${e.accepted} / 3`,480,453,16,'#fff1cf',900);
 }
 function drawBoiling(){
  shadow(24,'#090d0d88',12);ellipse(480,285,246,198,'#1d282a');box(212,244,70,72,18,'#202b2d');box(678,244,70,72,18,'#202b2d');ellipse(480,273,218,171,'#697779');ellipse(480,264,199,146,'#71b7c3','#c7e3e3');clearShadow();
  for(let i=0;i<5;i++){const a=i/5*TAU+(motion?time/2600:0);const x=480+Math.cos(a)*112,y=264+Math.sin(a)*72;drawDumpling(x,y,38,(a+.5)*.1)}
  const steamAmount=Math.max(0,(e.temperature-38)/55);for(let i=0;i<22*steamAmount;i++){const lift=motion?(time/17+i*29)%130:55;circle(300+(i*53)%360,238-lift*.55,3+(i%4),'#f3ffff99')}
  meter(280,463,400,26,e.temperature/100,.5,.75);text(`NHIỆT ${e.temperature.toFixed(0)}°`,480,516,19,'#173f34',900);
 }
 function drawDumpling(x:number,y:number,size:number,rotation=0){
  c.save();c.translate(x,y);c.rotate(rotation);shadow(7,'#263b3155',4);c.fillStyle='#f5dfac';c.beginPath();c.moveTo(-size,10);c.quadraticCurveTo(0,-size,size,10);c.quadraticCurveTo(0,size*.8,-size,10);c.fill();c.strokeStyle='#cfa968';c.lineWidth=3;c.stroke();for(let j=-2;j<=2;j++)line(j*10,-7,j*7-4,6,'#c49b60',2);clearShadow();c.restore();
 }
 function drawPantry(){
  const labels=['Cà rốt','Sữa','Trứng','Chanh','Cải thảo','Cà chua'],target=[4,0,2][Math.min(e.accepted,2)];box(327,73,306,48,24,'#173f34e8','#ffffff33');text(`CHỌN: ${labels[target].toUpperCase()}`,480,97,18,'#fff1c8',900);
  labels.forEach((label,i)=>{const x=310+(i%3)*170,y=224+Math.floor(i/3)*148;shadow(12,'#5b3d2655',6);box(x-70,y-56,140,118,22,i===target?'#fff6da':'#fffaf0',i===target?'#e1ad39':'#d9c39e');clearShadow();drawIngredient(i,x,y-8);text(label,x,y+43,14,'#274b3d',800)});
 }
 function drawPortionChoice(){
  const portions=[{x:330,y:300,rx:80,ry:48,label:'S',count:3},{x:480,y:280,rx:105,ry:62,label:'M',count:5},{x:650,y:255,rx:132,ry:78,label:'L',count:7}],wanted=e.step.ingredient.includes('L')||e.step.ingredient.includes('lớn')?'L':e.step.ingredient.includes('S')||e.step.ingredient.includes('nhỏ')?'S':'M';
  box(268,70,424,58,22,'#173f34e8','#ffffff33');text(`ORDER: BÁNH XẾP · SUẤT ${wanted}`,480,99,18,'#fff1c8',900);
  portions.forEach(({x,y,rx,ry,label,count})=>{const target=label===wanted;shadow(14,'#3b2a1c55',7);ellipse(x,y,rx,ry,target?'#fff4cf':'#f7f0df',target?'#efbd4f':'#cfc3aa');clearShadow();for(let i=0;i<count;i++){const a=i/count*TAU;drawDumpling(x+Math.cos(a)*rx*.5,y+Math.sin(a)*ry*.45,18,(i%3-.5)*.14)}text(label,x,y+ry+28,24,target?'#ffe08a':'#fff4d8',900)});
  if(hints){const target=portions.find(c=>c.label===wanted)!;c.save();c.translate(target.x,target.y-target.ry-24);c.scale(pulse,pulse);circle(0,0,20,'#efbd4f','#fff4b7');text('↓',0,1,19,'#214f40');c.restore()}
  box(304,486,352,40,20,'#173f34e8');text('ĐỌC ORDER · CHỌN ĐÚNG KHẨU PHẦN',480,506,14,'#fff1cf',900);
 }
 function drawIngredient(i:number,x:number,y:number){
  c.save();c.translate(x,y);
  if(i===0){c.rotate(-.3);c.fillStyle='#e87828';c.beginPath();c.moveTo(-30,-17);c.quadraticCurveTo(20,-28,38,0);c.quadraticCurveTo(4,22,-30,17);c.closePath();c.fill();for(let j=0;j<3;j++)line(-31,-5+j*5,-45-j*6,-19+j*10,'#438349',5)}
  if(i===1){box(-25,-34,50,69,9,'#f4f0df','#9ab7bc');box(-21,-28,42,10,4,'#c9dfe1');box(-15,-45,30,14,4,'#6c9298')}
  if(i===2){ellipse(0,2,30,39,'#f4e5bb','#c7a66b');ellipse(-8,-10,8,12,'#fff9df99')}
  if(i===3){circle(0,2,33,'#edc94d','#b99b30');for(let a=0;a<TAU;a+=TAU/8)line(Math.cos(a)*6,Math.sin(a)*6,Math.cos(a)*27,Math.sin(a)*27,'#fff0a0',2)}
  if(i===4){for(let j=0;j<7;j++){c.save();c.rotate(j*.85);ellipse(0,-12,28,36,j%2?'#6fa454':'#91bd69','#4f7f40');c.restore()}circle(0,0,11,'#dbe39a')}
  if(i===5){circle(0,3,34,'#d94735','#a62b25');for(let j=0;j<5;j++){c.save();c.rotate(j*TAU/5);ellipse(0,-31,7,15,'#4a873f');c.restore()}}
  c.restore();
 }
 function drawPouring(){
  const amount=Math.min(1,e.pour),water=e.step.ingredient==='nước';
  shadow(18,'#060a0a88',8);ellipse(480,369,164,73,'#333d3e');ellipse(480,357,147,57,water?'#6fa7ad':'#7d2f26','#b6c7c5');clearShadow();
  c.save();c.translate(480,205);c.rotate(e.pressed?-.38:0);box(-55,-72,110,137,22,water?'#b9d9dc':'#7e3028','#f3ead2');box(-36,-92,72,30,8,'#d2b27b');box(43,-45,70,25,12,'#c7c4b5');c.restore();
  if(e.pressed){const streamX=522;c.fillStyle=water?'#a7e2e5bb':'#a9432dcc';c.beginPath();c.moveTo(streamX,231);c.quadraticCurveTo(streamX+22,285,500,326);c.lineTo(490,326);c.quadraticCurveTo(streamX+8,278,streamX-8,230);c.fill()}
  for(let i=0;i<10*amount;i++)circle(410+(i*31)%145,346+(i%3)*9,4,water?'#d9ffff99':'#ef9a6f99');
  box(278,74,404,43,21,'#173f34e8');text(water?'GIỮ BÌNH ĐỂ CHÂM NƯỚC':'GIỮ BÌNH ĐỂ RÓT SỐT',480,95,15,'#fff1c8',900);meter(280,461,400,26,amount,.58,.78);
 }
 function drawFrying(){
  shadow(25,'#080b0b99',12);ellipse(480,285,225,207,'#171c1e');box(665,262,162,48,18,'#171c1e');ellipse(480,278,198,178,'#38403f','#7e8985');ellipse(480,278,178,157,'#5b4d34');clearShadow();
  const pos=[[370,220],[590,220],[370,350],[590,350]];pos.forEach(([x,y],i)=>{const cooked=e.fryDone[i],over=e.fry[i]>.8,doneness=Math.min(1,e.fry[i]);const light=75-doneness*34;const color=cooked?'#a9642f':over?'#5b3025':`hsl(37 68% ${light}%)`;if(e.step.ingredient.includes('bánh'))drawDumpling(x,y,48,(i%2-.5)*.2);else{shadow(8,'#19120d66',4);box(x-48,y-37,96,74,23,color,'#6c3e27');clearShadow();for(let j=0;j<5;j++)circle(x-29+j*14,y-14+(j%2)*28,5,cooked?'#df9b49':'#efd08a')}
   if(!cooked){for(let j=0;j<5;j++){const a=j*1.3+time/550;circle(x+Math.cos(a)*54,y+Math.sin(a)*44,3+(j%2),'#f5dc8baa')}}else{text('✓',x,y,35,'#fff4cd')}
   c.lineWidth=8;c.lineCap='round';c.strokeStyle='#69b47a';c.beginPath();c.arc(x,y,60,Math.PI/2,Math.PI*1.1);c.stroke();c.strokeStyle=over?'#ef6650':'#f0bd4c';c.beginPath();c.arc(x,y,60,-Math.PI/2,-Math.PI/2+doneness*TAU);c.stroke();
  });
  box(322,488,316,40,20,'#173f34e8');text('CHẠM MỖI MIẾNG TRONG VÙNG XANH',480,508,13,'#fff1c8',900);
 }
 function drawWashing(){
  shadow(24,'#10271f66',10);ellipse(480,282,235,164,'#dbe5c7','#f7f3d5');clearShadow();
  for(let i=0;i<18;i++){c.save();c.translate(480,278);c.rotate(i*.55);ellipse(0,-78,132,52,i%2?'#66a653':'#8fc56b','#386c3c');c.restore()}
  const clean=Math.min(1,e.progress);for(let i=0;i<16;i++){const a=i*2.31,r=28+(i%5)*31;if(clean<(i+1)/16){circle(480+Math.cos(a)*r,278+Math.sin(a)*r*.62,8+(i%3),'#775435aa')}}
  for(const [i,p] of e.washTrail.entries()){circle(p.x,p.y,5+(i%4)*2,`rgba(221,250,255,${.12+i/e.washTrail.length*.35})`,'#ffffff55')}
  if(e.pressed&&e.last){circle(e.last.x,e.last.y,32,'#f0c16cdd','#fff7cf');text('↺',e.last.x,e.last.y,24,'#315b48')}
  if(hints&&!e.pressed){c.save();c.translate(480,278);c.scale(pulse,pulse);circle(0,0,44,'#f1bd4a99','#fff0aa');text('CHÀ',480,278,13,'#244e3d');c.restore()}
  meter(310,473,340,24,e.progress,0,1);text(`${Math.round(clean*100)}% SẠCH`,480,520,16,'#fff5da',900);
 }
 function drawSeasoning(){
  shadow(24,'#090d0d88',12);ellipse(480,292,222,184,'#171c1e');ellipse(480,284,194,155,'#444744','#8b948d');ellipse(480,284,174,135,'#9a4e2f');clearShadow();
  for(let i=0;i<28;i++){const a=i*2.4;circle(480+Math.cos(a)*(25+(i%6)*19),284+Math.sin(a)*(18+(i%5)*13),5+(i%3),i%3?'#d99245':'#4d873f')}
  const x=300+e.seasonNeedle*360;box(280,455,400,30,15,'#d7c3a5dd');box(435,455,86,30,0,'#58a86e');circle(x,470,19,'#173f34','#fff3cf');
  c.save();c.translate(480,125);c.rotate(e.pressed?.28:-.12);box(-45,-42,90,84,22,'#c48a4c','#f3d69c');for(let i=0;i<7;i++)circle(-24+i*8,37+(i%2)*5,3,'#fff0bf');c.restore();
  text('CHẠM HŨ GIA VỊ TRONG VÙNG XANH',480,522,13,'#fff3d2',900);text(`${e.accepted}/${e.step.target}`,480,284,29,'#fff2c7',900);
 }
 function drawPlating(){
  const moves=e.plateMoves(),colors=['#d66a3f','#e1b952','#61a66c'];
  moves.forEach(([from,to],i)=>{
   const placed=i<e.accepted,x=placed?to.x:from.x,y=placed?to.y:from.y;
   shadow(9,'#06150f66',5);if(i===0){for(let j=0;j<4;j++)ellipse(x+(j-1.5)*27,y+(j%2)*8,28,17,'#d78643','#8f4b2e')}else if(i===1){ellipse(x,y,58,30,'#f0c765','#af852b');for(let j=0;j<9;j++)circle(x-42+j*10,y+(j%2)*9,4,'#fff0a8')}else{for(let j=0;j<8;j++){const a=j/8*TAU;ellipse(x+Math.cos(a)*34,y+Math.sin(a)*23,13,6,'#55a365')}}clearShadow();
   if(!placed&&i===e.accepted&&hints){c.setLineDash([10,9]);line(from.x,from.y,to.x,to.y,'#fff0a8',5);c.setLineDash([]);circle(from.x,from.y,38,'#f1bd4a55','#fff0aa');circle(to.x,to.y,42,'#4a9b6566','#c9f0c9')}
   if(placed){circle(to.x+45,to.y-33,14,colors[i],'#fff5d8');text('✓',to.x+45,to.y-33,14,'#fff')}
  });
  box(341,478,278,39,20,'#173f34e8');text(`BỐ CỤC ${e.accepted} / ${e.step.target}`,480,498,15,'#fff1cf',900);
 }
 function drawGrating(){
  shadow(22,'#2a211855',10);box(388,125,184,300,28,'#b7c2bd','#f4f1de');clearShadow();
  for(let y=160;y<396;y+=33)for(let x=420;x<552;x+=32){ellipse(x,y,7,11,'#6c7977');line(x-5,y-8,x+4,y-14,'#e9efea',2)}
  const forward=e.accepted%2===0,progress=e.progress,length=142-progress*62,y=forward?170+progress*190:370-progress*190;
  c.save();c.translate(480,y);c.rotate(.08);box(-25,-length/2,50,length,22,'#e7802e','#bb5523');for(let i=0;i<4;i++)line(-17+i*11,-length/2+8,-17+i*11,length/2-8,'#f3aa57',2);c.restore();
  for(let i=0;i<e.accepted*4;i++){const x=350+(i*43)%260,yy=430+(i%3)*11;c.save();c.translate(x,yy);c.rotate((i%5)*.31);ellipse(0,0,18,3,'#eb9b4b');c.restore()}
  if(hints){const from=forward?{x:480,y:150}:{x:480,y:385},to=forward?{x:480,y:385}:{x:480,y:150};c.setLineDash([11,9]);line(from.x,from.y,to.x,to.y,'#fff2a8',6);c.setLineDash([]);circle(from.x,from.y,22,'#efbd4f','#fff5b9');circle(to.x,to.y,23,'#37825e','#bcebc7')}
  box(338,478,284,39,20,'#173f34e8');text(`LƯỢT BÀO ${e.accepted} / ${e.step.target}`,480,498,15,'#fff1cf',900);
 }
 function drawKneading(){
  const squash=.82+Math.sin(e.accepted*.9)*.12,move=e.accepted%2?35:-35;
  shadow(22,'#5b391f55',10);ellipse(480+move,286,175*squash,112/squash,'#ecd19a','#b8894e');clearShadow();
  for(let i=0;i<7;i++){const a=i/7*TAU;ellipse(480+move+Math.cos(a)*105*squash,286+Math.sin(a)*62/squash,25,10,'#f7e6be55')}
  const current=e.kneadMoves()[Math.min(e.accepted,e.step.target-1)];if(current&&hints){const[a,b]=current;c.setLineDash([12,10]);line(a.x,a.y,b.x,b.y,'#765432',7);c.setLineDash([]);circle(a.x,a.y,28,'#efbd4f','#fff4b7');circle(b.x,b.y,31,'#37825e99','#c5edc8');text(e.accepted%2?'←':'→',480,286,50,'#7b5630aa')}
  for(let i=0;i<16;i++)circle(310+(i*59)%340,168+((i*43)%5)*64,2+(i%3),'#fff5db99');
  box(341,469,278,40,20,'#173f34e8');text(`LẦN NHÀO ${e.accepted} / ${e.step.target}`,480,489,15,'#fff1cf',900);
 }
 function drawAssembly(){
  shadow(22,'#07171166',9);ellipse(540,280,184,166,'#e5bd78','#a87537');ellipse(540,280,161,143,'#c94f38','#f0a069');ellipse(540,280,146,128,'#f0d078');clearShadow();
  const sources=[{x:170,y:175,c:'#c74736',label:'ĐỎ'},{x:170,y:280,c:'#f0d25e',label:'VÀNG'},{x:170,y:385,c:'#56a066',label:'XANH'}];sources.forEach((s,i)=>{box(s.x-74,s.y-42,148,84,20,'#fff7e8dd',i===e.accepted%3?'#f2c258':'#d8c6a7');for(let j=0;j<5;j++)circle(s.x-42+j*21,s.y,s.c==='#56a066'?10:8,s.c);text(s.label,s.x,s.y+28,9,'#345345',900)});
  e.placed.forEach((p,i)=>{const colors=['#c74736','#f0d25e','#56a066'],color=colors[i%3];if(i%3===2){for(let j=0;j<4;j++){c.save();c.translate(p.x,p.y);c.rotate(j*TAU/4);ellipse(0,-9,6,13,color);c.restore()}}else circle(p.x,p.y,14+(i%2)*2,color,'#fff4d2')});
  const source=sources[e.accepted%3];if(hints&&!e.done){c.setLineDash([10,10]);line(source.x,source.y,540,280,'#fff0a8',5);c.setLineDash([]);circle(source.x,source.y,28,'#efbd4f66','#fff2aa');c.strokeStyle='#a9e6b7';c.lineWidth=5;c.beginPath();c.arc(540,280,168,0,TAU);c.stroke()}
  box(310,476,340,41,20,'#173f34e8');text(`TỰ BỐ TRÍ TOPPING · ${e.accepted}/${e.step.target}`,480,497,14,'#fff1cf',900);
 }
 function meter(x:number,y:number,w:number,h:number,value:number,from:number,to:number){
  box(x,y,w,h,h/2,'#d8c5a4dd');box(x+w*from,y,w*(to-from),h,0,'#5aa36f');
  const px=x+Math.max(0,Math.min(1,value))*w;shadow(8,'#173d3355',3);circle(px,y+h/2,h*.7,'#173f34','#fff3cf');clearShadow();
 }
}
