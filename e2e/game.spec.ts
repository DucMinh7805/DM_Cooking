import {test,expect,type Page} from '@playwright/test';
async function map(page:Page,x:number,y:number){const box=await page.locator('canvas').boundingBox();if(!box)throw Error('Canvas missing');return{x:box.x+x/960*box.width,y:box.y+y/560*box.height}}
async function tap(page:Page,x:number,y:number){const p=await map(page,x,y);await page.mouse.click(p.x,p.y)}
async function drag(page:Page,ax:number,ay:number,bx:number,by:number){const a=await map(page,ax,ay),b=await map(page,bx,by);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(b.x,b.y,{steps:10});await page.mouse.up()}
async function startStep(page:Page){await page.getByRole('button',{name:'Bắt đầu',exact:true}).click();await expect(page.locator('#overlay')).toBeHidden()}
async function next(page:Page){await expect(page.locator('.review-dialog')).toBeVisible();await page.getByRole('button',{name:'Bước tiếp theo',exact:true}).click();await startStep(page)}
test('complete potstickers, unlock next dish and restore checkpoint on reload',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{name:'Giáo trình Trung Quốc'})).toBeVisible();
 await page.getByRole('button',{name:'Vào bài học đầu tiên',exact:true}).click();await startStep(page);
 await tap(page,480,350);await tap(page,310,210);await tap(page,650,210);await next(page);
 const scrubStart=await map(page,590,275);await page.mouse.move(scrubStart.x,scrubStart.y);await page.mouse.down();for(let i=1;i<=150;i++){const a=i*.25,p=await map(page,480+Math.cos(a)*110,275+Math.sin(a)*80);await page.mouse.move(p.x,p.y)}await page.mouse.up();await next(page);
 // A wrong chop must not advance the mince objective.
 await tap(page,110,110);await expect(page.locator('#feedback')).toContainText('vòng sáng');
 for(let i=0;i<18;i++)await tap(page,315+(i*83)%340,170+((i*47)%5)*48);
 await next(page);
 // Pause freezes the timer.
 await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();const before=await page.locator('#timer').textContent();await page.waitForTimeout(1100);expect(await page.locator('#timer').textContent()).toBe(before);await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();
 // Reload returns to a saved recipe step, never jumps forward.
 await page.reload();await page.getByRole('button',{name:'Tiếp tục món',exact:true}).click();await startStep(page);await expect(page.locator('#step-title')).toHaveText('Trộn đều');
 const first=await map(page,590,270);await page.mouse.move(first.x,first.y);await page.mouse.down();
 for(let i=1;i<=210;i++){const a=i*.1,p=await map(page,480+Math.cos(a)*110,270+Math.sin(a)*110);await page.mouse.move(p.x,p.y)}await page.mouse.up();await next(page);
 for(let i=0;i<70&&!await page.locator('.review-dialog').isVisible();i++){await tap(page,480,125);await page.waitForTimeout(100)}await next(page);
 await drag(page,300,275,480,180);await drag(page,660,275,480,180);await drag(page,480,390,480,275);await next(page);
 await page.waitForTimeout(7800);for(const[x,y]of [[370,220],[590,220],[370,350],[590,350]])await tap(page,x,y);await next(page);
 const pour=await map(page,480,250);await page.mouse.move(pour.x,pour.y);await page.mouse.down();await page.waitForTimeout(2900);await page.mouse.up();await next(page);
 for(const[a,b]of [[{x:185,y:185},{x:410,y:245}],[{x:185,y:365},{x:535,y:320}],[{x:775,y:275},{x:520,y:205}]])await drag(page,a.x,a.y,b.x,b.y);await expect(page.locator('.review-dialog')).toBeVisible();await page.getByRole('button',{name:'Xem thành phẩm',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Bánh xếp áp chảo hoàn thành'})).toBeVisible();await expect(page.locator('table tr')).toHaveCount(10);await page.getByRole('button',{name:'Về sảnh bếp',exact:true}).click();await expect(page.getByRole('article').filter({has:page.getByRole('heading',{name:'Gà xào Cung Bảo'})}).getByRole('button')).toBeEnabled();expect(errors).toEqual([]);await page.screenshot({path:'test-artifacts/menu.png',fullPage:true});
});
test('objective practice, retry, settings, export and reject malformed import',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Luyện tập',exact:true}).click();await page.getByRole('article').filter({has:page.getByRole('heading',{name:'Ba nếp gấp kín'})}).getByRole('button',{name:'Bắt đầu bài tập'}).click();await startStep(page);
 await drag(page,300,275,480,180);await drag(page,660,275,480,180);await drag(page,480,390,480,275);await expect(page.locator('.review-dialog')).toBeVisible();await page.getByRole('button',{name:'Thử lại',exact:true}).click();await expect(page.getByRole('button',{name:'Bắt đầu',exact:true})).toBeVisible();await page.getByRole('button',{name:'Về menu',exact:true}).click();
 await page.getByRole('button',{name:'Cài đặt',exact:true}).click();await page.getByLabel('Tắt âm thanh',{exact:true}).check();await page.reload();await page.getByRole('button',{name:'Cài đặt',exact:true}).click();await expect(page.getByLabel('Tắt âm thanh',{exact:true})).toBeChecked();
 const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Xuất bản lưu',exact:true}).click();const d=await downloading;expect(d.suggestedFilename()).toBe('World_Kitchen_Save_v2.json');
 const chooserPromise=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Nhập bản lưu',exact:true}).click();const chooser=await chooserPromise;await chooser.setFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{broken')});await page.getByRole('button',{name:'Đồng ý',exact:true}).click();await expect(page.locator('.status').last()).toContainText('SyntaxError');
});
test('iPad landscape touch selection and canvas resize',async({browser})=>{
 const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true,deviceScaleFactor:2});const page=await context.newPage();await page.goto('http://127.0.0.1:5173');await page.getByRole('button',{name:'Vào bài học đầu tiên',exact:true}).tap();await page.getByRole('button',{name:'Bắt đầu',exact:true}).tap();for(const[x,y]of [[480,350],[310,210],[650,210]]){const p=await map(page,x,y);await page.touchscreen.tap(p.x,p.y)}await expect(page.locator('.review-dialog')).toBeVisible();await page.screenshot({path:'test-artifacts/ipad-touch.png',fullPage:true});await context.close();
});
test('service shift prepares food stock, opens the shop and starts a real dish order',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Mở quầy phục vụ',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Chuẩn bị bếp trước giờ mở cửa.'})).toBeVisible();
 await page.getByRole('button',{name:'Thêm Rau củ & gia vị'}).click();await page.getByRole('button',{name:'Thêm Thịt, gạo & bột'}).click();await page.getByRole('button',{name:'Thêm Đĩa, hộp & giấy gói'}).click();
 await page.getByRole('button',{name:'Mở cửa đón khách →',exact:true}).click();await expect(page.locator('.customer-order')).toHaveCount(3);
 const dish=page.locator('.customer-order').filter({has:page.getByRole('heading',{name:'Bánh xếp giòn · suất lớn'})});await dish.getByRole('button',{name:'Nhận order và vào quầy'}).click();
 await page.getByRole('button',{name:'Bắt đầu order',exact:true}).click();await tap(page,640,245);
 await expect(page.locator('#step-title')).toHaveText('Băm rau làm nhân',{timeout:4000});await expect(page.locator('#order-strip')).toContainText('SUẤT L');
});
test('creative mode moves between different jobs without score modal',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Mở hộp bí mật',exact:true}).click();await startStep(page);
 const scrubStart=await map(page,590,275);await page.mouse.move(scrubStart.x,scrubStart.y);await page.mouse.down();for(let i=1;i<=150;i++){const a=i*.25,p=await map(page,480+Math.cos(a)*110,275+Math.sin(a)*80);await page.mouse.move(p.x,p.y)}await page.mouse.up();
 await expect(page.locator('#step-title')).toHaveText('Bào củ sen thành sợi',{timeout:4000});await expect(page.locator('.review-dialog')).toHaveCount(0);await expect(page.locator('#overlay')).toBeHidden({timeout:4000});
});
test('phone portrait and iPad portrait stay inside the viewport',async({browser})=>{
 for(const viewport of [{width:390,height:844},{width:768,height:1024}]){const context=await browser.newContext({viewport,hasTouch:true,isMobile:true,deviceScaleFactor:2});const page=await context.newPage();await page.goto('http://127.0.0.1:5173');const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,width:window.innerWidth}));expect(metrics.overflow).toBeLessThanOrEqual(1);await page.getByRole('button',{name:'Vào bài học đầu tiên',exact:true}).tap();await page.getByRole('button',{name:'Bắt đầu',exact:true}).tap();const canvas=await page.locator('canvas').boundingBox();expect(canvas).not.toBeNull();expect(canvas!.width).toBeLessThanOrEqual(metrics.width+1);expect(canvas!.height).toBeGreaterThan(200);await context.close()}
});
