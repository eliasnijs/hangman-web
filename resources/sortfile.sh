#!/bin/bash

awk '{ print length(), $0 | "sort -n" }' $* | sed "s/^[0-9]* //g" > woorden_sorted.txt

