This is a game app which will function as a facsimile of the "Simon" game: there will
be four buttons of different colors; each will have a distinct sound and similar animations when pressed. The game begins when a keyboard key is pressed, at which point
one of the buttons will signal. Level one is pressing that button; after, another button
will signal, at which point the player must press both buttons in the proper order. This
continues either forever until a player loses, or until a certain end point is reached, at which point the player wins. So it is a cumulative memory game.

The best apparent way to program this would be to have a random number generator between one and four, or zero and three, determine which button will signal with each round, each additional value being added into an array. Then, each round, the player's selections are compared against the values of the array in the same index, and when one
doesn't match, the game is over. By pressing a keyboard key to restart, the array with the acculumated randomly generated values is cleared. 

This could be added to by creating a High Scores page where values are stored; this would require knowing whatever back-end is necessary to store values on the hosting server; less excitingly, it could store values on local browser storage so the player can compete against themself. The former option would involve a name input, either at the beginning or end of the game. The name could be stored on local storage so it needn't be repeated endlessly, and then automatically submitted to the High Scores upon completion, if merited. There could be weekly High Scores as well as an All-Time, to keep it fun, and even a crown or belt or something awarded the top scorer, which appears next to their name, and on their page when they play. 
