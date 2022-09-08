#!/usr/bin/bash

    curl -s http://localhost:4000/fridge/allfieldsfridge > /dev/null
    curl -s http://localhost:4000/fridge/requiredfieldsfridge > /dev/null
    curl -s http://localhost:4000/fridge/happyfridge > /dev/null
