import feedparser
import json

feed = "https://www.presseportal.de/rss/polizeipresse"

d = feedparser.parse(feed)

items = []

for entry in d.entries:

    if "Herford" in entry.title or "Bünde" or "Löhne" or "Hiddenhausen" or "Kirchlengern" or "Rödinghausen" or "Vlotho" in entry.title:
        items.append({
            "title": entry.title
        })

items = items[:15]

with open("data/police.json","w") as f:
    json.dump(items,f)
