---
title: "How do I read JSONL files?"
subtitle: "Parse the snapshot's JSON Lines files line by line, with ready-to-run Python and R snippets."
description: "Working with the JSON Lines files in the OpenAlex snapshot — Python and R patterns for line-by-line parsing."
tags: ["recipes"]
source_id: "41193798040471"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798040471-How-do-I-read-JSONL-files"
source_updated: "2026-06-13"
---
The OpenAlex [snapshot](/access/snapshot/) delivers data in the [JSON Lines](https://jsonlines.org/) text format (JSONL): each line of a file is one JSON object representing a single record.

Since the decompressed snapshot runs to terabytes, this is a great advantage over plain JSON — you can process one line at a time without ever loading a whole file. The downside is that a JSONL file *as a whole* isn't valid JSON, so tools expecting one big JSON document can't read it directly. Treat each **line**, not the file, as the JSON object.

## Python

Read gzipped part files directly — no need to decompress on disk:

```python
import gzip, json

with gzip.open("part_0000.gz", "rt") as f:
    for line in f:
        work = json.loads(line)
        print(work["id"], work["display_name"])
```

From there, load records into pandas, DuckDB, or whatever structure suits. (DuckDB can also query `.gz` JSONL files directly: `SELECT id, display_name FROM read_json_auto('part_*.gz')` — and if you'd rather skip JSONL entirely, the snapshot's [Parquet copy](/access/snapshot/#two-formats) loads straight into DuckDB, Spark, or BigQuery.)

## R

Same principle with `readLines` and `jsonlite`:

```r
library(jsonlite)

con <- gzfile("part_0000.gz", "r")
while (length(line <- readLines(con, n = 1)) > 0) {
  work <- fromJSON(line)
  # do something with work$id, work$display_name, ...
}
close(con)
```

The important thing in any language: parse each line as its own JSON object.
