---
title: "How do I read JSONL files?"
description: "The Simple Query Tool(http://unpaywall.org/products/simple-query-tool) and database snapshot(http://unpaywall.org/products/snapshot) provide results in the JSON Lines text forma…"
tags: ["unpaywall"]
source_id: "41193798040471"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798040471-How-do-I-read-JSONL-files"
source_updated: "2026-06-13"
---
The [Simple Query Tool](http://unpaywall.org/products/simple-query-tool) and [database snapshot](http://unpaywall.org/products/snapshot) provide results in the [JSON Lines text format](http://jsonlines.org/), or JSONL. Each line of the file is one JSON dictionary representing a single record.

  

Since the uncompressed database snapshot is over 100 GB, this is a great advantage over plain JSON because you don't have to load the entire file to parse it. The downside is that the file contents as a whole aren't valid JSON, so most tools that work with JSON can't read it directly. You'll need some kind of wrapper script to handle the file line by line. 

  

In python, you could either read the file line by line and use the standard json.loads function on each line, or use the jsonlines library to do this for you. This would look something like:

  

import jsonlines

  

with jsonlines.open('your-filename.jsonl') as f:

    for line in f.iter():

        print line\['doi'\] # or whatever else you'd like to do

  

From there, the python dictionaries for each row can be loaded into a pandas dataframe or whatever other data structure is convenient. 

  

In R, you could do something similar with readLines and fromJSON. The important thing is to treat each line, not the whole file, as a single json object.
