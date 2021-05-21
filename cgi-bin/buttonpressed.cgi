#!/usr/bin/env python3

from spel import advance
import cgi
import simplejson as json

# Lees data verstuurd door JavaScript
parameters = cgi.FieldStorage();
pattern = parameters.getvalue('pattern');
letters = parameters.getvalue('letters');
expansion = parameters.getvalue('expansion');

# Bereken te verzenden data
out = advance(pattern, letters, expansion)

# Stuur antwoord terug
print("Content-Type: application/json")
print() # Lege lijn na headers
print(json.dumps(out))