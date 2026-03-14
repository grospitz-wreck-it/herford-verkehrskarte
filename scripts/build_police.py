import feedparser
import json

feed="https://www.presseportal.de/rss/polizeipresse"

d=feedparser.parse(feed)

items=[]

orte=["Herford","Bünde","Löhne","Enger","Hiddenhausen","Spenge","Rödinghausen"]

for e in d.entries:

    if any(o in e.title for o in orte):

        items.append({"title":e.title})

items=items[:15]

with open("data/police.json","w") as f:
    json.dump(items,f)
