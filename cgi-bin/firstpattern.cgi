#!/usr/bin/env python3

from spel import first_pattern
import simplejson as json

# Bereken te verzenden data
out = first_pattern()

# Stuur antwoord terug
print("Content-Type: application/json")
print() # Lege lijn na headers
print(json.dumps(out))
