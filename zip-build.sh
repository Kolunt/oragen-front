#!/bin/bash

cp version.txt build/version.txt

rm build.zip
cd build && zip -r ../build.zip *