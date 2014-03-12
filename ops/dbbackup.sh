#!/bin/sh
DATE=`date +%Y-%m-%d`
mongodump --db gwg --out ./backup/mongodump-${DATE}
git add .
git commit -am "mongo backup on ${DATE}"
git push