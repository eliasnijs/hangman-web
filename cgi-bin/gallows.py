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

    return key


# get longest and shortest word
def longest():
    l = 0
    for word in open("resources/woorden.txt", 'r'):
        cl = len(word)
        if cl > l:
            l = cl
    s = l
    for word in open("resources/woorden.txt", 'r'):
        cs = len(word)
        if cs < s:
            s = cs

    return s, l


# generate random length
def first_pattern():
    lengths = longest()
    size = random.randint(lengths[0], lengths[1])
    return "".join(["_" for x in range(size)])


# Advance a step
def advance(pattern_prev, letters_prev, expansion):
    pattern = kiezen(pattern_prev, letters_prev, expansion)
    letters = letters_prev + expansion
    found = 0
    if pattern_prev == pattern:
        found = 1
    return pattern, letters, found
