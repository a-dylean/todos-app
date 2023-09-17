import { Selector } from 'testcafe';

fixture `A set of tests for functionality of App component`
    .page `https://todos-app-git-main-a-dylean.vercel.app/`;

const task = Selector('#task');
const tasksList = Selector('#root .MuiList-root.MuiList-padding.css-1ontqvh');
    
test('Input text created', async (t: TestController) => {
    await t
        .typeText(task, 'send email')
        .expect(task.value).eql('send email');   
});

test('Tasks added to the list', async (t: TestController) => {
    await t
    .typeText(task, 'send email')
    .pressKey('enter')
    .typeText(task, 'cook dinner')
    .click('#root div div form div div div button svg path')
    .expect(tasksList.textContent).eql('send emailcook dinner');
})

test('Task is checked', async (t: TestController) => {
    await t
    .typeText(task, 'send email')
    .pressKey('enter')
    .typeText(task, 'cook dinner')
    .click('#root div div form div div div button svg path')
    .click(Selector('#root [class^="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubb"]').nth(1))
    .expect(Selector('#root p').textContent).eql('1 items left')
    .click(Selector('#root button').withText('ACTIVE'))
    .expect(tasksList.textContent).eql('cook dinner')
    .click(Selector('#root button').withText('COMPLETED'))
    .expect(tasksList.textContent).eql('send email')
})

test('Task is deleted', async (t: TestController) => {
    await t
    .typeText(task, 'cook dinner')
    .click('#root div div form div div div button svg path')
    .click(Selector('#root [class^="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubb"]').nth(2))
    .expect(task.value).eql(''); 
})

test('Completed tasks are deleted', async (t: TestController) => {
    await t
    .typeText(task, 'send email')
    .pressKey('enter')
    .typeText(task, 'cook dinner')
    .pressKey('enter')
    .typeText(task, 'call mom')
    .pressKey('enter')
    .click(Selector('#root [class^="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubb"]').nth(1))
    .click(Selector('#root [class^="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubb"]').nth(3))
    .click(Selector('#root button').withText('CLEAR COMPLETED'))
    .expect(tasksList.textContent).eql('call mom')
    .click(Selector('#root button').withText('ACTIVE'))
    .expect(tasksList.textContent).eql('call mom')
    .click(Selector('#root button').withText('COMPLETED'))
    .expect(tasksList.textContent).eql('')
})