
// Display Welcome
console.log('Welcome to Blackjack!');

// Deck of cards
// Create an array of variables of suits and cards
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ["Ace", 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven',
  'Six', 'Five', 'Four', 'Three', 'Two'];

  // Initialize deck to empty array
  let deck = [];

  // Generate for loop to create the deck of cards, Idx for index
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) { // loop for suits
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {  // nested loop for the values
      deck.push(values[valueIdx] + ' of ' + suits[suitIdx]); 
    }
  }

  for (let i = 0; i < deck.length; i++) {
    console.log(deck[i]); // listing of card values and suits
  }

  // Create dealt card variables for user and computer
//  Variable holding player cards
let playerCards = [deck[0], deck[2] ];

    console.log('You were dealt: ');
    console.log(' ' + playerCards[0]); 
    console.log(' ' + playerCards[1]); // this is the array of playerrCards