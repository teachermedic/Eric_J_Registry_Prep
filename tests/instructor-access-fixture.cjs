// Test-only configuration; never deployed as the site's password configuration.
const crypto=require('node:crypto');
const password='Workshop browser test password!',salt=Buffer.from('0123456789abcdef');
const config={version:1,configured:true,iterations:210000,salt:salt.toString('base64'),verifier:crypto.pbkdf2Sync(password,salt,210000,32,'sha256').toString('base64')};
exports.configure=ctx=>ctx.route('**/instructor-access-config.js',r=>r.fulfill({contentType:'text/javascript',body:'window.INSTRUCTOR_ACCESS_CONFIG='+JSON.stringify(config)+';'}));
exports.unlock=async page=>{await page.locator('#qa-unlock').click();await page.locator('#access-password').fill(password);await page.getByRole('button',{name:'Unlock workshop',exact:true}).click();await page.locator('#qa-form').waitFor({state:'visible'});};
