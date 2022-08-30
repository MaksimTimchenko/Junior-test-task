
const run = () => {

const inputs = document.querySelectorAll('input[type=text]');
const contenteditableElements = document.querySelectorAll('[contenteditable=true]');
const dictionary = {
    'Cat': ['Dog', 'Rat', 'bat'],
    'Helo': ['hello', 'Help', 'Hell'],
    'heldp': ['help', 'held', 'hello'],
    'woood': ['wood','forest', 'wohoo']
};
let keywords = Object.keys(dictionary);


const openPopupReplacementWord = (word,textArea) => {
    const popup = document.createElement('div');
        chrome.storage.sync.get('color', (data) =>{
        popup.classList.add('pops');
        popup.style.background = data.color;
    });
    dictionary[word].forEach(item => {
        popup.innerHTML += `
        <button data-wordBtn class="word_btn">${item}</button>
        `;
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelector('.pops') ? document.querySelector('.pops').remove() : null;
            textArea.focus();
        }
    });
    return document.body.append(popup);
    };

const contenteditableReplacement  = (word,textArea,index) => {
    openPopupReplacementWord(word,textArea);
    const btns = document.querySelectorAll('[data-wordBtn]');
        btns.forEach(btnWord => {
        btnWord.addEventListener('click', (e) => {
        let inputValueArr = textArea.innerHTML.split(' ');             
        let newWord = e.target.textContent;
        inputValueArr[index] = newWord;
        textArea.textContent = inputValueArr.join(' ').replace(/\&nbsp;/g, '');
        document.querySelector('.pops').remove();
        textArea.focus();
        });
        });     
    };  

const changeWord  = (word,res,input) => {
    if (keywords.includes(word[word.length -1])) {
        openPopupReplacementWord(word[word.length -1],input);
        const btns = document.querySelectorAll('[data-wordBtn]');
        btns.forEach(btnWord => {
            btnWord.addEventListener('click', (e) => {
                let newWord = e.target.innerHTML;
                let newReg = new RegExp(word[word.length-1] + '$');
                let result = res.trim().replace(newReg, newWord);
                input.value = result;
                input.innerHTML= result;
                res = '';
                input.setAttribute('value', result);
                document.querySelector('.pops').remove();
                input.focus();
            });
        });
    }
};  

const changeTypingValue = (item) => {
    let res = '';
    item.oninput = () => {
    res = item.textContent;
    };
    item.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) {
            let word = res.split(' ');
            changeWord(word, res,item);
        }
    });
};


const findPositionOfWord = (item) => {
        let sel, word = "";
        if (window.getSelection && (sel = window.getSelection()).modify) {
            let selectedRange = sel.getRangeAt(0);
            sel.collapseToStart();
            sel.modify("move", "backward", "word");
            sel.modify("extend", "forward", "word");
            word = sel.toString().trim(); 
            let char = sel.anchorOffset;
            let countStr = sel.anchorNode.textContent.substr(0, char);
            var wordNumber = (countStr === "") ? 0 : countStr.trim().split(/\s/).length ;
            sel.removeAllRanges();
            sel.addRange(selectedRange);

        }
       
        if (keywords.includes(word)) {
            contenteditableReplacement(word,item,wordNumber);
        } 
    
};

const changeWordExistenText = (elem) => {
    elem.forEach(item => {      
        item.addEventListener('click', ()=> {
            findPositionOfWord(item);           
        });

        item.addEventListener('keydown', (e) => {
            if (e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 40 ) {
                findPositionOfWord(item);
            }
        });
        
        changeTypingValue(item);
     });
};


inputs.forEach(input => {
    let res = '';
    input.oninput  = () => {
        res = input.value;
    };
input.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
            let word = res.split(' ');
            changeWord(word, res,input);
        } 
    });  
});
changeWordExistenText(contenteditableElements);
};


run();



