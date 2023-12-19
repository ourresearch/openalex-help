---
description: Where things are in the world
---

# 🌎 Geo

Geography is central to categorizing scholarly data. That's why OpenAlex uses United Nations data to divide the globe into continents and regions that makes filtering data easier.

Countries are assigned to works using the affiliations that authors claim. For each author affiliation, we try to assign a country using either the matched [institution](../institutions.md), or by identifying the name of a country in the affiliation text.

## Continents

Countries are mapped to continents using data from the [United Nations Statistics Division](https://unstats.un.org/unsd/methodology/m49/). You can see the actual mapping used by the API [here](https://github.com/ourresearch/openalex-elastic-api/blob/master/countries.py).

## Regions

### **Global South**

The Global South is a term used to identify regions within Latin America, Asia, Africa, and Oceania. Our source for this group of countries is the [United Nations Finance Center for South-South Cooperation](http://www.fc-ssc.org/en/partnership\_program/south\_south\_countries).

## Technical documentation

You can find more information about geography data in our [technical documentation](https://docs.openalex.org/api-entities/geo).