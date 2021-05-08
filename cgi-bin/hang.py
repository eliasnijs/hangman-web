import random


# check if a word is a possibility
def kandidaat(w1, w2, w3):
    word = w1
    pattern = w2
    letters_used = w3 + "_"

    if len(word) != len(pattern):
        return False

    for index, character in enumerate(pattern):
        if character not in letters_used:
            return False
        if character not in ('_', word[index]):
            return False

    for index, character in enumerate(word):
        if character in letters_used and character not in pattern:
            return False

    for index, character in enumerate(letters_used):
        if character in word:
            for i, c in enumerate(word):
                if c == character and pattern[i] != c:
                    return False

    return True


# complete a word with a given letter
def aanvullen(w1, w2, w3):
    word = w1
    pattern = list(w2)
    expansion = w3

    for index, character in enumerate(word):
        if character is expansion:
            pattern[index] = character

    return "".join(pattern)


# advance the program a step
def kiezen(w1, w2, w3):
    pattern = w1
    letters_used = w2
    expansion = w3

    corresponding = {}

    for word in open("resources/woorden.txt", 'r'):
        word = word.strip()
        if kandidaat(word, pattern, letters_used):
            new_pattern = aanvullen(word, pattern, expansion)
            if new_pattern in corresponding:
                corresponding[new_pattern].add(word)
            else:
                corresponding[new_pattern] = {word}

    count = 0
    key = ""
    for i in corresponding:
        c_count = len(corresponding[i])
        if c_count > count:
            key = i
            count = c_count

    values = list(corresponding[key])
    print(values)
    word = values[random.randint(0, len(values) - 1)]

    return key, word


# get random line
def random_line():
    f = open("resources/woorden.txt")
    line = next(f)
    for num, l in enumerate(f, 2):
        if random.randrange(num):
            continue
        line = l
    f.close()

    return line


# length probability {5: 2%, 6: 4%, 7: 7%, 8: 10%, 9: 13%, 10: 14%, 11: 14%, 12: 12%, 13: 10%, 14: 8%, 15: 6%}
# generate random length
def first_pattern():
    return "".join(["_" for x in range(len(random_line()) - 1)])


# Advance a step
def advance(pattern_prev, letters_prev, expansion):
    keuze = kiezen(pattern_prev, letters_prev, expansion)

    pattern = keuze[0]
    letters = letters_prev + expansion
    found = (pattern_prev == pattern)
    word = keuze[1]

    return pattern, letters, found, word
