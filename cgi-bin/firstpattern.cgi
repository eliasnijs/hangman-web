#!/usr/bin/env python3

from hang import first_pattern
import cgi
import simplejson as json

# Lees data verstuurd door JavaScript

# Bereken te verzenden data
pattern = first_pattern()
nieuwe_data = {"pattern": pattern}

# Stuur antwoord terug
print("Content-Type: application/json")
print() # Lege lijn na headers
print(json.dumps(nieuwe_data))