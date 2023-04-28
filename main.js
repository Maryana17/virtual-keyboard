const container = document.querySelector('.keyboard');
container.classList.add('keyboard-styles');

const numbersRow = [
 '~`', '!1', '#3', '$4', '%5', '^6', '&7','*8', '(9', ')0', '_-', '+=', 'arrow'
];
const letterUpRow = [
'Tab', 'q','w','e', 'r', 't', 'y', 'u', 'i', 'o', 'p','[', ']', ' \\', "Del"
];


const keysUpRow = numbersRow.map(array => {
    const block = document.createElement('div');
    block.classList.add('key');
    return block
});
const keysLetterUpRow = letterUpRow.map(array => {
    const block = document.createElement('div');
    block.classList.add('key');
    return block

})

container.append(...keysUpRow, ...keysLetterUpRow)