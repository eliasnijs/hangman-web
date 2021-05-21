import random


# ---------------------------------------------------------------
# check if a word is a possibility
def check(w1, w2, w3):
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
def complete(w1, w2, w3):
    word = w1
    pattern = list(w2)
    expansion = w3

    for index, character in enumerate(word):
        if character is expansion:
            pattern[index] = character

    return "".join(pattern)


# advance the program a step
def move(w1, w2, w3):
    pattern = w1
    letters_used = w2
    expansion = w3

    corresponding = {}

    for word in open("resources/woorden_sorted.txt", 'r'):
        word = word.strip()
        if len(word) == len(pattern):
            if check(word, pattern, letters_used):
                new_pattern = complete(word, pattern, expansion)
                if new_pattern in corresponding:
                    corresponding[new_pattern].add(word)
                else:
                    corresponding[new_pattern] = {word}
        if len(word) > len(pattern):
            break

    if not len(corresponding) > 0:
        return None

    count = 0
    keys = []
    for i in corresponding:
        c_count = len(corresponding[i])
        if c_count > count:
            keys = [i]
            count = c_count
        elif c_count == count:
            keys.append(i)

    key = random.choice(keys)

    values = list(corresponding[key])
    word = values[random.randint(0, len(values) - 1)]

    return key, word


# ---------------------------------------------------------------
# get random line
def random_line():
    f = open("resources/woorden_sorted.txt")
    line = next(f)
    for num, l in enumerate(f, 2):
        if random.randrange(num):
            continue
        line = l
    f.close()

    return "".join(["_" for x in range(len(line) - 1)])


# ---------------------------------------------------------------
def first_pattern():
    return {"pattern": random_line()}


def advance(pattern_prev, letters_prev, expansion):
    if len(expansion) != 1:
        return {"error": "ongeldige letter"}

    if expansion.isdigit():
        return {"error": "ongeldige letter"}

    if any(x.isdigit() for x in letters_prev):
        return {"error": "ongeldige letter"}

    if any(x.isdigit() for x in pattern_prev):
        return {"error": "ongeldig patroon"}

    if expansion in (letters_prev or pattern_prev):
        return {"error": "deze letter was al gebruikt"}

    keuze = move(pattern_prev, letters_prev, expansion)

    if not keuze:
        return {"error": "geen corresponderende patronen gevonden"}

    pattern = keuze[0]
    letters = letters_prev + expansion
    found = (pattern_prev == pattern)
    word = keuze[1]

    return {"pattern": pattern, "letters": letters, "wrong": found, "word": word}