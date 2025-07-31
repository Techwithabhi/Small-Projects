

print(f" Game Name \n[Guess and Win]")
import random
n = random.randint(1, 100)
a = -1
guesses1 = 0
print("Player A Guess the number between [1 - 100]")

while(a != n):
    guesses1 += 1
    a = int(input("Guess the number: "))

    if(a > n):
        print("Lower number please⬇️")

    elif(a == n):
        print(f"You have gussed the number {n} correctly in {guesses1} attempt 🌟")
    
    else:
        print("Higher number please⬆️")




print(f"[Niceeee Player A , Now the Competition is just Brutal]\nNow it's your turn")

import random
n = random.randint(1, 100)
a = -1
guesses2 = 0
print("Player B Guess the number between [1 - 100]")

while(a != n):
    guesses2 += 1
    a = int(input("Guess the number: "))

    if(a > n):
        print("Lower number please⬇️")

    elif(a == n):
        print(f"You have gussed the number {n} correctly in {guesses2} attempt 🌟")

    
    else:
        print("Higher number please⬆️")


a = guesses1
b = guesses2

print(f"[Player A takes {a} attempt & Player B takes {b} attempt]")

if (a > b):
    print("Congratulation✨, Player B you are the real Gangstar in this game 🔥🦾")

elif(a == b):
    print("It's a draw, Try one more time")

else:
    print("Congratulation✨, Player A you are the Real Gangster in this game 🔥🦾")
