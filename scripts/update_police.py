import feedparser
import json

feed="https://www.presseportal.de/rss/polizeipresse"

d=feedparser.parse(feed)

items=[]

for e in d.entries[:15]:
 items.append({"title":e.title})

with open("data/police.json","w") as f:
 json.dump(items,f)
