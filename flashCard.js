 var fs = require("fs");
 var inquirer = require("inquirer");
 var typeofcard = process.argv[2];

console.log('Please enter "basic" or "cloze" to create a flashcard');   
function flashCard() {
    
if (typeofcard === 'basic'){   
        inquirer.prompt([{
            name: 'front',
            message: 'Enter front of card: '
        },{
            name: 'back',
            message: 'Enter back of card: '
        }]).then(function(answers){
            var basicFlashCard = new BasicFlashcard(answers.front, answers.back);
            basicFlashCard.save();
        });
    } 
else if (typeofcard === 'cloze'){
       
        inquirer.prompt([{
            name: 'text',
            message: 'Enter full text: '
        },{
            name: 'cloze',
            message: 'Enter cloze argument: '
        }]).then(function(answers){
            var search = answers.text.search(answers.cloze);
            var substring = answers.text.substring(0,search) + '...' + answers.text.substring(search + answers.cloze.length);
            var clozeFlashCard = new ClozeFlashcard(substring, answers.cloze);
            clozeFlashCard.save();
        });
    
    }
}
function BasicFlashcard(front, back){
    this.front = front;
    this.back = back;
    this.save = function(){
        fs.appendFile("question.txt", "{front: " + front + ", back: " + back + "}, ", function(err){
            if(err) console.log(err);
        });
    };
}

function ClozeFlashcard(text, cloze){
    this.text = text;
    this.cloze = cloze;
    this.save = function() {
        fs.appendFile("question.txt", "{front: " + text +  ", back: " + cloze + "}, ", function(err){
            if(err) console.log(err);
        });
    };
}
flashCard();

