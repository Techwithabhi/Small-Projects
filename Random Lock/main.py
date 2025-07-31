import string
import random

if __name__ == "__main__":
    s1 = string.ascii_uppercase
    s2 = string.ascii_lowercase
    s3 = string.digits
    s4 = string.punctuation

    while True:
        try:
            plen = int(input("Enter password length:\n"))
            break
        except ValueError:
            print("Invalid input. Please enter a number.")

    s = []
    s.extend(list(s2))
    s.extend(list(s3))
    s.extend(list(s4))
    s.extend(list(s1))
    # print(s)
    random.shuffle(s)
    print(f"Your {plen} character password is :")
    print("".join(s[0:plen]))
