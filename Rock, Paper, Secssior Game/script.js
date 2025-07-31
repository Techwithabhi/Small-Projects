function playGame(userChoice) {
    const choices = { "r": 1, "p": 2, "s": 3 };
    const reverseChoices = { 1: "Rock", 2: "Paper", 3: "Scissors" };

    const systemChoice = Math.floor(Math.random() * 3) + 1;
    const user = choices[userChoice];

    let resultText = `You chose <strong>${reverseChoices[user]}</strong><br>`;
    resultText += `System chose <strong>${reverseChoices[systemChoice]}</strong><br><br>`;

    if (systemChoice === user) {
        resultText += "It's a Draw! 🤝<br>Try Again Buddy.";
    } else {
        if ((systemChoice === 1 && user === 2) || 
            (systemChoice === 2 && user === 3) || 
            (systemChoice === 3 && user === 1)) {
            resultText += "You are the Winner 🏅";
        } else {
            resultText += "You Lose! Computer is the Winner 🏅";
        }
    }

    document.getElementById("result").innerHTML = resultText;
}
