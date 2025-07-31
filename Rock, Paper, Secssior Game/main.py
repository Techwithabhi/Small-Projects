
import random

system = random.choice([1, 2, 3])

print("Choose 1 option between these [r = Rock], [p = Paper], [s = scissors]")

youstr = input("Enter Your Choice: ") # getting input by the user
youdict = {"r" : 1, "p" : 2, "s" : 3}
reversedict = {1 : "Rock", 2 : "Paper", 3 : "Scissors"}

you = youdict[youstr]

print(f"You choose {reversedict[you]}\nSystem Choose {reversedict[system]}")

if(system == you):
    print("it's a Draw!\nTry Again Buddy")

else:
    if(system == 1 and you == 2):   
        print("You are the Winner 🏅")

    elif(system == 1 and you == 3): 
        print("You Lose! Computer is the Winner🏅")

    elif(system == 2 and you == 1):
        print("You Lose! Computer is the Winner🏅")

    elif(system == 2 and you == 3): 
        print("You are the Winner 🏅")

    elif(system == 3 and you == 1):
        print("You are the Winner 🏅")

    elif(system == 3 and you == 2):
        print("You Lose! Computer is the Winner🏅")

