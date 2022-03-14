const SUITS = ["b",".","#","b",".","#"]
const VALUES = ["A","B","C","D","E","F","G"]
const enharmonicValues = ["C","CS","D","DS","E","F","FS","G","GS","A","AS","B"]

export default class Deck{
    constructor(cards = freshDeck()){
        this.cards = cards
    }
    get numberOfCards(){
        return this.cards.length
    }

    pop(){
        return this.cards[Math.floor(Math.random()*this.numberOfCards)]
    }

    shuffle(){
        for(let i = this.numberOfCards - 1; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }

    }
}

class Card {
    constructor(suit,value){
        this.suit = suit
        this.value = value
    }

    get enharmonic(){
        const enharmonicValues = ["C","CS","D","DS","E","F","FS","G","GS","A","AS","B"]
        var enharmonicEquiv, enhPos, enhList
        if(this.suit === "."){
            enhPos = enharmonicValues.indexOf(this.value)
        } else if(this.suit === "#"){
            if(enharmonicValues.indexOf(this.value) === enharmonicValues.length){
                enhPos = 0
            }else{
                enhPos = enharmonicValues.indexOf(this.value) + 1 
            }
        } else{
            if(enharmonicValues.indexOf(this.value) === 0){
                enhPos = enharmonicValues.length-1
            }else{
                enhPos = enharmonicValues.indexOf(this.value) - 1 
            }
        }
        enhList = enharmonicValues
        enharmonicEquiv = enhList.splice(enhPos, enhList.length - enhPos)
        enharmonicEquiv.push(...enhList)
        console.log(enharmonicEquiv)
        return enharmonicEquiv
    }   
    
    getHTML() {
        const cardDiv = document.createElement("div")
        cardDiv.innerText = `${this.value}${this.suit}`
        cardDiv.classList.add("card", this.enharmonic[0])
        cardDiv.dataset.value = `${this.value}${this.suit}`
        return cardDiv
    }
}

function freshDeck(){
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}