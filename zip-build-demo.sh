#!/bin/bash

cp version.txt build/version.txt
cp htaccess_example build/.htaccess

rm build.zip
cd build && zip -r ../build.zip * .htaccess