---
title: "Topic hierarchy changes"
updated: 2026-11-24
description: "Every change to a topic's name or to the subfield it sits under, with the date it reached the API: topic renames, moves between subfields, fields and domains, and subfield renames."
tags: ["reference"]
---
[Topic](/data/topics/) IDs never change, and OpenAlex doesn't add, remove, split or merge topics. What can change is a topic's **name** and its **place in the hierarchy**: the [subfield](/data/subfields/) it sits under, and with it the [field](/data/fields/) and [domain](/data/domains/). We change one when we find it wrong. This page lists every such change, newest first, with the date it reached the API: together they are every difference between the topic hierarchy of October 2025 and today's. The 4 domains, the 26 fields and the 252 subfields themselves keep their IDs, and no subfield has moved to another field.

| Reached the API | Topics renamed | Topics moved to another subfield | of those, to another field | to another domain | Also |
|---|---|---|---|---|---|
| [23-24 November 2026](#23-24-november-2026) | 31 | 27 | 17 | 11 |  |
| [8 November 2026](#8-november-2026) | – | 2 | 1 | – |  |
| [6 November 2026](#6-november-2026) | 34 | 972 | 668 | 276 | Subfields 1502 and 3614 left with no topics |
| [3-4 November 2026](#3-4-november-2026) | 22 | – | – | – | 7 subfields renamed, 7 subfield descriptions rewritten |
| **Total** | **87** | **1,001** | **686** | **287** | |

12 topics changed in two rounds (renamed in one, moved in another), so 1,072 of the 4,516 topics have changed in all.

## What changed and why

### 23-24 November 2026

A second pass on the November audit. 27 topics moved to another subfield: most are topics both reviewing models had already called misplaced on 6 November, but whose destination had not yet passed our check (for example T10171 Biofuel production and bioconversion, from 2204 Biomedical Engineering to 2402 Applied Microbiology and Biotechnology). 31 topics got new names because their names were near-synonyms of another topic's, differing only by a plural or a synonym: T11805 "Agricultural economics and policies" and T12033 "Agricultural Economics and Policy", for example, are now "Farm Economics and Agricultural Markets" and "Common Agricultural Policy and Farm Support". Topic records showed the changes on 23 November, works on 24 November.

### 8 November 2026

The last two moves of the 6 November audit: T10019 Corporate Finance and Governance from 1402 Accounting to 2003 Finance, and T11381 Infectious Diseases and Tuberculosis from 2746 Surgery to 2725 Infectious Diseases.

### 6 November 2026

Every topic with works was checked against the subfield it sits under, and 972 topics moved to the subfield whose scope best covers their works. Two AI models from different labs each looked at 20 of a topic's works: one rated the current subfield, the other ranked subfields without seeing it. A topic moved only when both called its subfield wrong; a third model settled the destination when the two picked different ones, and the moves were checked on a separate sample of works. Two subfields, 1502 Bioengineering and 3614 Radiological and Ultrasound Technology, were left with no topics; they stay in the hierarchy. The same day, 34 topics whose names used the same words as another topic's in a different order were renamed from samples of their works.

### 3-4 November 2026

22 topics whose names collided with another topic's got new names (for example the two "Marine and coastal ecosystems": T10032 is now "Marine Plankton and Biogeochemistry"). Seven subfields got back the labels ASJC gives them, such as 2716 "Genetics (clinical)", and seven subfield descriptions that had come from wrong Wikidata matches were rewritten (2100 General Energy had been described as a Czech company). Topic records showed the changes on 3 November, works on 4 November.

## What a change touches

- **Works.** A work's [`topics`](/data/works/attributes/#topics) and [`primary_topic`](/data/works/attributes/#primary_topic) carry the topic's current name, subfield, field and domain, so filters and group-bys such as `topics.subfield.id` count differently after a move.
- **FWCI and citation percentiles.** They compare a work with others of the same primary subfield, year and type, so they changed for works on moved topics and for the works they are compared with. See [FWCI](/data/works/citations/#field-weighted-citation-impact).
- **`updated_date`.** It moved on the works these changes touched, except for the changes of 6 November: if you keep works up to date by `updated_date`, those did not show up, and works on the topics changed that day need re-reading.

## Following changes

When a topic's name or place changes, we add it to this page when it ships, and to the [data changelog](https://github.com/ourresearch/openalex-walden/blob/main/CHANGELOG.md). The tables below have one row per change; for a machine-readable copy, fetch this page as Markdown: [`help.openalex.org/data/topic-hierarchy-changes.md`](https://help.openalex.org/data/topic-hierarchy-changes.md). A topic's current values are always at its API record, e.g. [`api.openalex.org/topics/T10019`](https://api.openalex.org/topics/T10019). If a topic looks misnamed or misplaced, [tell us](https://openalex.org/contact) with its ID.

## Topics renamed

### Renamed 23-24 November 2026

| Topic | Old name | New name |
|---|---|---|
| T10018 | Advancements in Battery Materials | Lithium- and Sodium-Ion Battery Electrodes |
| T10125 | Advanced Wireless Communication Techniques | MIMO-OFDM Transmission and Space-Time Coding |
| T10281 | Advanced Battery Materials and Technologies | Solid Electrolytes, Lithium-Metal and Lithium-Sulfur Batteries |
| T11025 | Nonlinear Optical Materials Research | Nonlinear Optical Crystals and Chromophores |
| T11458 | Advanced Wireless Communication Technologies | Reconfigurable Intelligent Surfaces and NOMA |
| T11788 | Nonlinear Optical Materials Studies | Two-Photon Absorption and Optical Limiting |
| T11805 | Agricultural economics and policies | Farm Economics and Agricultural Markets |
| T12013 | Sustainable Development and Environmental Policy | Sustainability Indicators and Natural Capital |
| T12033 | Agricultural Economics and Policy | Common Agricultural Policy and Farm Support |
| T12081 | Aerodynamics and Fluid Dynamics Research | Vehicle and Train Aerodynamics |
| T12330 | Botanical Research and Applications | Betalain Pigments and Cactus Pear |
| T12395 | Educational Innovations and Technology | ICT and E-Learning in Education |
| T12446 | Economic Growth and Fiscal Policies | Regional Public Finance and Local Taxation |
| T12883 | Sustainable Development and Environmental Management | Sustainable Development and Green Economy |
| T12888 | Military Strategy and Technology | Military Command and Control and Network-Centric Warfare |
| T12959 | Engineering and Materials Science Studies | Automotive Lightweight Materials and Body Structures |
| T13016 | Innovative Educational Technologies | Cloud Platforms and Innovative Educational Technologies |
| T13151 | Business Strategies and Innovation | Corporate Strategy and Business Model Case Studies |
| T13166 | Information Science and Libraries | Information Science, Archives and Information Policy |
| T13238 | Botanical Studies and Applications | Hawthorn (Crataegus) Biology and Pharmacology |
| T13378 | Agricultural Development and Policies | Agricultural Economy and Food Security in Russia |
| T13402 | Business Strategy and Innovation | Coopetition, Strategic Alliances and Business Networks |
| T13478 | Agricultural Development and Management | Agricultural Extension and Farmer Empowerment |
| T13529 | Education Systems and Policies | School Management and Early Childhood Education |
| T13532 | Education Systems and Policy | Apprenticeships and Vocational Education Systems |
| T13673 | Library Science and Information | Library Services and Librarianship |
| T13903 | Innovative Educational Techniques | Logistics Higher Education |
| T13917 | Engineering and Material Science Research | Oxygen Compatibility and Material Flammability |
| T13951 | Fluid dynamics and aerodynamics studies | Fluid Mechanics Fundamentals and Applications |
| T14423 | Military Technology and Strategies | Military Weapons and Equipment |
| T14461 | Medicinal Plant Studies | Clinacanthus nutans Pharmacology and Phytochemistry |

### Renamed 6 November 2026

| Topic | Old name | New name |
|---|---|---|
| T10133 | Media Studies and Communication | News Media Framing and Political Communication |
| T10642 | Plasma Applications and Diagnostics | Atmospheric-Pressure Plasma Applications |
| T10778 | Philosophy and History of Science | Philosophy of Biology and Scientific Explanation |
| T10781 | Plasma Diagnostics and Applications | Low-Pressure Plasma Processing and Diagnostics |
| T10898 | Environmental Education and Sustainability | Pro-Environmental Behavior and Attitudes |
| T11416 | Numerical methods for differential equations | Numerical Solvers for Ordinary Differential Equations |
| T11857 | Archaeological and Historical Studies | Archaeology of Roman Hispania and Gaul |
| T11895 | Social and Cultural Dynamics | Cultural Capital and Social Class |
| T12165 | Environmental Sustainability and Education | Environmental Education in Latin America |
| T12191 | Chemical Reaction Mechanisms | Physical Organic Chemistry and Reaction Kinetics |
| T12408 | Educational Innovations and Challenges | Digital Transformation of Higher Education |
| T12725 | transportation and logistics systems | Railways and European Transport Policy |
| T12727 | Differential Equations and Numerical Methods | Singular Perturbation, Asymptotics and Difference Schemes |
| T13253 | Chemical Reactions and Mechanisms | Photolysis and Reactive Intermediates |
| T13296 | Physical Education and Sports Studies | Sociology, History and Politics of Sport |
| T13390 | Cultural and Social Dynamics | Mauritia flexuosa Palm Ecology and Uses |
| T13401 | Social and Cultural Studies | Modernity and Self-Identity |
| T13464 | Higher Education and Sustainability | University Extension and Social Responsibility |
| T13488 | Sports and Physical Education Studies | Recreational Sport and Physical Activity |
| T13491 | Social and Political Issues | Social Policy and Social Work in Brazil |
| T13527 | Transportation Systems and Logistics | Road Transport and Highway Systems |
| T13558 | Philosophy, Science, and History | Logic and Philosophy of Science |
| T13593 | Historical and Archaeological Studies | Viking Age and Medieval Scandinavia |
| T13716 | Communication Studies and Media | Interpersonal and Organizational Communication |
| T13724 | Humanities and Social Sciences | Social Acceleration and Temporality |
| T13799 | Media and Communication Studies | Mediatization and Communication for Social Change |
| T14121 | Logistics and Transportation Systems | Business Logistics and Inventory Control |
| T14127 | Food and Agricultural Sciences | Food Nutrient Composition and Product Development |
| T14256 | Agricultural and Food Sciences | Wood Residue Utilization and Solid Biofuels |
| T14274 | Education and Vocational Training | Non-Formal Education and Adult Literacy |
| T14284 | Social Sciences and Humanities | Environmental Movements and Political Ecology |
| T14298 | Cultural and Social Studies | Traditional Culture and Identity |
| T14402 | Political and Social Issues | Arab Spring and North African Politics |
| T14403 | Educational Challenges and Innovations | Information Security Education |

### Renamed 3-4 November 2026

| Topic | Old name | New name |
|---|---|---|
| T10032 | Marine and coastal ecosystems | Marine Plankton and Biogeochemistry |
| T10274 | Synthesis and biological activity | Heterocyclic Compound Synthesis and Bioactivity |
| T10663 | Advanced Battery Technologies Research | Battery Modeling and Management |
| T10919 | Neurological disorders and treatments | Deep Brain Stimulation and Movement Disorders |
| T11014 | Regional Economics and Spatial Analysis | Agglomeration and Urban Systems |
| T11475 | French Urban and Social Studies | French Territorial Governance |
| T11690 | Advanced battery technologies research | Aqueous and Flow Batteries |
| T12996 | Cancer Research and Treatments | Bacterial Cancer Therapy |
| T13122 | Linguistics and Cultural Studies | Turkic and Altaic Linguistics |
| T13234 | advanced mathematical theories | p-Adic Analysis and Mathematical Physics |
| T13434 | Cancer Research and Treatment | Cancer Nanomedicine |
| T13444 | Medical Research and Treatments | Traditional Chinese Medicine Clinical Research |
| T13485 | Marine and Coastal Ecosystems | Coastal Fisheries and Human Impacts |
| T13796 | Neurological Disorders and Treatments | Neuroprotection in Cerebral Ischemia |
| T13971 | Synthesis and Biological Activity | Isoquinoline Alkaloid Synthesis |
| T14020 | Medical research and treatments | General Medicine and Therapeutics |
| T14051 | Regional Economic and Spatial Analysis | Regional Economic Trends and Sectoral Structure |
| T14107 | Appalachian Studies and Mathematics | Appalachian Local History |
| T14134 | Medical and Biological Sciences | Classical Anatomy and Histology |
| T14195 | Linguistic and Cultural Studies | Plant Names and Ethnobotany |
| T14371 | Hume's philosophy and hair distribution | David Hume Studies |
| T14500 | Advanced Mathematical Theories | Smarandache Functions and Recreational Number Theory |

## Topics moved to another subfield

Subfields are shown with their names today (seven were renamed on 3 November). The first two digits of a subfield ID are its field's ID.

### Moved 23-24 November 2026

| Topic | Name today | From subfield | To subfield | Field and domain |
|---|---|---|---|---|
| T10022 | Semiconductor Quantum Structures and Devices | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T10164 | Quality and Supply Management | 1404 Management Information Systems | 2209 Industrial and Manufacturing Engineering | field Business, Management and Accounting → Engineering; domain Social Sciences → Physical Sciences |
| T10171 | Biofuel production and bioconversion | 2204 Biomedical Engineering | 2402 Applied Microbiology and Biotechnology | field Engineering → Immunology and Microbiology; domain Physical Sciences → Life Sciences |
| T10553 | Combustion and flame dynamics | 2206 Computational Mechanics | 1507 Fluid Flow and Transfer Processes | field Engineering → Chemical Engineering |
| T10682 | Quantum Computing Algorithms and Architecture | 1702 Artificial Intelligence | 3107 Atomic and Molecular Physics, and Optics | field Computer Science → Physics and Astronomy |
| T10951 | Cryptographic Implementations and Security | 1702 Artificial Intelligence | 1708 Hardware and Architecture | same |
| T11051 | Sirtuins and Resveratrol in Medicine | 2717 Geriatrics and Gerontology | 1312 Molecular Biology | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T11066 | Organic Food and Agriculture | 1110 Plant Science | 1406 Marketing | field Agricultural and Biological Sciences → Business, Management and Accounting; domain Life Sciences → Social Sciences |
| T11259 | Agriculture Sustainability and Environmental Impact | 2303 Ecology | 2916 Nutrition and Dietetics | field Environmental Science → Nursing; domain Physical Sciences → Health Sciences |
| T11554 | Vascular Procedures and Complications | 2740 Pulmonary and Respiratory Medicine | 2746 Surgery | same |
| T11566 | Laser Applications in Dentistry and Medicine | 2741 Radiology, Nuclear Medicine and Imaging | 2204 Biomedical Engineering | field Medicine → Engineering; domain Health Sciences → Physical Sciences |
| T11768 | Music Therapy and Health | 3207 Social Psychology | 2707 Complementary and alternative medicine | field Psychology → Medicine; domain Social Sciences → Health Sciences |
| T11789 | Land Rights and Reforms | 1111 Soil Science | 3308 Law | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T11804 | Quantum many-body systems | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T12360 | Plant-derived Lignans Synthesis and Bioactivity | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T12442 | Thermal Radiation and Cooling Technologies | 2205 Civil and Structural Engineering | 3107 Atomic and Molecular Physics, and Optics | field Engineering → Physics and Astronomy |
| T12496 | Color perception and design | 3207 Social Psychology | 1213 Visual Arts and Performing Arts | field Psychology → Arts and Humanities |
| T12882 | Jungian Analytical Psychology | 3207 Social Psychology | 3203 Clinical Psychology | same |
| T13036 | Veterinary Practice and Education Studies | 3616 Speech and Hearing | 3600 General Health Professions | same |
| T13185 | Phytochemistry and Bioactive Compounds | 2502 Biomaterials | 3004 Pharmacology | field Materials Science → Pharmacology, Toxicology and Pharmaceutics; domain Physical Sciences → Life Sciences |
| T13233 | Occupational Health and Safety Management | 3609 Occupational Therapy | 2213 Safety, Risk, Reliability and Quality | field Health Professions → Engineering; domain Health Sciences → Physical Sciences |
| T13248 | Healthcare Technology and Patient Monitoring | 2746 Surgery | 2718 Health Informatics | same |
| T13396 | Agriculture and Rural Development Research | 1105 Ecology, Evolution, Behavior and Systematics | 1103 Animal Science and Zoology | same |
| T13488 | Recreational Sport and Physical Activity | 3319 Life-span and Life-course Studies | 3304 Education | same |
| T13492 | Science, Technology, and Education in Latin America | 3317 Demography | 1405 Management of Technology and Innovation | field Social Sciences → Business, Management and Accounting |
| T13943 | Beetle Biology and Toxicology Studies | 1306 Cancer Research | 1109 Insect Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T14486 | Cardiovascular, Neuropeptides, and Oxidative Stress Research | 2746 Surgery | 2705 Cardiology and Cardiovascular Medicine | same |

### Moved 8 November 2026

| Topic | Name today | From subfield | To subfield | Field and domain |
|---|---|---|---|---|
| T10019 | Corporate Finance and Governance | 1402 Accounting | 2003 Finance | field Business, Management and Accounting → Economics, Econometrics and Finance |
| T11381 | Infectious Diseases and Tuberculosis | 2746 Surgery | 2725 Infectious Diseases | same |

### Moved 6 November 2026

| Topic | Name today | From subfield | To subfield | Field and domain |
|---|---|---|---|---|
| T10001 | Geological and Geochemical Analysis | 1908 Geophysics | 1906 Geochemistry and Petrology | same |
| T10020 | Quantum Information and Cryptography | 1702 Artificial Intelligence | 3107 Atomic and Molecular Physics, and Optics | field Computer Science → Physics and Astronomy |
| T10049 | Magnetic properties of thin films | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T10051 | Asthma and respiratory diseases | 2737 Physiology (medical) | 2740 Pulmonary and Respiratory Medicine | same |
| T10055 | Diverse Aspects of Tourism Research | 3312 Sociology and Political Science | 1409 Tourism, Leisure and Hospitality Management | field Social Sciences → Business, Management and Accounting |
| T10060 | Smoking Behavior and Cessation | 2737 Physiology (medical) | 2739 Public Health, Environmental and Occupational Health | same |
| T10069 | Antenna Design and Analysis | 2202 Aerospace Engineering | 2208 Electrical and Electronic Engineering | same |
| T10084 | Musculoskeletal pain and rehabilitation | 2736 Pharmacology (medical) | 3612 Physical Therapy, Sports Therapy and Rehabilitation | field Medicine → Health Professions |
| T10086 | Alzheimer's disease research and treatments | 2737 Physiology (medical) | 2804 Cellular and Molecular Neuroscience | field Medicine → Neuroscience; domain Health Sciences → Life Sciences |
| T10087 | Archaeology and ancient environmental studies | 1911 Paleontology | 3302 Archeology | field Earth and Planetary Sciences → Social Sciences; domain Physical Sciences → Social Sciences |
| T10088 | Thermochemical Biomass Conversion Processes | 2204 Biomedical Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T10094 | Epilepsy research and treatment | 2738 Psychiatry and Mental health | 2728 Clinical Neurology | same |
| T10098 | Ruminant Nutrition and Digestive Physiology | 1102 Agronomy and Crop Science | 1103 Animal Science and Zoology | same |
| T10102 | scientometrics and bibliometrics research | 1804 Statistics, Probability and Uncertainty | 3309 Library and Information Sciences | field Decision Sciences → Social Sciences |
| T10104 | Nanofluid Flow and Heat Transfer | 2204 Biomedical Engineering | 1507 Fluid Flow and Transfer Processes | field Engineering → Chemical Engineering |
| T10113 | Dental materials and restorations | 3505 Orthodontics | 3500 General Dentistry | same |
| T10124 | Prostate Cancer Diagnosis and Treatment | 2740 Pulmonary and Respiratory Medicine | 2748 Urology | same |
| T10126 | Logic, programming, and type systems | 1702 Artificial Intelligence | 1712 Software | same |
| T10129 | Glioma Diagnosis and Treatment | 2716 Genetics (clinical) | 2730 Oncology | same |
| T10134 | Inflammatory Bowel Disease | 1311 Genetics | 2715 Gastroenterology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T10137 | Multiple Sclerosis Research Studies | 2734 Pathology and Forensic Medicine | 2728 Clinical Neurology | same |
| T10147 | Antibiotic Resistance in Bacteria | 1313 Molecular Medicine | 2726 Microbiology (medical) | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T10154 | Customer Service Quality and Loyalty | 1407 Organizational Behavior and Human Resource Management | 1406 Marketing | same |
| T10159 | Ionosphere and magnetosphere dynamics | 3103 Astronomy and Astrophysics | 1912 Space and Planetary Science | field Physics and Astronomy → Earth and Planetary Sciences |
| T10165 | Classical Antiquity Studies | 3314 Anthropology | 1205 Classics | field Social Sciences → Arts and Humanities |
| T10176 | Mesenchymal stem cell research | 2716 Genetics (clinical) | 1307 Cell Biology | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T10189 | Anesthesia and Pain Management | 2746 Surgery | 2703 Anesthesiology and Pain Medicine | same |
| T10191 | Robotics and Sensor-Based Localization | 2202 Aerospace Engineering | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T10193 | Coronary Interventions and Diagnostics | 2746 Surgery | 2705 Cardiology and Cardiovascular Medicine | same |
| T10204 | Microstructure and mechanical properties | 2505 Materials Chemistry | 2506 Metals and Alloys | same |
| T10211 | Computational Drug Discovery Methods | 1703 Computational Theory and Mathematics | 3002 Drug Discovery | field Computer Science → Pharmacology, Toxicology and Pharmaceutics; domain Physical Sciences → Life Sciences |
| T10212 | Electrochemical sensors and biosensors | 2208 Electrical and Electronic Engineering | 1602 Analytical Chemistry | field Engineering → Chemistry |
| T10218 | Sepsis Diagnosis and Treatment | 2713 Epidemiology | 2706 Critical Care and Intensive Care Medicine | same |
| T10227 | Acute Ischemic Stroke Management | 2713 Epidemiology | 2728 Clinical Neurology | same |
| T10230 | Marine and fisheries research | 2306 Global and Planetary Change | 1104 Aquatic Science | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T10237 | Cryptography and Data Security | 1702 Artificial Intelligence | 1705 Computer Networks and Communications | same |
| T10238 | Spine and Intervertebral Disc Pathology | 2734 Pathology and Forensic Medicine | 2732 Orthopedics and Sports Medicine | same |
| T10240 | Plant tissue culture and regeneration | 1312 Molecular Biology | 1110 Plant Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T10249 | Distributed Control Multi-Agent Systems | 1705 Computer Networks and Communications | 2207 Control and Systems Engineering | field Computer Science → Engineering |
| T10252 | Microbial Natural Products and Biosynthesis | 2736 Pharmacology (medical) | 2402 Applied Microbiology and Biotechnology | field Medicine → Immunology and Microbiology; domain Health Sciences → Life Sciences |
| T10253 | Sarcoma Diagnosis and Treatment | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T10254 | Innovations in Medical Education | 2739 Public Health, Environmental and Occupational Health | 3304 Education | field Medicine → Social Sciences; domain Health Sciences → Social Sciences |
| T10258 | Philosophy and Theoretical Science | 3205 Experimental and Cognitive Psychology | 1211 Philosophy | field Psychology → Arts and Humanities |
| T10272 | Mental Health Treatment and Access | 3207 Social Psychology | 2738 Psychiatry and Mental health | field Psychology → Medicine; domain Social Sciences → Health Sciences |
| T10276 | Helicobacter pylori-related gastroenterology studies | 2746 Surgery | 2715 Gastroenterology | same |
| T10277 | Vitamin D Research Studies | 2734 Pathology and Forensic Medicine | 2712 Endocrinology, Diabetes and Metabolism | same |
| T10283 | Hearing Loss and Rehabilitation | 2805 Cognitive Neuroscience | 3616 Speech and Hearing | field Neuroscience → Health Professions; domain Life Sciences → Health Sciences |
| T10284 | Anaerobic Digestion and Biogas Production | 2215 Building and Construction | 2105 Renewable Energy, Sustainability and the Environment | field Engineering → Energy |
| T10295 | Plasmonic and Surface Plasmon Research | 2204 Biomedical Engineering | 3107 Atomic and Molecular Physics, and Optics | field Engineering → Physics and Astronomy |
| T10300 | Congenital Heart Disease Studies | 2713 Epidemiology | 2705 Cardiology and Cardiovascular Medicine | same |
| T10317 | Advanced Database Systems and Queries | 1705 Computer Networks and Communications | 1710 Information Systems | same |
| T10323 | Analog and Mixed-Signal Circuit Design | 2204 Biomedical Engineering | 2208 Electrical and Electronic Engineering | same |
| T10325 | Astro and Planetary Science | 3103 Astronomy and Astrophysics | 1912 Space and Planetary Science | field Physics and Astronomy → Earth and Planetary Sciences |
| T10327 | Adolescent Sexual and Reproductive Health | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T10328 | Supply Chain and Inventory Management | 1404 Management Information Systems | 1803 Management Science and Operations Research | field Business, Management and Accounting → Decision Sciences |
| T10332 | Amphibian and Reptile Biology | 2306 Global and Planetary Change | 1105 Ecology, Evolution, Behavior and Systematics | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T10343 | Hydrogels: synthesis, properties, applications | 1313 Molecular Medicine | 2502 Biomaterials | field Biochemistry, Genetics and Molecular Biology → Materials Science; domain Life Sciences → Physical Sciences |
| T10351 | Liver Disease Diagnosis and Treatment | 2713 Epidemiology | 2721 Hepatology | same |
| T10352 | Physical Activity and Health | 2737 Physiology (medical) | 2739 Public Health, Environmental and Occupational Health | same |
| T10364 | Reproductive Biology and Fertility | 2739 Public Health, Environmental and Occupational Health | 2743 Reproductive Medicine | same |
| T10366 | Discourse Analysis in Language Studies | 1208 Literature and Literary Theory | 3310 Linguistics and Language | field Arts and Humanities → Social Sciences |
| T10368 | Dental Health and Care Utilization | 3506 Periodontics | 3500 General Dentistry | same |
| T10381 | Ophthalmology and Visual Impairment Studies | 2713 Epidemiology | 2731 Ophthalmology | same |
| T10382 | Quantum and electron transport phenomena | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T10394 | Lipoproteins and Cardiovascular Health | 2746 Surgery | 2705 Cardiology and Cardiovascular Medicine | same |
| T10399 | Hydrocarbon exploration and reservoir analysis | 2211 Mechanics of Materials | 1907 Geology | field Engineering → Earth and Planetary Sciences |
| T10402 | Phase Equilibria and Thermodynamics | 2204 Biomedical Engineering | 1606 Physical and Theoretical Chemistry | field Engineering → Chemistry |
| T10406 | Planetary Science and Exploration | 3103 Astronomy and Astrophysics | 1912 Space and Planetary Science | field Physics and Astronomy → Earth and Planetary Sciences |
| T10416 | Traumatic Brain Injury Research | 2713 Epidemiology | 2728 Clinical Neurology | same |
| T10418 | Pelvic floor disorders treatments | 2745 Rheumatology | 2748 Urology | same |
| T10434 | Chromosomal and Genetic Variations | 1110 Plant Science | 1311 Genetics | field Agricultural and Biological Sciences → Biochemistry, Genetics and Molecular Biology |
| T10439 | Climate change impacts on agriculture | 1105 Ecology, Evolution, Behavior and Systematics | 1102 Agronomy and Crop Science | same |
| T10449 | Renal cell carcinoma treatment | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T10480 | Ionic liquids properties and applications | 1503 Catalysis | 1606 Physical and Theoretical Chemistry | field Chemical Engineering → Chemistry |
| T10482 | Mathematical and Theoretical Epidemiology and Ecology Models | 2739 Public Health, Environmental and Occupational Health | 2604 Applied Mathematics | field Medicine → Mathematics; domain Health Sciences → Physical Sciences |
| T10491 | Enhanced Oil Recovery Techniques | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T10498 | Migraine and Headache Studies | 2738 Psychiatry and Mental health | 2728 Clinical Neurology | same |
| T10499 | Folate and B Vitamins Research | 2745 Rheumatology | 2916 Nutrition and Dietetics | field Medicine → Nursing |
| T10500 | Sparse and Compressive Sensing Techniques | 2206 Computational Mechanics | 1711 Signal Processing | field Engineering → Computer Science |
| T10507 | Biodiesel Production and Applications | 2204 Biomedical Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T10508 | Patient Safety and Medication Errors | 3604 Emergency Medical Services | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T10511 | High voltage insulation and dielectric phenomena | 2505 Materials Chemistry | 2208 Electrical and Electronic Engineering | field Materials Science → Engineering |
| T10517 | Financial Literacy, Pension, Retirement Analysis | 1402 Accounting | 2003 Finance | field Business, Management and Accounting → Economics, Econometrics and Finance |
| T10518 | Gallbladder and Bile Duct Disorders | 2740 Pulmonary and Respiratory Medicine | 2715 Gastroenterology | same |
| T10525 | Human-Automation Interaction and Safety | 3207 Social Psychology | 3307 Human Factors and Ergonomics | field Psychology → Social Sciences |
| T10528 | Adipokines, Inflammation, and Metabolic Diseases | 2713 Epidemiology | 2712 Endocrinology, Diabetes and Metabolism | same |
| T10543 | Prostate Cancer Treatment and Research | 2740 Pulmonary and Respiratory Medicine | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T10546 | Higher Education Governance and Development | 3320 Political Science and International Relations | 3304 Education | same |
| T10547 | Education, Achievement, and Giftedness | 3205 Experimental and Cognitive Psychology | 3204 Developmental and Educational Psychology | same |
| T10550 | Ovarian cancer diagnosis and treatment | 2743 Reproductive Medicine | 2730 Oncology | same |
| T10563 | Corneal surgery and disorders | 2741 Radiology, Nuclear Medicine and Imaging | 2731 Ophthalmology | same |
| T10577 | Hydrology and Sediment Transport Processes | 2303 Ecology | 1904 Earth-Surface Processes | field Environmental Science → Earth and Planetary Sciences |
| T10584 | Reproductive Physiology in Livestock | 1102 Agronomy and Crop Science | 1103 Animal Science and Zoology | same |
| T10586 | Robotic Path Planning Algorithms | 1707 Computer Vision and Pattern Recognition | 2207 Control and Systems Engineering | field Computer Science → Engineering |
| T10587 | Autophagy in Disease and Therapy | 2713 Epidemiology | 1307 Cell Biology | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T10595 | Medieval Literature and History | 1205 Classics | 1202 History | same |
| T10597 | Nuclear reactor physics and engineering | 2202 Aerospace Engineering | 2104 Nuclear Energy and Engineering | field Engineering → Energy |
| T10606 | Kidney Stones and Urolithiasis Treatments | 2740 Pulmonary and Respiratory Medicine | 2748 Urology | same |
| T10609 | Digital Marketing and Social Media | 3312 Sociology and Political Science | 1406 Marketing | field Social Sciences → Business, Management and Accounting |
| T10618 | Aortic Disease and Treatment Approaches | 2740 Pulmonary and Respiratory Medicine | 2705 Cardiology and Cardiovascular Medicine | same |
| T10625 | Herpesvirus Infections and Treatments | 2713 Epidemiology | 2725 Infectious Diseases | same |
| T10626 | High-Temperature Coating Behaviors | 2202 Aerospace Engineering | 2508 Surfaces, Coatings and Films | field Engineering → Materials Science |
| T10633 | Metallic Glasses and Amorphous Alloys | 2210 Mechanical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T10635 | Hydraulic Fracturing and Reservoir Analysis | 2210 Mechanical Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T10639 | Advanced Software Engineering Methodologies | 1702 Artificial Intelligence | 1712 Software | same |
| T10641 | Central Venous Catheters and Hemodialysis | 3604 Emergency Medical Services | 2706 Critical Care and Intensive Care Medicine | field Health Professions → Medicine |
| T10642 | Atmospheric-Pressure Plasma Applications | 2741 Radiology, Nuclear Medicine and Imaging | 3107 Atomic and Molecular Physics, and Optics | field Medicine → Physics and Astronomy; domain Health Sciences → Physical Sciences |
| T10646 | Experimental Behavioral Economics Studies | 3311 Safety Research | 2002 Economics and Econometrics | field Social Sciences → Economics, Econometrics and Finance |
| T10657 | Topological Materials and Phenomena | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T10658 | Bone fractures and treatments | 2713 Epidemiology | 2732 Orthopedics and Sports Medicine | same |
| T10667 | Emotion and Mood Recognition | 3205 Experimental and Cognitive Psychology | 1702 Artificial Intelligence | field Psychology → Computer Science; domain Social Sciences → Physical Sciences |
| T10670 | Aluminum Alloy Microstructure Properties | 2202 Aerospace Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T10675 | Mechanical Circulatory Support Devices | 2204 Biomedical Engineering | 2705 Cardiology and Cardiovascular Medicine | field Engineering → Medicine; domain Physical Sciences → Health Sciences |
| T10680 | Wind Energy Research and Development | 2202 Aerospace Engineering | 2105 Renewable Energy, Sustainability and the Environment | field Engineering → Energy |
| T10689 | Remote-Sensing Image Classification | 2214 Media Technology | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T10691 | Retinal Development and Disorders | 1312 Molecular Biology | 2731 Ophthalmology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T10692 | Urban Green Space and Health | 2307 Health, Toxicology and Mutagenesis | 3322 Urban Studies | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T10693 | Blood transfusion and management | 2704 Biochemistry (medical) | 2720 Hematology | same |
| T10696 | Gastric Cancer Management and Outcomes | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T10697 | Vasculitis and related conditions | 2740 Pulmonary and Respiratory Medicine | 2745 Rheumatology | same |
| T10699 | Primate Behavior and Ecology | 3207 Social Psychology | 1105 Ecology, Evolution, Behavior and Systematics | field Psychology → Agricultural and Biological Sciences; domain Social Sciences → Life Sciences |
| T10702 | Insect and Arachnid Ecology and Behavior | 1311 Genetics | 1109 Insect Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T10719 | 3D Shape Modeling and Analysis | 2206 Computational Mechanics | 1704 Computer Graphics and Computer-Aided Design | field Engineering → Computer Science |
| T10721 | Surfactants and Colloidal Systems | 1605 Organic Chemistry | 1606 Physical and Theoretical Chemistry | same |
| T10726 | Career Development and Diversity | 3311 Safety Research | 3202 Applied Psychology | field Social Sciences → Psychology |
| T10732 | Laser Material Processing Techniques | 2206 Computational Mechanics | 2209 Industrial and Manufacturing Engineering | same |
| T10754 | Neuroendocrine Tumor Research Advances | 2713 Epidemiology | 2730 Oncology | same |
| T10756 | Estrogen and related hormone effects | 1311 Genetics | 1310 Endocrinology | same |
| T10758 | Cinema and Media Studies | 2002 Economics and Econometrics | 1213 Visual Arts and Performing Arts | field Economics, Econometrics and Finance → Arts and Humanities |
| T10770 | Soil Geostatistics and Mapping | 2305 Environmental Engineering | 1111 Soil Science | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T10771 | Wound Healing and Treatments | 2742 Rehabilitation | 2746 Surgery | same |
| T10783 | Additive Manufacturing and 3D Printing Technologies | 2203 Automotive Engineering | 2209 Industrial and Manufacturing Engineering | same |
| T10787 | Lightning and Electromagnetic Phenomena | 3103 Astronomy and Astrophysics | 1902 Atmospheric Science | field Physics and Astronomy → Earth and Planetary Sciences |
| T10797 | Accounting and Organizational Management | 1404 Management Information Systems | 1402 Accounting | same |
| T10799 | Data Visualization and Analytics | 1707 Computer Vision and Pattern Recognition | 1704 Computer Graphics and Computer-Aided Design | same |
| T10801 | Synthetic Aperture Radar (SAR) Applications and Techniques | 2202 Aerospace Engineering | 1908 Geophysics | field Engineering → Earth and Planetary Sciences |
| T10806 | Energetic Materials and Combustion | 2211 Mechanics of Materials | 2505 Materials Chemistry | field Engineering → Materials Science |
| T10809 | Occupational Health and Safety Research | 3614 Radiological and Ultrasound Technology | 3311 Safety Research | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T10815 | Parasite Biology and Host Interactions | 2303 Ecology | 2405 Parasitology | field Environmental Science → Immunology and Microbiology; domain Physical Sciences → Life Sciences |
| T10816 | Cerebrovascular and Carotid Artery Diseases | 2740 Pulmonary and Respiratory Medicine | 2705 Cardiology and Cardiovascular Medicine | same |
| T10822 | Acoustic Wave Phenomena Research | 2204 Biomedical Engineering | 3102 Acoustics and Ultrasonics | field Engineering → Physics and Astronomy |
| T10825 | Plant Pathogens and Fungal Diseases | 1307 Cell Biology | 1110 Plant Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T10838 | Animal Behavior and Welfare Studies | 3404 Small Animals | 1103 Animal Science and Zoology | field Veterinary → Agricultural and Biological Sciences; domain Health Sciences → Life Sciences |
| T10839 | Pancreatic function and diabetes | 2746 Surgery | 2712 Endocrinology, Diabetes and Metabolism | same |
| T10852 | Temporomandibular Joint Disorders | 3603 Complementary and Manual Therapy | 3504 Oral Surgery | field Health Professions → Dentistry |
| T10863 | Voice and Speech Disorders | 2737 Physiology (medical) | 3616 Speech and Hearing | field Medicine → Health Professions |
| T10864 | Fluid Dynamics and Mixing | 2204 Biomedical Engineering | 1507 Fluid Flow and Transfer Processes | field Engineering → Chemical Engineering |
| T10875 | Pesticide Exposure and Toxicity | 1110 Plant Science | 3005 Toxicology | field Agricultural and Biological Sciences → Pharmacology, Toxicology and Pharmaceutics |
| T10879 | Robotic Locomotion and Control | 2204 Biomedical Engineering | 2207 Control and Systems Engineering | same |
| T10883 | Ethics and Social Impacts of AI | 3311 Safety Research | 1702 Artificial Intelligence | field Social Sciences → Computer Science; domain Social Sciences → Physical Sciences |
| T10892 | Drilling and Well Engineering | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T10893 | Chinese history and philosophy | 3312 Sociology and Political Science | 1202 History | field Social Sciences → Arts and Humanities |
| T10897 | Antibiotic Use and Resistance | 2402 Applied Microbiology and Biotechnology | 2725 Infectious Diseases | field Immunology and Microbiology → Medicine; domain Life Sciences → Health Sciences |
| T10900 | Listeria monocytogenes in Food Safety | 1305 Biotechnology | 1106 Food Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T10908 | Analytical Chemistry and Chromatography | 1607 Spectroscopy | 1602 Analytical Chemistry | same |
| T10911 | Chemical Synthesis and Analysis | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T10925 | Spinal Cord Injury Research | 2734 Pathology and Forensic Medicine | 2728 Clinical Neurology | same |
| T10927 | Access Control and Trust | 3312 Sociology and Political Science | 1705 Computer Networks and Communications | field Social Sciences → Computer Science; domain Social Sciences → Physical Sciences |
| T10928 | Probabilistic and Robust Engineering Design | 1804 Statistics, Probability and Uncertainty | 2206 Computational Mechanics | field Decision Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T10937 | Telomeres, Telomerase, and Senescence | 2737 Physiology (medical) | 1307 Cell Biology | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T10943 | Escherichia coli research studies | 1310 Endocrinology | 2404 Microbiology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T10945 | Lysosomal Storage Disorders Research | 2737 Physiology (medical) | 2716 Genetics (clinical) | same |
| T10946 | Radioactivity and Radon Measurements | 3614 Radiological and Ultrasound Technology | 3108 Radiation | field Health Professions → Physics and Astronomy; domain Health Sciences → Physical Sciences |
| T10947 | Fluorine in Organic Chemistry | 3003 Pharmaceutical Science | 1605 Organic Chemistry | field Pharmacology, Toxicology and Pharmaceutics → Chemistry; domain Life Sciences → Physical Sciences |
| T10950 | Acute Lymphoblastic Leukemia research | 2739 Public Health, Environmental and Occupational Health | 2720 Hematology | same |
| T10954 | Peripheral Nerve Disorders | 2741 Radiology, Nuclear Medicine and Imaging | 2728 Clinical Neurology | same |
| T10957 | Photodynamic Therapy Research Studies | 2740 Pulmonary and Respiratory Medicine | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T10967 | Carbon Dioxide Capture Technologies | 2210 Mechanical Engineering | 1506 Filtration and Separation | field Engineering → Chemical Engineering |
| T10969 | Water resources management and optimization | 2212 Ocean Engineering | 2312 Water Science and Technology | field Engineering → Environmental Science |
| T10974 | Advanced Queuing Theory Analysis | 1404 Management Information Systems | 1803 Management Science and Operations Research | field Business, Management and Accounting → Decision Sciences |
| T10975 | Bone Tumor Diagnosis and Treatments | 2745 Rheumatology | 2732 Orthopedics and Sports Medicine | same |
| T10983 | Aortic aneurysm repair treatments | 2740 Pulmonary and Respiratory Medicine | 2746 Surgery | same |
| T10986 | RFID technology advancements | 2214 Media Technology | 1705 Computer Networks and Communications | field Engineering → Computer Science |
| T10997 | Ocular Surface and Contact Lens | 2739 Public Health, Environmental and Occupational Health | 2731 Ophthalmology | same |
| T11003 | Disability Rights and Representation | 3311 Safety Research | 3312 Sociology and Political Science | same |
| T11009 | Catalysis for Biomass Conversion | 2204 Biomedical Engineering | 1503 Catalysis | field Engineering → Chemical Engineering |
| T11016 | Monoclonal and Polyclonal Antibodies Research | 2741 Radiology, Nuclear Medicine and Imaging | 2403 Immunology | field Medicine → Immunology and Microbiology; domain Health Sciences → Life Sciences |
| T11024 | Information Systems Theories and Implementation | 3312 Sociology and Political Science | 1404 Management Information Systems | field Social Sciences → Business, Management and Accounting |
| T11037 | Fungal Infections and Studies | 2713 Epidemiology | 2725 Infectious Diseases | same |
| T11046 | Geotechnical Engineering and Analysis | 2213 Safety, Risk, Reliability and Quality | 2205 Civil and Structural Engineering | same |
| T11048 | Bacteriophages and microbial interactions | 2303 Ecology | 2406 Virology | field Environmental Science → Immunology and Microbiology; domain Physical Sciences → Life Sciences |
| T11057 | Cardiac Ischemia and Reperfusion | 2734 Pathology and Forensic Medicine | 2705 Cardiology and Cardiovascular Medicine | same |
| T11058 | Ethics in Business and Education | 1802 Information Systems and Management | 1407 Organizational Behavior and Human Resource Management | field Decision Sciences → Business, Management and Accounting |
| T11073 | Metal Extraction and Bioleaching | 2204 Biomedical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T11074 | Helminth infection and control | 3404 Small Animals | 2405 Parasitology | field Veterinary → Immunology and Microbiology; domain Health Sciences → Life Sciences |
| T11084 | Workplace Health and Well-being | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T11088 | Marine Bivalve and Aquaculture Studies | 2306 Global and Planetary Change | 1104 Aquatic Science | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T11089 | Radioactive contamination and transfer | 2306 Global and Planetary Change | 2310 Pollution | same |
| T11091 | Extraction and Separation Processes | 2210 Mechanical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T11097 | Cerebral Palsy and Movement Disorders | 2738 Psychiatry and Mental health | 2742 Rehabilitation | same |
| T11104 | Memory, Trauma, and Commemoration | 3207 Social Psychology | 3316 Cultural Studies | field Psychology → Social Sciences |
| T11106 | Data Management and Algorithms | 1711 Signal Processing | 1710 Information Systems | same |
| T11112 | Viral Infections and Immunology Research | 2705 Cardiology and Cardiovascular Medicine | 2725 Infectious Diseases | same |
| T11126 | Metallurgical Processes and Thermodynamics | 2210 Mechanical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T11128 | Transition Metal Oxide Nanomaterials | 2507 Polymers and Plastics | 2504 Electronic, Optical and Magnetic Materials | same |
| T11130 | Coding theory and cryptography | 1702 Artificial Intelligence | 2607 Discrete Mathematics and Combinatorics | field Computer Science → Mathematics |
| T11136 | Enzyme-mediated dye degradation | 1110 Plant Science | 2402 Applied Microbiology and Biotechnology | field Agricultural and Biological Sciences → Immunology and Microbiology |
| T11145 | Epoxy Resin Curing Processes | 2210 Mechanical Engineering | 2507 Polymers and Plastics | field Engineering → Materials Science |
| T11148 | Language, Metaphor, and Cognition | 3205 Experimental and Cognitive Psychology | 3310 Linguistics and Language | field Psychology → Social Sciences |
| T11149 | Veterinary Oncology Research | 2740 Pulmonary and Respiratory Medicine | 3404 Small Animals | field Medicine → Veterinary |
| T11153 | Streptococcal Infections and Treatments | 2739 Public Health, Environmental and Occupational Health | 2725 Infectious Diseases | same |
| T11154 | Parasitic infections in humans and animals | 2734 Pathology and Forensic Medicine | 2405 Parasitology | field Medicine → Immunology and Microbiology; domain Health Sciences → Life Sciences |
| T11157 | Chronic Lymphocytic Leukemia Research | 2716 Genetics (clinical) | 2720 Hematology | same |
| T11160 | Acoustic Wave Resonator Technologies | 2204 Biomedical Engineering | 2208 Electrical and Electronic Engineering | same |
| T11162 | Enzyme Structure and Function | 2505 Materials Chemistry | 1315 Structural Biology | field Materials Science → Biochemistry, Genetics and Molecular Biology; domain Physical Sciences → Life Sciences |
| T11164 | Remote Sensing and LiDAR Applications | 2305 Environmental Engineering | 1107 Forestry | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T11167 | Hair Growth and Disorders | 2748 Urology | 2708 Dermatology | same |
| T11176 | Radiation Therapy and Dosimetry | 2740 Pulmonary and Respiratory Medicine | 3108 Radiation | field Medicine → Physics and Astronomy; domain Health Sciences → Physical Sciences |
| T11187 | Nonlinear Dynamics and Pattern Formation | 1705 Computer Networks and Communications | 3109 Statistical and Nonlinear Physics | field Computer Science → Physics and Astronomy |
| T11200 | Electrodeposition and Electroless Coatings | 2208 Electrical and Electronic Engineering | 2508 Surfaces, Coatings and Films | field Engineering → Materials Science |
| T11202 | Cavitation Phenomena in Pumps | 2211 Mechanics of Materials | 2210 Mechanical Engineering | same |
| T11208 | Lignin and Wood Chemistry | 2204 Biomedical Engineering | 1508 Process Chemistry and Technology | field Engineering → Chemical Engineering |
| T11209 | Cardiovascular and exercise physiology | 2707 Complementary and alternative medicine | 2737 Physiology (medical) | same |
| T11214 | Human-Animal Interaction Studies | 1311 Genetics | 1103 Animal Science and Zoology | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T11226 | Milk Quality and Mastitis in Dairy Cows | 1102 Agronomy and Crop Science | 1103 Animal Science and Zoology | same |
| T11232 | Urinary Tract Infections Management | 2713 Epidemiology | 2748 Urology | same |
| T11233 | Advanced Adaptive Filtering Techniques | 2206 Computational Mechanics | 1711 Signal Processing | field Engineering → Computer Science |
| T11238 | Simulation-Based Education in Healthcare | 2737 Physiology (medical) | 3304 Education | field Medicine → Social Sciences; domain Health Sciences → Social Sciences |
| T11241 | Advanced Malware Detection Techniques | 1711 Signal Processing | 1712 Software | same |
| T11251 | Meningioma and schwannoma management | 2713 Epidemiology | 2728 Clinical Neurology | same |
| T11253 | Nail Diseases and Treatments | 2713 Epidemiology | 2708 Dermatology | same |
| T11265 | Aging and Gerontology Research | 3206 Neuropsychology and Physiological Psychology | 3204 Developmental and Educational Psychology | same |
| T11269 | Algorithms and Data Compression | 1702 Artificial Intelligence | 2614 Theoretical Computer Science | field Computer Science → Mathematics |
| T11272 | Nanowire Synthesis and Applications | 2204 Biomedical Engineering | 2504 Electronic, Optical and Magnetic Materials | field Engineering → Materials Science |
| T11276 | Solar Radiation and Photovoltaics | 1702 Artificial Intelligence | 2105 Renewable Energy, Sustainability and the Environment | field Computer Science → Energy |
| T11283 | Experimental Learning in Engineering | 2214 Media Technology | 3304 Education | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11284 | Coal Properties and Utilization | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T11290 | Preterm Birth and Chorioamnionitis | 2713 Epidemiology | 2729 Obstetrics and Gynecology | same |
| T11295 | Counseling Practices and Supervision | 3207 Social Psychology | 3203 Clinical Psychology | same |
| T11297 | Ferroptosis and cancer prognosis | 2740 Pulmonary and Respiratory Medicine | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T11301 | Advanced Surface Polishing Techniques | 2204 Biomedical Engineering | 2209 Industrial and Manufacturing Engineering | same |
| T11305 | Amyloidosis: Diagnosis, Treatment, Outcomes | 1312 Molecular Biology | 2724 Internal Medicine | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T11306 | Nonmelanoma Skin Cancer Studies | 2713 Epidemiology | 2708 Dermatology | same |
| T11314 | Clinical Laboratory Practices and Quality Control | 2737 Physiology (medical) | 3607 Medical Laboratory Technology | field Medicine → Health Professions |
| T11318 | Phytoestrogen effects and research | 2734 Pathology and Forensic Medicine | 2916 Nutrition and Dietetics | field Medicine → Nursing |
| T11330 | Systemic Sclerosis and Related Diseases | 2734 Pathology and Forensic Medicine | 2745 Rheumatology | same |
| T11344 | Traffic Prediction and Management Techniques | 2215 Building and Construction | 3313 Transportation | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11345 | Cognitive and developmental aspects of mathematical skills | 2613 Statistics and Probability | 3204 Developmental and Educational Psychology | field Mathematics → Psychology; domain Physical Sciences → Social Sciences |
| T11347 | Neural Networks Stability and Synchronization | 1705 Computer Networks and Communications | 2207 Control and Systems Engineering | field Computer Science → Engineering |
| T11349 | Music Technology and Sound Studies | 1707 Computer Vision and Pattern Recognition | 1210 Music | field Computer Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T11351 | Catalysis and Hydrodesulfurization Studies | 2210 Mechanical Engineering | 1503 Catalysis | field Engineering → Chemical Engineering |
| T11353 | Venomous Animal Envenomation and Studies | 1311 Genetics | 3005 Toxicology | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T11357 | Risk and Safety Analysis | 1804 Statistics, Probability and Uncertainty | 2213 Safety, Risk, Reliability and Quality | field Decision Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T11361 | Digital Radiography and Breast Imaging | 2740 Pulmonary and Respiratory Medicine | 2741 Radiology, Nuclear Medicine and Imaging | same |
| T11362 | Membrane Separation and Gas Transport | 2210 Mechanical Engineering | 1506 Filtration and Separation | field Engineering → Chemical Engineering |
| T11367 | Particle accelerators and beam dynamics | 2202 Aerospace Engineering | 3106 Nuclear and High Energy Physics | field Engineering → Physics and Astronomy |
| T11374 | Cleft Lip and Palate Research | 1311 Genetics | 3504 Oral Surgery | field Biochemistry, Genetics and Molecular Biology → Dentistry; domain Life Sciences → Health Sciences |
| T11376 | Geriatric Care and Nursing Homes | 3600 General Health Professions | 2717 Geriatrics and Gerontology | field Health Professions → Medicine |
| T11377 | Retinal and Macular Surgery | 2741 Radiology, Nuclear Medicine and Imaging | 2731 Ophthalmology | same |
| T11380 | Child Welfare and Adoption | 3311 Safety Research | 3312 Sociology and Political Science | same |
| T11383 | Advanced Antenna and Metasurface Technologies | 2202 Aerospace Engineering | 2208 Electrical and Electronic Engineering | same |
| T11385 | Natural product bioactivities and synthesis | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T11399 | Muscle metabolism and nutrition | 1307 Cell Biology | 2916 Nutrition and Dietetics | field Biochemistry, Genetics and Molecular Biology → Nursing; domain Life Sciences → Health Sciences |
| T11401 | Minerals Flotation and Separation Techniques | 2312 Water Science and Technology | 1506 Filtration and Separation | field Environmental Science → Chemical Engineering |
| T11405 | Geophysics and Gravity Measurements | 1910 Oceanography | 1908 Geophysics | same |
| T11406 | Cerebrospinal fluid and hydrocephalus | 2804 Cellular and Molecular Neuroscience | 2728 Clinical Neurology | field Neuroscience → Medicine; domain Life Sciences → Health Sciences |
| T11407 | Innovative Microfluidic and Catalytic Techniques Innovation | 2204 Biomedical Engineering | 1507 Fluid Flow and Transfer Processes | field Engineering → Chemical Engineering |
| T11411 | Tea Polyphenols and Effects | 2734 Pathology and Forensic Medicine | 1106 Food Science | field Medicine → Agricultural and Biological Sciences; domain Health Sciences → Life Sciences |
| T11415 | Noncommutative and Quantum Gravity Theories | 3109 Statistical and Nonlinear Physics | 3106 Nuclear and High Energy Physics | same |
| T11421 | Labor Movements and Unions | 3321 Public Administration | 1410 Industrial relations | field Social Sciences → Business, Management and Accounting |
| T11422 | Burn Injury Management and Outcomes | 2713 Epidemiology | 2746 Surgery | same |
| T11424 | Security and Verification in Computing | 1702 Artificial Intelligence | 1708 Hardware and Architecture | same |
| T11427 | Elbow and Forearm Trauma Treatment | 2742 Rehabilitation | 2732 Orthopedics and Sports Medicine | same |
| T11451 | Advanced Machining and Optimization Techniques | 2208 Electrical and Electronic Engineering | 2209 Industrial and Manufacturing Engineering | same |
| T11452 | Oral Health Pathology and Treatment | 3506 Periodontics | 3500 General Dentistry | same |
| T11464 | Homelessness and Social Issues | 3600 General Health Professions | 3312 Sociology and Political Science | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T11466 | Innovative Education and Learning Practices | 3307 Human Factors and Ergonomics | 3304 Education | same |
| T11472 | Analytical Chemistry and Sensors | 1502 Bioengineering | 1602 Analytical Chemistry | field Chemical Engineering → Chemistry |
| T11476 | Graph theory and applications | 2608 Geometry and Topology | 2607 Discrete Mathematics and Combinatorics | same |
| T11479 | Smart Cities and Technologies | 2214 Media Technology | 3322 Urban Studies | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11487 | Automotive and Human Injury Biomechanics | 2740 Pulmonary and Respiratory Medicine | 2204 Biomedical Engineering | field Medicine → Engineering; domain Health Sciences → Physical Sciences |
| T11492 | Academic integrity and plagiarism | 3311 Safety Research | 3304 Education | same |
| T11499 | ICT Impact and Policies | 2214 Media Technology | 2002 Economics and Econometrics | field Engineering → Economics, Econometrics and Finance; domain Physical Sciences → Social Sciences |
| T11500 | Evacuation and Crowd Dynamics | 2212 Ocean Engineering | 3311 Safety Research | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11502 | Facility Location and Emergency Management | 1407 Organizational Behavior and Human Resource Management | 1803 Management Science and Operations Research | field Business, Management and Accounting → Decision Sciences |
| T11503 | Cytokine Signaling Pathways and Interactions | 2730 Oncology | 2403 Immunology | field Medicine → Immunology and Microbiology; domain Health Sciences → Life Sciences |
| T11511 | Dyeing and Modifying Textile Fibers | 2215 Building and Construction | 2507 Polymers and Plastics | field Engineering → Materials Science |
| T11514 | Disability Education and Employment | 3311 Safety Research | 3304 Education | same |
| T11517 | Advanced optical system design | 2204 Biomedical Engineering | 3107 Atomic and Molecular Physics, and Optics | field Engineering → Physics and Astronomy |
| T11524 | Advanced Aircraft Design and Technologies | 2306 Global and Planetary Change | 2202 Aerospace Engineering | field Environmental Science → Engineering |
| T11530 | Business and Management Studies | 1802 Information Systems and Management | 1403 Business and International Management | field Decision Sciences → Business, Management and Accounting |
| T11531 | Healthcare Systems and Reforms | 2003 Finance | 2739 Public Health, Environmental and Occupational Health | field Economics, Econometrics and Finance → Medicine; domain Social Sciences → Health Sciences |
| T11538 | Ophthalmology and Eye Disorders | 2734 Pathology and Forensic Medicine | 2731 Ophthalmology | same |
| T11541 | Neuroendocrine regulation and behavior | 3207 Social Psychology | 2807 Endocrine and Autonomic Systems | field Psychology → Neuroscience; domain Social Sciences → Life Sciences |
| T11547 | Sesquiterpenes and Asteraceae Studies | 1306 Cancer Research | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T11551 | Infective Endocarditis Diagnosis and Management | 2713 Epidemiology | 2705 Cardiology and Cardiovascular Medicine | same |
| T11555 | Methodologies in Health Research and Practice | 3605 Health Information Management | 2922 Research and Theory | field Health Professions → Nursing |
| T11556 | Poverty, Education, and Child Welfare | 3311 Safety Research | 3303 Development | same |
| T11560 | Animal Disease Management and Epidemiology | 1102 Agronomy and Crop Science | 1103 Animal Science and Zoology | same |
| T11561 | Protein Hydrolysis and Bioactive Peptides | 1312 Molecular Biology | 1106 Food Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T11568 | Railway Systems and Energy Efficiency | 2209 Industrial and Manufacturing Engineering | 3313 Transportation | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11570 | Periodontal Regeneration and Treatments | 2748 Urology | 3506 Periodontics | field Medicine → Dentistry |
| T11571 | Sarcoidosis and Beryllium Toxicity Research | 2737 Physiology (medical) | 2740 Pulmonary and Respiratory Medicine | same |
| T11585 | Exercise and Physiological Responses | 2742 Rehabilitation | 2737 Physiology (medical) | same |
| T11590 | Primary Care and Health Outcomes | 3600 General Health Professions | 2714 Family Practice | field Health Professions → Medicine |
| T11592 | Phenomenology and Existential Philosophy | 3205 Experimental and Cognitive Psychology | 1211 Philosophy | field Psychology → Arts and Humanities |
| T11596 | Constraint Satisfaction and Optimization | 1705 Computer Networks and Communications | 1702 Artificial Intelligence | same |
| T11600 | Brain Metastases and Treatment | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T11608 | Dielectric materials and actuators | 2204 Biomedical Engineering | 2504 Electronic, Optical and Magnetic Materials | field Engineering → Materials Science |
| T11609 | Geophysical Methods and Applications | 2212 Ocean Engineering | 1908 Geophysics | field Engineering → Earth and Planetary Sciences |
| T11610 | Food Security and Health in Diverse Populations | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T11618 | Cholesterol and Lipid Metabolism | 2746 Surgery | 1303 Biochemistry | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T11626 | Metalloenzymes and iron-sulfur proteins | 2105 Renewable Energy, Sustainability and the Environment | 1303 Biochemistry | field Energy → Biochemistry, Genetics and Molecular Biology; domain Physical Sciences → Life Sciences |
| T11628 | Myeloproliferative Neoplasms: Diagnosis and Treatment | 2716 Genetics (clinical) | 2720 Hematology | same |
| T11646 | Nonlocal and gradient elasticity in micro/nano structures | 2505 Materials Chemistry | 2211 Mechanics of Materials | field Materials Science → Engineering |
| T11647 | Workplace Violence and Bullying | 3312 Sociology and Political Science | 1407 Organizational Behavior and Human Resource Management | field Social Sciences → Business, Management and Accounting |
| T11649 | Pharmaceutical industry and healthcare | 3004 Pharmacology | 2910 Issues, ethics and legal aspects | field Pharmacology, Toxicology and Pharmaceutics → Nursing; domain Life Sciences → Health Sciences |
| T11655 | HIV-related health complications and treatments | 2711 Emergency Medicine | 2725 Infectious Diseases | same |
| T11662 | Legal Cases and Commentary | 2743 Reproductive Medicine | 3308 Law | field Medicine → Social Sciences; domain Health Sciences → Social Sciences |
| T11665 | Animal Vocal Communication and Behavior | 1309 Developmental Biology | 1105 Ecology, Evolution, Behavior and Systematics | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T11670 | Pressure Ulcer Prevention and Management | 3609 Occupational Therapy | 2708 Dermatology | field Health Professions → Medicine |
| T11679 | Craniofacial Disorders and Treatments | 1311 Genetics | 2746 Surgery | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T11680 | Advanced Algebra and Geometry | 2610 Mathematical Physics | 2602 Algebra and Number Theory | same |
| T11684 | Vibrio bacteria research studies | 1310 Endocrinology | 2404 Microbiology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T11692 | Noise Effects and Management | 3616 Speech and Hearing | 3102 Acoustics and Ultrasonics | field Health Professions → Physics and Astronomy; domain Health Sciences → Physical Sciences |
| T11696 | Conflict Management and Negotiation | 3312 Sociology and Political Science | 1407 Organizational Behavior and Human Resource Management | field Social Sciences → Business, Management and Accounting |
| T11699 | High-Velocity Impact and Material Behavior | 2505 Materials Chemistry | 2211 Mechanics of Materials | field Materials Science → Engineering |
| T11710 | Biomedical Text Mining and Ontologies | 1312 Molecular Biology | 2718 Health Informatics | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T11718 | Physical Education and Pedagogy | 3612 Physical Therapy, Sports Therapy and Rehabilitation | 3304 Education | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T11719 | Data Quality and Management | 1803 Management Science and Operations Research | 1710 Information Systems | field Decision Sciences → Computer Science; domain Social Sciences → Physical Sciences |
| T11721 | Blood properties and coagulation | 2740 Pulmonary and Respiratory Medicine | 2720 Hematology | same |
| T11724 | Inflammatory Myopathies and Dermatomyositis | 2713 Epidemiology | 2745 Rheumatology | same |
| T11730 | Autoimmune Bullous Skin Diseases | 2734 Pathology and Forensic Medicine | 2708 Dermatology | same |
| T11746 | Inorganic and Organometallic Chemistry | 1605 Organic Chemistry | 1604 Inorganic Chemistry | same |
| T11753 | Forest Management and Policy | 2306 Global and Planetary Change | 1107 Forestry | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T11756 | Mentoring and Academic Development | 3207 Social Psychology | 3304 Education | field Psychology → Social Sciences |
| T11773 | Healthcare Operations and Scheduling Optimization | 3604 Emergency Medical Services | 1803 Management Science and Operations Research | field Health Professions → Decision Sciences; domain Health Sciences → Social Sciences |
| T11786 | Geomagnetism and Paleomagnetism Studies | 1312 Molecular Biology | 1908 Geophysics | field Biochemistry, Genetics and Molecular Biology → Earth and Planetary Sciences; domain Life Sciences → Physical Sciences |
| T11788 | Two-Photon Absorption and Optical Limiting | 2204 Biomedical Engineering | 2504 Electronic, Optical and Magnetic Materials | field Engineering → Materials Science |
| T11793 | Recreation, Leisure, Wilderness Management | 3207 Social Psychology | 1409 Tourism, Leisure and Hospitality Management | field Psychology → Business, Management and Accounting |
| T11801 | Reservoir Engineering and Simulation Methods | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T11802 | Chemical Looping and Thermochemical Processes | 2204 Biomedical Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T11803 | Superconducting and THz Device Technology | 3103 Astronomy and Astrophysics | 2208 Electrical and Electronic Engineering | field Physics and Astronomy → Engineering |
| T11805 | Farm Economics and Agricultural Markets | 3311 Safety Research | 2002 Economics and Econometrics | field Social Sciences → Economics, Econometrics and Finance |
| T11808 | Superconducting Materials and Applications | 2204 Biomedical Engineering | 2208 Electrical and Electronic Engineering | same |
| T11813 | Library Collection Development and Digital Resources | 1710 Information Systems | 3309 Library and Information Sciences | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T11828 | Corneal Surgery and Treatments | 2741 Radiology, Nuclear Medicine and Imaging | 2731 Ophthalmology | same |
| T11832 | Doctoral Education Challenges and Solutions | 3600 General Health Professions | 3304 Education | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T11833 | Spinal Dysraphism and Malformations | 2739 Public Health, Environmental and Occupational Health | 2728 Clinical Neurology | same |
| T11837 | Iron and Steelmaking Processes | 2210 Mechanical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T11842 | Ultrasound and Cavitation Phenomena | 2505 Materials Chemistry | 3102 Acoustics and Ultrasonics | field Materials Science → Physics and Astronomy |
| T11852 | Clay minerals and soil interactions | 2502 Biomaterials | 1906 Geochemistry and Petrology | field Materials Science → Earth and Planetary Sciences |
| T11853 | Semiconductor materials and interfaces | 3107 Atomic and Molecular Physics, and Optics | 2504 Electronic, Optical and Magnetic Materials | field Physics and Astronomy → Materials Science |
| T11854 | Laser-induced spectroscopy and plasma | 2211 Mechanics of Materials | 1607 Spectroscopy | field Engineering → Chemistry |
| T11859 | Educator Training and Historical Pedagogy | 3312 Sociology and Political Science | 3304 Education | same |
| T11862 | Agriculture, Land Use, Rural Development | 1100 General Agricultural and Biological Sciences | 3303 Development | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T11877 | Iron oxide chemistry and applications | 2105 Renewable Energy, Sustainability and the Environment | 2505 Materials Chemistry | field Energy → Materials Science |
| T11879 | Protist diversity and phylogeny | 1312 Molecular Biology | 1105 Ecology, Evolution, Behavior and Systematics | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T11880 | Forest ecology and management | 2309 Nature and Landscape Conservation | 1107 Forestry | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T11886 | Agricultural risk and resilience | 1111 Soil Science | 2002 Economics and Econometrics | field Agricultural and Biological Sciences → Economics, Econometrics and Finance; domain Life Sciences → Social Sciences |
| T11889 | Ginseng Biological Effects and Applications | 1312 Molecular Biology | 3004 Pharmacology | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T11890 | Scientific Measurement and Uncertainty Evaluation | 1804 Statistics, Probability and Uncertainty | 3105 Instrumentation | field Decision Sciences → Physics and Astronomy; domain Social Sciences → Physical Sciences |
| T11892 | Kawasaki Disease and Coronary Complications | 2746 Surgery | 2735 Pediatrics, Perinatology and Child Health | same |
| T11899 | Brucella: diagnosis, epidemiology, treatment | 3404 Small Animals | 2725 Infectious Diseases | field Veterinary → Medicine |
| T11900 | Fungal Plant Pathogen Control | 1105 Ecology, Evolution, Behavior and Systematics | 1110 Plant Science | same |
| T11903 | Private Equity and Venture Capital | 1402 Accounting | 2003 Finance | field Business, Management and Accounting → Economics, Econometrics and Finance |
| T11904 | Spatial Cognition and Navigation | 2203 Automotive Engineering | 3205 Experimental and Cognitive Psychology | field Engineering → Psychology; domain Physical Sciences → Social Sciences |
| T11909 | Histiocytic Disorders and Treatments | 2737 Physiology (medical) | 2720 Hematology | same |
| T11910 | Foreign Body Medical Cases | 2741 Radiology, Nuclear Medicine and Imaging | 2733 Otorhinolaryngology | same |
| T11917 | Coagulation, Bradykinin, Polyphosphates, and Angioedema | 2716 Genetics (clinical) | 2720 Hematology | same |
| T11919 | dental development and anomalies | 1312 Molecular Biology | 3500 General Dentistry | field Biochemistry, Genetics and Molecular Biology → Dentistry; domain Life Sciences → Health Sciences |
| T11920 | Pulsed Power Technology Applications | 2207 Control and Systems Engineering | 2208 Electrical and Electronic Engineering | same |
| T11925 | Culinary Culture and Tourism | 1106 Food Science | 1409 Tourism, Leisure and Hospitality Management | field Agricultural and Biological Sciences → Business, Management and Accounting; domain Life Sciences → Social Sciences |
| T11926 | Subterranean biodiversity and taxonomy | 1911 Paleontology | 1105 Ecology, Evolution, Behavior and Systematics | field Earth and Planetary Sciences → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T11931 | Organoselenium and organotellurium chemistry | 3005 Toxicology | 1605 Organic Chemistry | field Pharmacology, Toxicology and Pharmaceutics → Chemistry; domain Life Sciences → Physical Sciences |
| T11933 | Mining and Resource Management | 2215 Building and Construction | 2308 Management, Monitoring, Policy and Law | field Engineering → Environmental Science |
| T11934 | Syphilis Diagnosis and Treatment | 2737 Physiology (medical) | 2725 Infectious Diseases | same |
| T11935 | Literacy, Media, and Education | 1208 Literature and Literary Theory | 3304 Education | field Arts and Humanities → Social Sciences |
| T11942 | Transportation and Mobility Innovations | 2203 Automotive Engineering | 3313 Transportation | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T11946 | Antenna Design and Optimization | 2202 Aerospace Engineering | 2208 Electrical and Electronic Engineering | same |
| T11947 | Molten salt chemistry and electrochemical processes | 1507 Fluid Flow and Transfer Processes | 1603 Electrochemistry | field Chemical Engineering → Chemistry |
| T11950 | Cardiovascular Syncope and Autonomic Disorders | 2746 Surgery | 2705 Cardiology and Cardiovascular Medicine | same |
| T11953 | Neuroethics, Human Enhancement, Biomedical Innovations | 2805 Cognitive Neuroscience | 1211 Philosophy | field Neuroscience → Arts and Humanities; domain Life Sciences → Social Sciences |
| T11956 | Sexual Differentiation and Disorders | 1312 Molecular Biology | 2712 Endocrinology, Diabetes and Metabolism | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T11958 | Dental Erosion and Treatment | 3505 Orthodontics | 3500 General Dentistry | same |
| T11959 | Employment and Welfare Studies | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T11961 | Neonatal and Maternal Infections | 2739 Public Health, Environmental and Occupational Health | 2735 Pediatrics, Perinatology and Child Health | same |
| T11967 | Electrolyte and hormonal disorders | 2740 Pulmonary and Respiratory Medicine | 2727 Nephrology | same |
| T11968 | High Altitude and Hypoxia | 1311 Genetics | 2737 Physiology (medical) | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T11974 | Lepidoptera: Biology and Taxonomy | 1311 Genetics | 1109 Insect Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T11977 | Technology Use by Older Adults | 3317 Demography | 2717 Geriatrics and Gerontology | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T11978 | Soil Mechanics and Vehicle Dynamics | 2205 Civil and Structural Engineering | 2203 Automotive Engineering | same |
| T11982 | Rhetoric and Communication Studies | 1211 Philosophy | 3315 Communication | field Arts and Humanities → Social Sciences |
| T11990 | Global Health Workforce Issues | 3604 Emergency Medical Services | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T11991 | Soft tissue tumor case studies | 2745 Rheumatology | 2730 Oncology | same |
| T11996 | Random lasers and scattering media | 3102 Acoustics and Ultrasonics | 3107 Atomic and Molecular Physics, and Optics | same |
| T11997 | Free Will and Agency | 2805 Cognitive Neuroscience | 1211 Philosophy | field Neuroscience → Arts and Humanities; domain Life Sciences → Social Sciences |
| T11998 | Youth Development and Social Support | 3311 Safety Research | 3204 Developmental and Educational Psychology | field Social Sciences → Psychology |
| T12006 | Ergonomics and Musculoskeletal Disorders | 3207 Social Psychology | 3307 Human Factors and Ergonomics | field Psychology → Social Sciences |
| T12010 | Evaluation and Performance Assessment | 1803 Management Science and Operations Research | 3321 Public Administration | field Decision Sciences → Social Sciences |
| T12012 | Diatoms and Algae Research | 2502 Biomaterials | 1105 Ecology, Evolution, Behavior and Systematics | field Materials Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12018 | Coronary Artery Anomalies | 2740 Pulmonary and Respiratory Medicine | 2705 Cardiology and Cardiovascular Medicine | same |
| T12028 | Knowledge Management and Sharing | 3315 Communication | 1802 Information Systems and Management | field Social Sciences → Decision Sciences |
| T12029 | DNA and Biological Computing | 1312 Molecular Biology | 2614 Theoretical Computer Science | field Biochemistry, Genetics and Molecular Biology → Mathematics; domain Life Sciences → Physical Sciences |
| T12040 | International Arbitration and Investment Law | 1408 Strategy and Management | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T12041 | Public Health Policies and Education | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12049 | Tuberous Sclerosis Complex Research | 2737 Physiology (medical) | 2716 Genetics (clinical) | same |
| T12050 | Optical Polarization and Ellipsometry | 2204 Biomedical Engineering | 3107 Atomic and Molecular Physics, and Optics | field Engineering → Physics and Astronomy |
| T12051 | Diversity and Impact of Dance | 3205 Experimental and Cognitive Psychology | 1213 Visual Arts and Performing Arts | field Psychology → Arts and Humanities |
| T12062 | Approximation Theory and Sequence Spaces | 2613 Statistics and Probability | 2604 Applied Mathematics | same |
| T12066 | Obesity and Health Practices | 3611 Pharmacy | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12067 | Renal and Vascular Pathologies | 2740 Pulmonary and Respiratory Medicine | 2727 Nephrology | same |
| T12074 | Membrane-based Ion Separation Techniques | 2204 Biomedical Engineering | 1506 Filtration and Separation | field Engineering → Chemical Engineering |
| T12078 | Environmental remediation with nanomaterials | 2204 Biomedical Engineering | 2305 Environmental Engineering | field Engineering → Environmental Science |
| T12092 | Erosion and Abrasive Machining | 2302 Ecological Modeling | 2210 Mechanical Engineering | field Environmental Science → Engineering |
| T12094 | Hemoglobin structure and function | 1307 Cell Biology | 1303 Biochemistry | same |
| T12096 | Ectopic Pregnancy Diagnosis and Management | 2739 Public Health, Environmental and Occupational Health | 2729 Obstetrics and Gynecology | same |
| T12098 | Rural development and sustainability | 1100 General Agricultural and Biological Sciences | 3305 Geography, Planning and Development | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T12099 | Advanced materials and composites | 2210 Mechanical Engineering | 2503 Ceramics and Composites | field Engineering → Materials Science |
| T12100 | Advanced Mathematical Modeling in Engineering | 1703 Computational Theory and Mathematics | 2604 Applied Mathematics | field Computer Science → Mathematics |
| T12110 | Bone and Dental Protein Studies | 2745 Rheumatology | 1303 Biochemistry | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T12118 | Forest Biomass Utilization and Management | 2211 Mechanics of Materials | 2105 Renewable Energy, Sustainability and the Environment | field Engineering → Energy |
| T12119 | Linguistics and Discourse Analysis | 1211 Philosophy | 3310 Linguistics and Language | field Arts and Humanities → Social Sciences |
| T12124 | Engineering Education and Curriculum Development | 2214 Media Technology | 3304 Education | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T12128 | AI in Service Interactions | 1702 Artificial Intelligence | 1406 Marketing | field Computer Science → Business, Management and Accounting; domain Physical Sciences → Social Sciences |
| T12138 | Occupational Health and Performance | 3609 Occupational Therapy | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12140 | Renal and related cancers | 1312 Molecular Biology | 2730 Oncology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12142 | Marine Invertebrate Physiology and Ecology | 1911 Paleontology | 1103 Animal Science and Zoology | field Earth and Planetary Sciences → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12144 | Colonialism, slavery, and trade | 3314 Anthropology | 1202 History | field Social Sciences → Arts and Humanities |
| T12157 | Geochemistry and Geologic Mapping | 1702 Artificial Intelligence | 1906 Geochemistry and Petrology | field Computer Science → Earth and Planetary Sciences |
| T12160 | African cultural and philosophical studies | 3304 Education | 1211 Philosophy | field Social Sciences → Arts and Humanities |
| T12164 | Education Practices and Challenges | 1211 Philosophy | 3304 Education | field Arts and Humanities → Social Sciences |
| T12166 | Ion-surface interactions and analysis | 2206 Computational Mechanics | 2508 Surfaces, Coatings and Films | field Engineering → Materials Science |
| T12167 | Bacterial Identification and Susceptibility Testing | 1308 Clinical Biochemistry | 2726 Microbiology (medical) | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12170 | History and Theory of Mathematics | 2614 Theoretical Computer Science | 1207 History and Philosophy of Science | field Mathematics → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T12171 | Open Education and E-Learning | 1706 Computer Science Applications | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12174 | Hospital Admissions and Outcomes | 2711 Emergency Medicine | 2911 Leadership and Management | field Medicine → Nursing |
| T12184 | Linguistics and Education Research | 1208 Literature and Literary Theory | 3304 Education | field Arts and Humanities → Social Sciences |
| T12185 | Regulation and Compliance Studies | 1408 Strategy and Management | 3321 Public Administration | field Business, Management and Accounting → Social Sciences |
| T12193 | Trigeminal Neuralgia and Treatments | 2734 Pathology and Forensic Medicine | 2728 Clinical Neurology | same |
| T12194 | Cultural Competency in Health Care | 3312 Sociology and Political Science | 2739 Public Health, Environmental and Occupational Health | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T12195 | Aerogels and thermal insulation | 1607 Spectroscopy | 2505 Materials Chemistry | field Chemistry → Materials Science |
| T12196 | Community Health and Development | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12198 | Oral health in cancer treatment | 2740 Pulmonary and Respiratory Medicine | 3500 General Dentistry | field Medicine → Dentistry |
| T12202 | nanoparticles nucleation surface interactions | 1902 Atmospheric Science | 1606 Physical and Theoretical Chemistry | field Earth and Planetary Sciences → Chemistry |
| T12206 | Vibration and Dynamic Analysis | 2207 Control and Systems Engineering | 2210 Mechanical Engineering | same |
| T12214 | Media Influence and Health | 1208 Literature and Literary Theory | 3315 Communication | field Arts and Humanities → Social Sciences |
| T12215 | Phytochemical Studies and Bioactivities | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T12219 | Canadian Identity and History | 3312 Sociology and Political Science | 1202 History | field Social Sciences → Arts and Humanities |
| T12223 | Leptospirosis research and findings | 2405 Parasitology | 2725 Infectious Diseases | field Immunology and Microbiology → Medicine; domain Life Sciences → Health Sciences |
| T12224 | Nanofabrication and Lithography Techniques | 2204 Biomedical Engineering | 2508 Surfaces, Coatings and Films | field Engineering → Materials Science |
| T12226 | Neuroblastoma Research and Treatments | 2728 Clinical Neurology | 2730 Oncology | same |
| T12232 | Yersinia bacterium, plague, ectoparasites research | 1311 Genetics | 2725 Infectious Diseases | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12234 | Mollusks and Parasites Studies | 1109 Insect Science | 1103 Animal Science and Zoology | same |
| T12250 | Experimental and Theoretical Physics Studies | 3109 Statistical and Nonlinear Physics | 3304 Education | field Physics and Astronomy → Social Sciences; domain Physical Sciences → Social Sciences |
| T12253 | Urban Agriculture and Sustainability | 1110 Plant Science | 3322 Urban Studies | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T12256 | Facilities and Workplace Management | 3207 Social Psychology | 2216 Architecture | field Psychology → Engineering; domain Social Sciences → Physical Sciences |
| T12257 | Bioactive natural compounds | 1312 Molecular Biology | 3002 Drug Discovery | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T12260 | Educational Technology and Pedagogy | 1702 Artificial Intelligence | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12272 | Cardiovascular Conditions and Treatments | 2741 Radiology, Nuclear Medicine and Imaging | 2735 Pediatrics, Perinatology and Child Health | same |
| T12283 | Latin American history and culture | 1213 Visual Arts and Performing Arts | 1202 History | same |
| T12285 | Surface Chemistry and Catalysis | 2204 Biomedical Engineering | 1606 Physical and Theoretical Chemistry | field Engineering → Chemistry |
| T12288 | Optimization and Search Problems | 1705 Computer Networks and Communications | 2614 Theoretical Computer Science | field Computer Science → Mathematics |
| T12290 | Human Motion and Animation | 2207 Control and Systems Engineering | 1704 Computer Graphics and Computer-Aided Design | field Engineering → Computer Science |
| T12292 | Graph Theory and Algorithms | 1707 Computer Vision and Pattern Recognition | 1703 Computational Theory and Mathematics | same |
| T12296 | Autopsy Techniques and Outcomes | 2741 Radiology, Nuclear Medicine and Imaging | 2734 Pathology and Forensic Medicine | same |
| T12306 | Urban and Freight Transport Logistics | 2215 Building and Construction | 3313 Transportation | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T12312 | Culture, Economy, and Development Studies | 3317 Demography | 3303 Development | same |
| T12315 | Older Adults Driving Studies | 3612 Physical Therapy, Sports Therapy and Rehabilitation | 2717 Geriatrics and Gerontology | field Health Professions → Medicine |
| T12322 | Animal health and immunology | 3404 Small Animals | 1103 Animal Science and Zoology | field Veterinary → Agricultural and Biological Sciences; domain Health Sciences → Life Sciences |
| T12325 | Urban Design and Spatial Analysis | 2215 Building and Construction | 3322 Urban Studies | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T12327 | Various Chemistry Research Topics | 1606 Physical and Theoretical Chemistry | 3304 Education | field Chemistry → Social Sciences; domain Physical Sciences → Social Sciences |
| T12328 | Autoimmune and Inflammatory Disorders | 2713 Epidemiology | 2708 Dermatology | same |
| T12333 | Abdominal Surgery and Complications | 2740 Pulmonary and Respiratory Medicine | 2746 Surgery | same |
| T12338 | Digital literacy in education | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12339 | Medical Malpractice and Liability Issues | 3611 Pharmacy | 3308 Law | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T12348 | Rural Development and Agriculture | 2308 Management, Monitoring, Policy and Law | 3303 Development | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12350 | Particle Dynamics in Fluid Flows | 2212 Ocean Engineering | 1507 Fluid Flow and Transfer Processes | field Engineering → Chemical Engineering |
| T12352 | Heparin-Induced Thrombocytopenia and Thrombosis | 2746 Surgery | 2720 Hematology | same |
| T12355 | Genetic and rare skin diseases. | 1311 Genetics | 2708 Dermatology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12364 | Archaeological Research and Protection | 1912 Space and Planetary Science | 3302 Archeology | field Earth and Planetary Sciences → Social Sciences; domain Physical Sciences → Social Sciences |
| T12367 | Dental Trauma and Treatments | 3604 Emergency Medical Services | 3500 General Dentistry | field Health Professions → Dentistry |
| T12372 | Art Therapy and Mental Health | 1206 Conservation | 3203 Clinical Psychology | field Arts and Humanities → Psychology |
| T12381 | Electron Spin Resonance Studies | 1304 Biophysics | 1607 Spectroscopy | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T12389 | Infrared Target Detection Methodologies | 2202 Aerospace Engineering | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T12391 | Artificial Immune Systems Applications | 2204 Biomedical Engineering | 1702 Artificial Intelligence | field Engineering → Computer Science |
| T12393 | Workplace Spirituality and Leadership | 3317 Demography | 1407 Organizational Behavior and Human Resource Management | field Social Sciences → Business, Management and Accounting |
| T12395 | ICT and E-Learning in Education | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12406 | IoT and GPS-based Vehicle Safety Systems | 2210 Mechanical Engineering | 2203 Automotive Engineering | same |
| T12408 | Digital Transformation of Higher Education | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12411 | Shoulder and Clavicle Injuries | 2713 Epidemiology | 2732 Orthopedics and Sports Medicine | same |
| T12417 | Morphological variations and asymmetry | 2608 Geometry and Topology | 1105 Ecology, Evolution, Behavior and Systematics | field Mathematics → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12425 | Industrial Gas Emission Control | 2210 Mechanical Engineering | 2305 Environmental Engineering | field Engineering → Environmental Science |
| T12427 | Metal Alloys Wear and Properties | 2505 Materials Chemistry | 2506 Metals and Alloys | same |
| T12429 | Chemotherapy-induced organ toxicity mitigation | 2734 Pathology and Forensic Medicine | 3005 Toxicology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T12435 | Bladed Disk Vibration Dynamics | 2205 Civil and Structural Engineering | 2210 Mechanical Engineering | same |
| T12438 | Urticaria and Related Conditions | 2745 Rheumatology | 2708 Dermatology | same |
| T12447 | Spider Taxonomy and Behavior Studies | 1311 Genetics | 1105 Ecology, Evolution, Behavior and Systematics | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T12462 | Elder Abuse and Neglect | 3317 Demography | 2717 Geriatrics and Gerontology | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T12464 | Neurological Complications and Syndromes | 2738 Psychiatry and Mental health | 2728 Clinical Neurology | same |
| T12466 | Near-Field Optical Microscopy | 2204 Biomedical Engineering | 3107 Atomic and Molecular Physics, and Optics | field Engineering → Physics and Astronomy |
| T12469 | Chaos, Complexity, and Education | 1703 Computational Theory and Mathematics | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12470 | Caribbean and African Literature and Culture | 1212 Religious studies | 1208 Literature and Literary Theory | same |
| T12473 | Pacific and Southeast Asian Studies | 3305 Geography, Planning and Development | 3314 Anthropology | same |
| T12484 | Retinopathy of Prematurity Studies | 2741 Radiology, Nuclear Medicine and Imaging | 2731 Ophthalmology | same |
| T12493 | Memory, violence, and history | 3207 Social Psychology | 1202 History | field Psychology → Arts and Humanities |
| T12499 | Diphtheria, Corynebacterium, and Tetanus | 1310 Endocrinology | 2725 Infectious Diseases | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12505 | Peptidase Inhibition and Analysis | 2730 Oncology | 1303 Biochemistry | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T12507 | Utopian, Dystopian, and Speculative Fiction | 1211 Philosophy | 1208 Literature and Literary Theory | same |
| T12509 | Corporate Insolvency and Governance | 1402 Accounting | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T12512 | History of Colonial Brazil | 3314 Anthropology | 1202 History | field Social Sciences → Arts and Humanities |
| T12514 | Fashion and Cultural Textiles | 1209 Museology | 1213 Visual Arts and Performing Arts | same |
| T12519 | Cybercrime and Law Enforcement Studies | 1710 Information Systems | 3308 Law | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12522 | Mathematics Education and Pedagogy | 2604 Applied Mathematics | 3304 Education | field Mathematics → Social Sciences; domain Physical Sciences → Social Sciences |
| T12525 | Australian History and Society | 3312 Sociology and Political Science | 1202 History | field Social Sciences → Arts and Humanities |
| T12526 | Antimicrobial agents and applications | 1605 Organic Chemistry | 2402 Applied Microbiology and Biotechnology | field Chemistry → Immunology and Microbiology; domain Physical Sciences → Life Sciences |
| T12530 | Bioactive Natural Diterpenoids Research | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T12537 | Flow Measurement and Analysis | 2211 Mechanics of Materials | 3105 Instrumentation | field Engineering → Physics and Astronomy |
| T12538 | Eosinophilic Esophagitis | 2746 Surgery | 2715 Gastroenterology | same |
| T12542 | Second Language Learning and Teaching | 1208 Literature and Literary Theory | 3310 Linguistics and Language | field Arts and Humanities → Social Sciences |
| T12546 | Smart Parking Systems Research | 2215 Building and Construction | 3313 Transportation | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T12560 | Nuclear Engineering Thermal-Hydraulics | 2202 Aerospace Engineering | 2104 Nuclear Energy and Engineering | field Engineering → Energy |
| T12563 | History and Politics in Latin America | 3317 Demography | 1202 History | field Social Sciences → Arts and Humanities |
| T12564 | Sensor Technology and Measurement Systems | 1705 Computer Networks and Communications | 3105 Instrumentation | field Computer Science → Physics and Astronomy |
| T12565 | Physics and Engineering Research Articles | 2206 Computational Mechanics | 2200 General Engineering | same |
| T12566 | Nitrogen and Sulfur Effects on Brassica | 1312 Molecular Biology | 1102 Agronomy and Crop Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T12569 | Restless Legs Syndrome Research | 2713 Epidemiology | 2728 Clinical Neurology | same |
| T12573 | Education and Digital Technologies | 3312 Sociology and Political Science | 3304 Education | same |
| T12578 | Diagnosis and treatment of tuberculosis | 2746 Surgery | 2725 Infectious Diseases | same |
| T12579 | Muon and positron interactions and applications | 2211 Mechanics of Materials | 3104 Condensed Matter Physics | field Engineering → Physics and Astronomy |
| T12587 | Gestational Trophoblastic Disease Studies | 2739 Public Health, Environmental and Occupational Health | 2729 Obstetrics and Gynecology | same |
| T12595 | Romani and Gypsy Studies | 3600 General Health Professions | 3312 Sociology and Political Science | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T12602 | Medical Education and Admissions | 2739 Public Health, Environmental and Occupational Health | 3304 Education | field Medicine → Social Sciences; domain Health Sciences → Social Sciences |
| T12603 | NMR spectroscopy and applications | 3106 Nuclear and High Energy Physics | 1607 Spectroscopy | field Physics and Astronomy → Chemistry |
| T12604 | Glycogen Storage Diseases and Myoclonus | 2745 Rheumatology | 1303 Biochemistry | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T12614 | Indigenous Studies and Ecology | 3600 General Health Professions | 3314 Anthropology | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T12623 | Cultural, Media, and Literary Studies | 1211 Philosophy | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T12625 | Sympathectomy and Hyperhidrosis Treatments | 2737 Physiology (medical) | 2708 Dermatology | same |
| T12626 | Cancer, Stress, Anesthesia, and Immune Response | 2738 Psychiatry and Mental health | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T12629 | Island Studies and Pacific Affairs | 3317 Demography | 3305 Geography, Planning and Development | same |
| T12633 | Legal case studies and regulations | 3320 Political Science and International Relations | 3308 Law | same |
| T12634 | Ureteral procedures and complications | 2729 Obstetrics and Gynecology | 2748 Urology | same |
| T12637 | Scarabaeidae Beetle Taxonomy and Biogeography | 1911 Paleontology | 1109 Insect Science | field Earth and Planetary Sciences → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12642 | Polymer-Based Agricultural Enhancements | 2204 Biomedical Engineering | 1102 Agronomy and Crop Science | field Engineering → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12648 | Academic Writing and Publishing | 1207 History and Philosophy of Science | 3309 Library and Information Sciences | field Arts and Humanities → Social Sciences |
| T12651 | Halal products and consumer behavior | 3312 Sociology and Political Science | 1406 Marketing | field Social Sciences → Business, Management and Accounting |
| T12668 | Yeasts and Rust Fungi Studies | 1312 Molecular Biology | 2404 Microbiology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T12669 | Comparative International Legal Studies | 3320 Political Science and International Relations | 3308 Law | same |
| T12671 | Management and Marketing Education | 1405 Management of Technology and Innovation | 3304 Education | field Business, Management and Accounting → Social Sciences |
| T12681 | Global Healthcare and Medical Tourism | 3600 General Health Professions | 1409 Tourism, Leisure and Hospitality Management | field Health Professions → Business, Management and Accounting; domain Health Sciences → Social Sciences |
| T12682 | Smart Materials for Construction | 2310 Pollution | 2205 Civil and Structural Engineering | field Environmental Science → Engineering |
| T12685 | Phytochemical compounds biological activities | 1312 Molecular Biology | 3002 Drug Discovery | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T12689 | Silymarin and Mushroom Poisoning | 2740 Pulmonary and Respiratory Medicine | 2721 Hepatology | same |
| T12702 | Brain Tumor Detection and Classification | 2808 Neurology | 1707 Computer Vision and Pattern Recognition | field Neuroscience → Computer Science; domain Life Sciences → Physical Sciences |
| T12706 | Subcritical and Supercritical Water Processes | 2204 Biomedical Engineering | 1508 Process Chemistry and Technology | field Engineering → Chemical Engineering |
| T12707 | Vehicle License Plate Recognition | 2214 Media Technology | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T12709 | Optimization and Mathematical Programming | 2207 Control and Systems Engineering | 1803 Management Science and Operations Research | field Engineering → Decision Sciences; domain Physical Sciences → Social Sciences |
| T12710 | Engineering and Agricultural Innovations | 1104 Aquatic Science | 2312 Water Science and Technology | field Agricultural and Biological Sciences → Environmental Science; domain Life Sciences → Physical Sciences |
| T12712 | Myofascial pain diagnosis and treatment | 1307 Cell Biology | 3612 Physical Therapy, Sports Therapy and Rehabilitation | field Biochemistry, Genetics and Molecular Biology → Health Professions; domain Life Sciences → Health Sciences |
| T12715 | Pregnancy-related medical research | 2739 Public Health, Environmental and Occupational Health | 2729 Obstetrics and Gynecology | same |
| T12717 | Space exploration and regulation | 3103 Astronomy and Astrophysics | 3320 Political Science and International Relations | field Physics and Astronomy → Social Sciences; domain Physical Sciences → Social Sciences |
| T12720 | Multimedia Communication and Technology | 3312 Sociology and Political Science | 2214 Media Technology | field Social Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T12729 | Tree Root and Stability Studies | 2210 Mechanical Engineering | 1107 Forestry | field Engineering → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12732 | Agriculture and Farm Safety | 1110 Plant Science | 2739 Public Health, Environmental and Occupational Health | field Agricultural and Biological Sciences → Medicine; domain Life Sciences → Health Sciences |
| T12733 | Vector-Borne Animal Diseases | 1105 Ecology, Evolution, Behavior and Systematics | 2406 Virology | field Agricultural and Biological Sciences → Immunology and Microbiology |
| T12735 | Blood donation and transfusion practices | 1405 Management of Technology and Innovation | 2720 Hematology | field Business, Management and Accounting → Medicine; domain Social Sciences → Health Sciences |
| T12741 | Maternal and Neonatal Healthcare | 3600 General Health Professions | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T12743 | Spanish Culture and Identity | 1211 Philosophy | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T12747 | Moyamoya disease diagnosis and treatment | 2745 Rheumatology | 2728 Clinical Neurology | same |
| T12749 | Race, Genetics, and Society | 1311 Genetics | 3314 Anthropology | field Biochemistry, Genetics and Molecular Biology → Social Sciences; domain Life Sciences → Social Sciences |
| T12756 | Plant Toxicity and Pharmacological Properties | 1312 Molecular Biology | 3005 Toxicology | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T12757 | Diverse Academia and Research Topics | 3205 Experimental and Cognitive Psychology | 3320 Political Science and International Relations | field Psychology → Social Sciences |
| T12758 | Saffron Plant Research Studies | 2730 Oncology | 3004 Pharmacology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T12766 | Interdisciplinary Research and Collaboration | 1802 Information Systems and Management | 1207 History and Philosophy of Science | field Decision Sciences → Arts and Humanities |
| T12767 | Conflict of Laws and Jurisdiction | 3320 Political Science and International Relations | 3308 Law | same |
| T12774 | Bauxite Residue and Utilization | 2210 Mechanical Engineering | 2311 Waste Management and Disposal | field Engineering → Environmental Science |
| T12781 | Global Health Care Issues | 3600 General Health Professions | 2002 Economics and Econometrics | field Health Professions → Economics, Econometrics and Finance; domain Health Sciences → Social Sciences |
| T12790 | Nursing Diagnosis and Documentation | 2910 Issues, ethics and legal aspects | 2922 Research and Theory | same |
| T12794 | Adaptive Dynamic Programming Control | 1703 Computational Theory and Mathematics | 2207 Control and Systems Engineering | field Computer Science → Engineering |
| T12802 | Competency Development and Evaluation | 3207 Social Psychology | 1407 Organizational Behavior and Human Resource Management | field Psychology → Business, Management and Accounting |
| T12804 | Thermal Analysis in Power Transmission | 2207 Control and Systems Engineering | 2208 Electrical and Electronic Engineering | same |
| T12809 | Contact Mechanics and Variational Inequalities | 1703 Computational Theory and Mathematics | 2206 Computational Mechanics | field Computer Science → Engineering |
| T12816 | Global Public Health Policies and Epidemiology | 1407 Organizational Behavior and Human Resource Management | 2739 Public Health, Environmental and Occupational Health | field Business, Management and Accounting → Medicine; domain Social Sciences → Health Sciences |
| T12822 | Turfgrass Adaptation and Management | 2304 Environmental Chemistry | 1102 Agronomy and Crop Science | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12823 | Adolescent and Pediatric Healthcare | 3616 Speech and Hearing | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T12824 | Infections and bacterial resistance | 1310 Endocrinology | 2726 Microbiology (medical) | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12829 | Advanced Breast Cancer Therapies | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T12831 | School Health and Nursing Education | 3616 Speech and Hearing | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12833 | Bartonella species infections research | 2405 Parasitology | 2725 Infectious Diseases | field Immunology and Microbiology → Medicine; domain Life Sciences → Health Sciences |
| T12837 | American Environmental and Regional History | 2308 Management, Monitoring, Policy and Law | 1202 History | field Environmental Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T12838 | Photovoltaic Systems and Sustainability | 2305 Environmental Engineering | 2105 Renewable Energy, Sustainability and the Environment | field Environmental Science → Energy |
| T12842 | Youth, Drugs, and Violence | 3317 Demography | 2739 Public Health, Environmental and Occupational Health | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T12845 | Methemoglobinemia and Tumor Lysis Syndrome | 2740 Pulmonary and Respiratory Medicine | 2720 Hematology | same |
| T12850 | Field-Flow Fractionation Techniques | 2206 Computational Mechanics | 1602 Analytical Chemistry | field Engineering → Chemistry |
| T12860 | Family and Patient Care in Intensive Care Units | 3614 Radiological and Ultrasound Technology | 2706 Critical Care and Intensive Care Medicine | field Health Professions → Medicine |
| T12862 | Catholicism and Religious Studies | 1202 History | 1212 Religious studies | same |
| T12863 | Web and Library Services | 1710 Information Systems | 3309 Library and Information Sciences | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T12866 | Urologic and reproductive health conditions | 2745 Rheumatology | 2748 Urology | same |
| T12869 | Occupational Health and Burnout | 3609 Occupational Therapy | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12870 | Seedling growth and survival studies | 2309 Nature and Landscape Conservation | 1107 Forestry | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12871 | Healthcare Quality and Management | 3605 Health Information Management | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T12876 | Potassium and Related Disorders | 2740 Pulmonary and Respiratory Medicine | 2727 Nephrology | same |
| T12890 | Eurasian Exchange Networks | 3314 Anthropology | 1202 History | field Social Sciences → Arts and Humanities |
| T12896 | Sustainable Agricultural Systems Analysis | 2304 Environmental Chemistry | 1102 Agronomy and Crop Science | field Environmental Science → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T12898 | Induction Heating and Inverter Technology | 2210 Mechanical Engineering | 2208 Electrical and Electronic Engineering | same |
| T12918 | Healthcare Systems and Technology | 1407 Organizational Behavior and Human Resource Management | 2739 Public Health, Environmental and Occupational Health | field Business, Management and Accounting → Medicine; domain Social Sciences → Health Sciences |
| T12919 | Blood disorders and treatments | 1311 Genetics | 2720 Hematology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12926 | Business Strategies and Management Research | 1803 Management Science and Operations Research | 1408 Strategy and Management | field Decision Sciences → Business, Management and Accounting |
| T12927 | Memory, History, Trauma, Identity | 1211 Philosophy | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T12930 | Biomedical and Chemical Research | 2746 Surgery | 2737 Physiology (medical) | same |
| T12938 | Material Selection and Properties | 2505 Materials Chemistry | 2500 General Materials Science | same |
| T12939 | Polish Law and Legal System | 3320 Political Science and International Relations | 3308 Law | same |
| T12944 | Animal Nutrition and Health | 1110 Plant Science | 1103 Animal Science and Zoology | same |
| T12948 | Inclusion and Disability in Education and Sport | 3312 Sociology and Political Science | 3304 Education | same |
| T12949 | South Asian Studies and Diaspora | 1211 Philosophy | 1202 History | same |
| T12962 | Nephrotoxicity and Medicinal Plants | 2741 Radiology, Nuclear Medicine and Imaging | 2727 Nephrology | same |
| T12966 | Russian Literature and Bakhtin Studies | 3304 Education | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T12971 | Material Properties and Processing | 2211 Mechanics of Materials | 2209 Industrial and Manufacturing Engineering | same |
| T12972 | German Colonialism and Identity Studies | 1208 Literature and Literary Theory | 1202 History | same |
| T12976 | Magnetic and Electromagnetic Effects | 1314 Physiology | 1102 Agronomy and Crop Science | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T12983 | Satellite Image Processing and Photogrammetry | 2212 Ocean Engineering | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T12985 | Maritime Security and History | 3313 Transportation | 3320 Political Science and International Relations | same |
| T12986 | Administrative Law and Governance | 3320 Political Science and International Relations | 3308 Law | same |
| T12989 | Ocular Disorders and Treatments | 1311 Genetics | 2731 Ophthalmology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T12997 | Outdoor and Experiential Education | 3207 Social Psychology | 3304 Education | field Psychology → Social Sciences |
| T13005 | Religious Studies and Spiritual Practices | 1211 Philosophy | 1212 Religious studies | same |
| T13016 | Cloud Platforms and Innovative Educational Technologies | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13021 | Geology and Environmental Impact Studies | 3308 Law | 2305 Environmental Engineering | field Social Sciences → Environmental Science; domain Social Sciences → Physical Sciences |
| T13022 | Health and Medical Studies | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13023 | Synthesis of Organic Compounds | 2736 Pharmacology (medical) | 1605 Organic Chemistry | field Medicine → Chemistry; domain Health Sciences → Physical Sciences |
| T13044 | Biofield Effects and Biophysics | 2737 Physiology (medical) | 2707 Complementary and alternative medicine | same |
| T13045 | Industrial Engineering and Technologies | 2210 Mechanical Engineering | 2105 Renewable Energy, Sustainability and the Environment | field Engineering → Energy |
| T13046 | Electrokinetic Soil Remediation Techniques | 2208 Electrical and Electronic Engineering | 2305 Environmental Engineering | field Engineering → Environmental Science |
| T13047 | Pharmacological Receptor Mechanisms and Effects | 1312 Molecular Biology | 3004 Pharmacology | field Biochemistry, Genetics and Molecular Biology → Pharmacology, Toxicology and Pharmaceutics |
| T13048 | Patient Dignity and Privacy | 2739 Public Health, Environmental and Occupational Health | 2910 Issues, ethics and legal aspects | field Medicine → Nursing |
| T13049 | Surface Roughness and Optical Measurements | 2206 Computational Mechanics | 3105 Instrumentation | field Engineering → Physics and Astronomy |
| T13050 | Oil and Gas Production Techniques | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T13053 | SMEs Development and Digital Marketing | 3317 Demography | 1403 Business and International Management | field Social Sciences → Business, Management and Accounting |
| T13054 | Agricultural and Financial Auditing | 1100 General Agricultural and Biological Sciences | 1402 Accounting | field Agricultural and Biological Sciences → Business, Management and Accounting; domain Life Sciences → Social Sciences |
| T13059 | Religion, Ecology, and Ethics | 3312 Sociology and Political Science | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T13060 | Adventure Sports and Sensation Seeking | 3207 Social Psychology | 1409 Tourism, Leisure and Hospitality Management | field Psychology → Business, Management and Accounting |
| T13065 | Mining Techniques and Economics | 2207 Control and Systems Engineering | 2209 Industrial and Manufacturing Engineering | same |
| T13067 | Geological Modeling and Analysis | 1906 Geochemistry and Petrology | 1907 Geology | same |
| T13070 | Cultural Identity and Heritage | 1204 Archeology (arts and humanities) | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T13071 | Digital Storytelling and Education | 3616 Speech and Hearing | 3304 Education | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T13075 | Legal Systems and Judicial Processes | 3320 Political Science and International Relations | 3308 Law | same |
| T13077 | Cancer-related cognitive impairment studies | 2740 Pulmonary and Respiratory Medicine | 2730 Oncology | same |
| T13080 | Advanced Differential Geometry Research | 3103 Astronomy and Astrophysics | 2608 Geometry and Topology | field Physics and Astronomy → Mathematics |
| T13081 | Digital Education and Society | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13094 | Mining and Gasification Technologies | 2210 Mechanical Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T13097 | Male Breast Health Studies | 2739 Public Health, Environmental and Occupational Health | 2730 Oncology | same |
| T13098 | Conferences and Exhibitions Management | 3312 Sociology and Political Science | 1409 Tourism, Leisure and Hospitality Management | field Social Sciences → Business, Management and Accounting |
| T13100 | Comparative Animal Anatomy Studies | 2748 Urology | 2702 Anatomy | same |
| T13111 | Nursing care and research | 3611 Pharmacy | 2922 Research and Theory | field Health Professions → Nursing |
| T13117 | Health Education and Validation | 3304 Education | 2922 Research and Theory | field Social Sciences → Nursing; domain Social Sciences → Health Sciences |
| T13121 | Radio Wave Propagation Studies | 2202 Aerospace Engineering | 1902 Atmospheric Science | field Engineering → Earth and Planetary Sciences |
| T13126 | Scientific Research and Discoveries | 3109 Statistical and Nonlinear Physics | 3107 Atomic and Molecular Physics, and Optics | same |
| T13136 | Community-based Tourism Development and Sustainability | 3312 Sociology and Political Science | 1409 Tourism, Leisure and Hospitality Management | field Social Sciences → Business, Management and Accounting |
| T13140 | Materials Engineering and Processing | 2210 Mechanical Engineering | 2215 Building and Construction | same |
| T13155 | Digital Communication and Language | 1709 Human-Computer Interaction | 3310 Linguistics and Language | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13166 | Information Science, Archives and Information Policy | 1710 Information Systems | 3309 Library and Information Sciences | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13167 | Historical, Literary, and Cultural Studies | 1205 Classics | 1208 Literature and Literary Theory | same |
| T13176 | Winter Sports Injuries and Performance | 2740 Pulmonary and Respiratory Medicine | 2732 Orthopedics and Sports Medicine | same |
| T13188 | Synthesis and bioactivity of alkaloids | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T13190 | Engineering and Environmental Studies | 2212 Ocean Engineering | 2103 Fuel Technology | field Engineering → Energy |
| T13191 | Dispute Resolution and Class Actions | 1408 Strategy and Management | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T13192 | Forensic Fingerprint Detection Methods | 3311 Safety Research | 2734 Pathology and Forensic Medicine | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T13195 | Medieval Iberian Studies | 1205 Classics | 1208 Literature and Literary Theory | same |
| T13198 | Historical, Religious, and Philosophical Studies | 1204 Archeology (arts and humanities) | 1212 Religious studies | same |
| T13199 | Digestive system and related health | 1311 Genetics | 2715 Gastroenterology | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T13206 | Neonatal skin health care | 3616 Speech and Hearing | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T13209 | Cold Fusion and Nuclear Reactions | 1906 Geochemistry and Petrology | 3106 Nuclear and High Energy Physics | field Earth and Planetary Sciences → Physics and Astronomy |
| T13211 | Memory, Trauma, and Testimony | 3205 Experimental and Cognitive Psychology | 1208 Literature and Literary Theory | field Psychology → Arts and Humanities |
| T13215 | Global Maritime and Colonial Histories | 3314 Anthropology | 1202 History | field Social Sciences → Arts and Humanities |
| T13220 | Plant and Fungal Interactions Research | 1310 Endocrinology | 2406 Virology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T13221 | Biological Activity of Diterpenoids and Biflavonoids | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T13225 | Polish-Jewish Holocaust Memory Studies | 1211 Philosophy | 1202 History | same |
| T13232 | Laser-Ablation Synthesis of Nanoparticles | 2204 Biomedical Engineering | 2505 Materials Chemistry | field Engineering → Materials Science |
| T13242 | Male Reproductive Health Studies | 3600 General Health Professions | 2748 Urology | field Health Professions → Medicine |
| T13255 | Business, Innovation, and Economy | 2002 Economics and Econometrics | 1406 Marketing | field Economics, Econometrics and Finance → Business, Management and Accounting |
| T13267 | Advanced Theoretical and Applied Studies in Material Sciences and Geometry | 2204 Biomedical Engineering | 1704 Computer Graphics and Computer-Aided Design | field Engineering → Computer Science |
| T13271 | Ukrainian Legal and Forensic Studies | 3320 Political Science and International Relations | 3308 Law | same |
| T13275 | Medical and Health Sciences Research | 2739 Public Health, Environmental and Occupational Health | 3308 Law | field Medicine → Social Sciences; domain Health Sciences → Social Sciences |
| T13277 | Media, Religion, Digital Communication | 1211 Philosophy | 1212 Religious studies | same |
| T13279 | Safe Handling of Antineoplastic Drugs | 3609 Occupational Therapy | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13282 | Automated Road and Building Extraction | 2212 Ocean Engineering | 1707 Computer Vision and Pattern Recognition | field Engineering → Computer Science |
| T13286 | Modeling and Simulation Systems | 1703 Computational Theory and Mathematics | 2611 Modeling and Simulation | field Computer Science → Mathematics |
| T13287 | Robotic Process Automation Applications | 2209 Industrial and Manufacturing Engineering | 1404 Management Information Systems | field Engineering → Business, Management and Accounting; domain Physical Sciences → Social Sciences |
| T13288 | Banking, Crisis Management, COVID-19 Impact | 1100 General Agricultural and Biological Sciences | 1408 Strategy and Management | field Agricultural and Biological Sciences → Business, Management and Accounting; domain Life Sciences → Social Sciences |
| T13289 | Infant Health and Development | 3611 Pharmacy | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T13297 | History and advancements in chemistry | 1606 Physical and Theoretical Chemistry | 1207 History and Philosophy of Science | field Chemistry → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T13298 | Solar Energy Systems and Technologies | 2210 Mechanical Engineering | 2215 Building and Construction | same |
| T13301 | Cultural Studies and Interdisciplinary Research | 1211 Philosophy | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T13306 | Geography and Education Methods | 3312 Sociology and Political Science | 3305 Geography, Planning and Development | same |
| T13307 | Diverse Scientific and Engineering Research | 2206 Computational Mechanics | 2200 General Engineering | same |
| T13314 | Lymphadenopathy Diagnosis and Analysis | 2746 Surgery | 2734 Pathology and Forensic Medicine | same |
| T13315 | Occupational Health and Safety in Workplaces | 3609 Occupational Therapy | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13318 | Diverse Scientific Research in Ukraine | 2306 Global and Planetary Change | 3305 Geography, Planning and Development | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13319 | Film in Education and Therapy | 3605 Health Information Management | 3304 Education | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T13320 | Ukrainian Cultural and Linguistic Studies | 3312 Sociology and Political Science | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T13339 | Landscape and Cultural Studies | 1204 Archeology (arts and humanities) | 2216 Architecture | field Arts and Humanities → Engineering; domain Social Sciences → Physical Sciences |
| T13350 | Myxozoan Parasites in Aquatic Species | 1306 Cancer Research | 2405 Parasitology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T13351 | Critical Theory and Political Philosophy | 3304 Education | 1211 Philosophy | field Social Sciences → Arts and Humanities |
| T13358 | Livestock Management and Performance Improvement | 1102 Agronomy and Crop Science | 3303 Development | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T13359 | Sports Science and Education | 1207 History and Philosophy of Science | 3304 Education | field Arts and Humanities → Social Sciences |
| T13361 | Coconut Research and Applications | 1604 Inorganic Chemistry | 1106 Food Science | field Chemistry → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T13362 | Slime Mold and Myxomycetes Research | 2204 Biomedical Engineering | 1105 Ecology, Evolution, Behavior and Systematics | field Engineering → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T13367 | Cultural and Sociopolitical Studies | 1209 Museology | 3314 Anthropology | field Arts and Humanities → Social Sciences |
| T13374 | Hematological disorders and diagnostics | 2711 Emergency Medicine | 2720 Hematology | same |
| T13376 | Criminal Law and Policy | 3312 Sociology and Political Science | 3308 Law | same |
| T13378 | Agricultural Economy and Food Security in Russia | 1102 Agronomy and Crop Science | 2002 Economics and Econometrics | field Agricultural and Biological Sciences → Economics, Econometrics and Finance; domain Life Sciences → Social Sciences |
| T13380 | Sound Studies and Aurality | 3205 Experimental and Cognitive Psychology | 3316 Cultural Studies | field Psychology → Social Sciences |
| T13385 | Infectious Diseases and Mycology | 3404 Small Animals | 2725 Infectious Diseases | field Veterinary → Medicine |
| T13386 | Educational Methods and Teacher Development | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13398 | Data Analysis with R | 1702 Artificial Intelligence | 2613 Statistics and Probability | field Computer Science → Mathematics |
| T13405 | Educational Assessment and Improvement | 1802 Information Systems and Management | 3304 Education | field Decision Sciences → Social Sciences |
| T13406 | Human Resources and Workforce | 3311 Safety Research | 3305 Geography, Planning and Development | same |
| T13408 | Corporate Law and Human Rights | 1407 Organizational Behavior and Human Resource Management | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T13417 | Biomedical Ethics and Regulation | 2737 Physiology (medical) | 2910 Issues, ethics and legal aspects | field Medicine → Nursing |
| T13418 | Photocathodes and Microchannel Plates | 2204 Biomedical Engineering | 3105 Instrumentation | field Engineering → Physics and Astronomy |
| T13419 | Ego Development and Educational Practices | 3203 Clinical Psychology | 3204 Developmental and Educational Psychology | same |
| T13423 | Social Policies and Healthcare Reform | 3600 General Health Professions | 3306 Health | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T13424 | Ukraine: War, Education, Health | 2306 Global and Planetary Change | 3304 Education | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13435 | Animal and Plant Science Education | 3207 Social Psychology | 3304 Education | field Psychology → Social Sciences |
| T13439 | Transport and Economic Policies | 1408 Strategy and Management | 3313 Transportation | field Business, Management and Accounting → Social Sciences |
| T13440 | Electromagnetic Effects on Materials | 2208 Electrical and Electronic Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T13442 | Geochemistry and Geochronology of Asian Mineral Deposits | 2002 Economics and Econometrics | 1906 Geochemistry and Petrology | field Economics, Econometrics and Finance → Earth and Planetary Sciences; domain Social Sciences → Physical Sciences |
| T13452 | GDF15 and Related Biomarkers | 2745 Rheumatology | 2705 Cardiology and Cardiovascular Medicine | same |
| T13454 | Phenothiazines and Benzothiazines Synthesis and Activities | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T13460 | Historical Studies in Latin America | 3317 Demography | 1202 History | field Social Sciences → Arts and Humanities |
| T13475 | Digital Transformation in Law | 2000 General Economics, Econometrics and Finance | 3308 Law | field Economics, Econometrics and Finance → Social Sciences |
| T13501 | Legal Issues in Turkey | 3320 Political Science and International Relations | 3308 Law | same |
| T13502 | Community and Sustainable Development | 3304 Education | 3303 Development | same |
| T13507 | Literature, Politics, and Exile Studies | 2306 Global and Planetary Change | 1208 Literature and Literary Theory | field Environmental Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T13515 | Cultural and Communication Design Research | 1209 Museology | 1213 Visual Arts and Performing Arts | same |
| T13516 | Publishing and Scholarly Communication | 1207 History and Philosophy of Science | 3309 Library and Information Sciences | field Arts and Humanities → Social Sciences |
| T13520 | Architectural and Urban Studies | 1206 Conservation | 2216 Architecture | field Arts and Humanities → Engineering; domain Social Sciences → Physical Sciences |
| T13521 | Psychosocial Factors Impacting Youth | 3312 Sociology and Political Science | 3204 Developmental and Educational Psychology | field Social Sciences → Psychology |
| T13529 | School Management and Early Childhood Education | 1405 Management of Technology and Innovation | 3304 Education | field Business, Management and Accounting → Social Sciences |
| T13531 | Surface and Thin Film Phenomena | 3107 Atomic and Molecular Physics, and Optics | 3104 Condensed Matter Physics | same |
| T13533 | Medical Case Reports and Studies | 2746 Surgery | 2724 Internal Medicine | same |
| T13543 | Oropharyngeal Anatomy and Pathologies | 2745 Rheumatology | 2733 Otorhinolaryngology | same |
| T13552 | Advanced Materials Characterization Techniques | 2204 Biomedical Engineering | 2500 General Materials Science | field Engineering → Materials Science |
| T13557 | Environmental and sustainability education | 2308 Management, Monitoring, Policy and Law | 3304 Education | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13565 | Education and Learning Interventions | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13566 | Global Educational Reforms and Inequalities | 3317 Demography | 3304 Education | same |
| T13568 | Wood and Agarwood Research | 1605 Organic Chemistry | 1107 Forestry | field Chemistry → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T13569 | Microscopic Colitis | 2713 Epidemiology | 2715 Gastroenterology | same |
| T13574 | Family Support in Illness | 3312 Sociology and Political Science | 3203 Clinical Psychology | field Social Sciences → Psychology |
| T13578 | Stonefly species taxonomy and ecology | 2212 Ocean Engineering | 1109 Insect Science | field Engineering → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T13586 | HIV, TB, and STIs Epidemiology | 3300 General Social Sciences | 2739 Public Health, Environmental and Occupational Health | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T13587 | Q Methodology Applications | 1803 Management Science and Operations Research | 3300 General Social Sciences | field Decision Sciences → Social Sciences |
| T13591 | Pasture and Agricultural Systems | 1107 Forestry | 1102 Agronomy and Crop Science | same |
| T13594 | Healthcare innovation and challenges | 3304 Education | 3306 Health | same |
| T13595 | Archaeology and Cultural Heritage | 3316 Cultural Studies | 1204 Archeology (arts and humanities) | field Social Sciences → Arts and Humanities |
| T13602 | Educational Methods and Media Use | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13604 | Adsorption, diffusion, and thermodynamic properties of materials | 1607 Spectroscopy | 1606 Physical and Theoretical Chemistry | same |
| T13607 | Academic Publishing and Open Access | 1802 Information Systems and Management | 3309 Library and Information Sciences | field Decision Sciences → Social Sciences |
| T13608 | Advanced Computational Techniques in Science and Engineering | 1710 Information Systems | 2204 Biomedical Engineering | field Computer Science → Engineering |
| T13609 | Economic, Social, and Public Health Issues in Russia and Globally | 1803 Management Science and Operations Research | 3321 Public Administration | field Decision Sciences → Social Sciences |
| T13611 | Education, Management, Technology, Human Resources | 1802 Information Systems and Management | 1407 Organizational Behavior and Human Resource Management | field Decision Sciences → Business, Management and Accounting |
| T13615 | Transportation Systems and Safety | 1704 Computer Graphics and Computer-Aided Design | 2207 Control and Systems Engineering | field Computer Science → Engineering |
| T13622 | Historical and Environmental Studies | 3312 Sociology and Political Science | 1202 History | field Social Sciences → Arts and Humanities |
| T13623 | Linguistic Studies and Language Acquisition | 1702 Artificial Intelligence | 3310 Linguistics and Language | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13629 | Text Readability and Simplification | 1702 Artificial Intelligence | 3310 Linguistics and Language | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13630 | Agriculture Market Analysis Ukraine | 1100 General Agricultural and Biological Sciences | 2002 Economics and Econometrics | field Agricultural and Biological Sciences → Economics, Econometrics and Finance; domain Life Sciences → Social Sciences |
| T13638 | Human auditory perception and evaluation | 2202 Aerospace Engineering | 3102 Acoustics and Ultrasonics | field Engineering → Physics and Astronomy |
| T13639 | Paraquat toxicity studies and treatments | 2746 Surgery | 3005 Toxicology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T13643 | Artificial Intelligence in Law | 3320 Political Science and International Relations | 3308 Law | same |
| T13645 | Thermodynamic and Structural Properties of Metals and Alloys | 2210 Mechanical Engineering | 2506 Metals and Alloys | field Engineering → Materials Science |
| T13646 | Qur’anic Interpretation Studies | 3304 Education | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T13650 | Computational Physics and Python Applications | 1702 Artificial Intelligence | 1712 Software | same |
| T13651 | Medicinal Plants and Bioactive Compounds | 1312 Molecular Biology | 2707 Complementary and alternative medicine | field Biochemistry, Genetics and Molecular Biology → Medicine; domain Life Sciences → Health Sciences |
| T13656 | Science, Research, and Medicine | 2743 Reproductive Medicine | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T13657 | Aortic Thrombus and Embolism | 2740 Pulmonary and Respiratory Medicine | 2705 Cardiology and Cardiovascular Medicine | same |
| T13659 | Ombudsman and Human Rights | 3312 Sociology and Political Science | 3308 Law | same |
| T13673 | Library Services and Librarianship | 1710 Information Systems | 3309 Library and Information Sciences | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13675 | Diffusion Coefficients in Liquids | 1607 Spectroscopy | 1606 Physical and Theoretical Chemistry | same |
| T13677 | Magnolia and Illicium research | 2742 Rehabilitation | 3004 Pharmacology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T13682 | Engineering Education and Pedagogy | 2216 Architecture | 3304 Education | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T13694 | Immigration Law and Human Rights | 3322 Urban Studies | 3308 Law | same |
| T13695 | Aging, Elder Care, and Social Issues | 3600 General Health Professions | 3319 Life-span and Life-course Studies | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T13696 | Technology's Impact on Media | 1802 Information Systems and Management | 3315 Communication | field Decision Sciences → Social Sciences |
| T13697 | Biliary and Gastrointestinal Fistulas | 2740 Pulmonary and Respiratory Medicine | 2715 Gastroenterology | same |
| T13701 | Psycholinguistics and Behavioral Studies | 3304 Education | 3202 Applied Psychology | field Social Sciences → Psychology |
| T13703 | Attention Economy in Education and Business | 1408 Strategy and Management | 3304 Education | field Business, Management and Accounting → Social Sciences |
| T13707 | Literature, Language, and Rhetoric Studies | 3312 Sociology and Political Science | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T13722 | Ergonomics and Human Factors | 2204 Biomedical Engineering | 3307 Human Factors and Ergonomics | field Engineering → Social Sciences; domain Physical Sciences → Social Sciences |
| T13729 | Korean Urban and Social Studies | 2308 Management, Monitoring, Policy and Law | 3322 Urban Studies | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13732 | Aerospace, Electronics, Mathematical Modeling | 2309 Nature and Landscape Conservation | 2202 Aerospace Engineering | field Environmental Science → Engineering |
| T13735 | History of Medical Practice | 2728 Clinical Neurology | 2746 Surgery | same |
| T13736 | Steroid Chemistry and Biochemistry | 1312 Molecular Biology | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T13739 | Medieval and Early Modern Justice | 3320 Political Science and International Relations | 1202 History | field Social Sciences → Arts and Humanities |
| T13745 | Media and Digital Communication | 1705 Computer Networks and Communications | 3315 Communication | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13746 | Mechanical Systems and Engineering | 2105 Renewable Energy, Sustainability and the Environment | 2210 Mechanical Engineering | field Energy → Engineering |
| T13757 | Graphic Design and Typography | 1207 History and Philosophy of Science | 1213 Visual Arts and Performing Arts | same |
| T13758 | Energy Law and Policy | 1802 Information Systems and Management | 3308 Law | field Decision Sciences → Social Sciences |
| T13761 | HIV/AIDS oral health manifestations | 2739 Public Health, Environmental and Occupational Health | 3500 General Dentistry | field Medicine → Dentistry |
| T13762 | Education and Labor Relations | 3320 Political Science and International Relations | 2002 Economics and Econometrics | field Social Sciences → Economics, Econometrics and Finance |
| T13767 | Leech Biology and Applications | 2736 Pharmacology (medical) | 1103 Animal Science and Zoology | field Medicine → Agricultural and Biological Sciences; domain Health Sciences → Life Sciences |
| T13768 | Oral and gingival health research | 3611 Pharmacy | 3506 Periodontics | field Health Professions → Dentistry |
| T13770 | Pediatric health and respiratory diseases | 3604 Emergency Medical Services | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T13775 | Hydrogen's biological and therapeutic effects | 2746 Surgery | 3004 Pharmacology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T13779 | Cancer Mechanisms and Therapy | 2734 Pathology and Forensic Medicine | 1306 Cancer Research | field Medicine → Biochemistry, Genetics and Molecular Biology; domain Health Sciences → Life Sciences |
| T13784 | Jewish Identity and Society | 3317 Demography | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T13786 | Diverse Academic Research Studies | 3316 Cultural Studies | 3300 General Social Sciences | same |
| T13787 | Globalization, Historical Perspectives, and International Relations | 3312 Sociology and Political Science | 1202 History | field Social Sciences → Arts and Humanities |
| T13788 | Cultural Identity and Representation | 1211 Philosophy | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T13790 | Waste Management and Environmental Impact | 2210 Mechanical Engineering | 2311 Waste Management and Disposal | field Engineering → Environmental Science |
| T13798 | Hops Chemistry and Applications | 3004 Pharmacology | 1106 Food Science | field Pharmacology, Toxicology and Pharmaceutics → Agricultural and Biological Sciences |
| T13800 | Earthquake and Disaster Impact Studies | 3313 Transportation | 3305 Geography, Planning and Development | same |
| T13805 | Adolescent Health and Behaviors | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13807 | Cultural Insights and Digital Impacts | 1705 Computer Networks and Communications | 1208 Literature and Literary Theory | field Computer Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T13809 | Philosophy, Health, and Society | 2736 Pharmacology (medical) | 2707 Complementary and alternative medicine | same |
| T13811 | Earth Systems and Cosmic Evolution | 1902 Atmospheric Science | 2306 Global and Planetary Change | field Earth and Planetary Sciences → Environmental Science |
| T13813 | Oral and Craniofacial Lesions | 3616 Speech and Hearing | 3504 Oral Surgery | field Health Professions → Dentistry |
| T13817 | Tannin, Tannase and Anticancer Activities | 2402 Applied Microbiology and Biotechnology | 1605 Organic Chemistry | field Immunology and Microbiology → Chemistry; domain Life Sciences → Physical Sciences |
| T13818 | Cultural Studies and Colonialism | 1212 Religious studies | 3316 Cultural Studies | field Arts and Humanities → Social Sciences |
| T13820 | SAS software applications and methods | 2204 Biomedical Engineering | 1712 Software | field Engineering → Computer Science |
| T13822 | Indigenous Health and Education | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13823 | Religious and Theological Studies | 3312 Sociology and Political Science | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T13828 | Natural Products and Biological Research | 2746 Surgery | 3004 Pharmacology | field Medicine → Pharmacology, Toxicology and Pharmaceutics; domain Health Sciences → Life Sciences |
| T13837 | Diverse Cultural and Social Studies | 1208 Literature and Literary Theory | 3315 Communication | field Arts and Humanities → Social Sciences |
| T13839 | Tourism, Volunteerism, and Development | 3317 Demography | 1409 Tourism, Leisure and Hospitality Management | field Social Sciences → Business, Management and Accounting |
| T13841 | Psychology of Social Influence | 3312 Sociology and Political Science | 3207 Social Psychology | field Social Sciences → Psychology |
| T13849 | Enterobacteriaceae and Cronobacter Research | 1310 Endocrinology | 2404 Microbiology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T13856 | Advanced Power Generation Technologies | 2208 Electrical and Electronic Engineering | 2102 Energy Engineering and Power Technology | field Engineering → Energy |
| T13857 | Mining and Industrial Processes | 1106 Food Science | 2210 Mechanical Engineering | field Agricultural and Biological Sciences → Engineering; domain Life Sciences → Physical Sciences |
| T13861 | Health and Lifestyle Studies | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T13865 | Nationalism and Cultural Identity | 3305 Geography, Planning and Development | 3312 Sociology and Political Science | same |
| T13866 | Occupational health in dentistry | 3607 Medical Laboratory Technology | 3500 General Dentistry | field Health Professions → Dentistry |
| T13867 | Economic Growth and Development | 1710 Information Systems | 2002 Economics and Econometrics | field Computer Science → Economics, Econometrics and Finance; domain Physical Sciences → Social Sciences |
| T13875 | Legal Studies and Reforms | 3320 Political Science and International Relations | 3308 Law | same |
| T13880 | Innovative Education Methods and Tools | 1804 Statistics, Probability and Uncertainty | 3304 Education | field Decision Sciences → Social Sciences |
| T13883 | Child and Adolescent Health | 3600 General Health Professions | 2735 Pediatrics, Perinatology and Child Health | field Health Professions → Medicine |
| T13885 | Geophysics and Sensor Technology | 2212 Ocean Engineering | 1908 Geophysics | field Engineering → Earth and Planetary Sciences |
| T13890 | Remote Sensing and Land Use | 1902 Atmospheric Science | 3305 Geography, Planning and Development | field Earth and Planetary Sciences → Social Sciences; domain Physical Sciences → Social Sciences |
| T13897 | Historical Economic and Legal Thought | 3320 Political Science and International Relations | 2002 Economics and Econometrics | field Social Sciences → Economics, Econometrics and Finance |
| T13899 | Agricultural Systems and Practices | 1105 Ecology, Evolution, Behavior and Systematics | 1102 Agronomy and Crop Science | same |
| T13906 | Social Issues and Policies | 3311 Safety Research | 3312 Sociology and Political Science | same |
| T13911 | Employment, Labor, and Gender Studies | 3311 Safety Research | 1410 Industrial relations | field Social Sciences → Business, Management and Accounting |
| T13920 | Urban Planning and Valuation | 2308 Management, Monitoring, Policy and Law | 3305 Geography, Planning and Development | field Environmental Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13921 | Biological Stains and Phytochemicals | 2736 Pharmacology (medical) | 2734 Pathology and Forensic Medicine | same |
| T13927 | Cyberloafing and Workplace Behavior | 3317 Demography | 1407 Organizational Behavior and Human Resource Management | field Social Sciences → Business, Management and Accounting |
| T13928 | Advanced Sensor Technologies Research | 2204 Biomedical Engineering | 3105 Instrumentation | field Engineering → Physics and Astronomy |
| T13932 | Education, Technology, and Economics | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T13933 | Whitehead's Philosophy and Applications | 2308 Management, Monitoring, Policy and Law | 1211 Philosophy | field Environmental Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T13934 | Indigenous Knowledge Systems and Agriculture | 1110 Plant Science | 3314 Anthropology | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T13953 | Digital Imaging in Medicine | 2739 Public Health, Environmental and Occupational Health | 2741 Radiology, Nuclear Medicine and Imaging | same |
| T13955 | Evaluation Methods in Various Fields | 2302 Ecological Modeling | 1803 Management Science and Operations Research | field Environmental Science → Decision Sciences; domain Physical Sciences → Social Sciences |
| T13956 | Sociopolitical Dynamics in Nepal | 3317 Demography | 3312 Sociology and Political Science | same |
| T13960 | Dietetics, Nutrition, and Education | 3605 Health Information Management | 2916 Nutrition and Dietetics | field Health Professions → Nursing |
| T13962 | Omental and Epiploic Conditions | 2745 Rheumatology | 2746 Surgery | same |
| T13966 | Neurological and metabolic disorders | 2712 Endocrinology, Diabetes and Metabolism | 2728 Clinical Neurology | same |
| T13969 | Flooding and Environmental Impact | 3312 Sociology and Political Science | 2200 General Engineering | field Social Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T13970 | Pharmacy and Medical Practices | 3004 Pharmacology | 3611 Pharmacy | field Pharmacology, Toxicology and Pharmaceutics → Health Professions; domain Life Sciences → Health Sciences |
| T13971 | Isoquinoline Alkaloid Synthesis | 1306 Cancer Research | 1605 Organic Chemistry | field Biochemistry, Genetics and Molecular Biology → Chemistry; domain Life Sciences → Physical Sciences |
| T13972 | Business Law and Ethics | 1402 Accounting | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T13973 | Catholicism, Bioethics, Media, Education | 3311 Safety Research | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T13980 | Alexander von Humboldt Studies | 2404 Microbiology | 1207 History and Philosophy of Science | field Immunology and Microbiology → Arts and Humanities; domain Life Sciences → Social Sciences |
| T13991 | Nuclear Receptors and Signaling | 2804 Cellular and Molecular Neuroscience | 1312 Molecular Biology | field Neuroscience → Biochemistry, Genetics and Molecular Biology |
| T14003 | Labor Law and Work Dynamics | 3320 Political Science and International Relations | 3308 Law | same |
| T14019 | Socioeconomic and Demographic Analysis | 2308 Management, Monitoring, Policy and Law | 2002 Economics and Econometrics | field Environmental Science → Economics, Econometrics and Finance; domain Physical Sciences → Social Sciences |
| T14020 | General Medicine and Therapeutics | 2746 Surgery | 2724 Internal Medicine | same |
| T14029 | Thoreau and American Literature | 1710 Information Systems | 3605 Health Information Management | field Computer Science → Health Professions; domain Physical Sciences → Health Sciences |
| T14031 | Global and Cross-Cultural Management | 3314 Anthropology | 1403 Business and International Management | field Social Sciences → Business, Management and Accounting |
| T14035 | Literature, Culture, and Aesthetics | 1209 Museology | 3315 Communication | field Arts and Humanities → Social Sciences |
| T14036 | Literary and Philosophical Studies | 3320 Political Science and International Relations | 3308 Law | same |
| T14040 | Problem Solving Skills Development | 3616 Speech and Hearing | 3202 Applied Psychology | field Health Professions → Psychology; domain Health Sciences → Social Sciences |
| T14041 | Central European Literary Studies | 3314 Anthropology | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T14043 | Historical and modern epidemiology studies | 3312 Sociology and Political Science | 2713 Epidemiology | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T14049 | Plant and Fungal Species Descriptions | 1312 Molecular Biology | 1105 Ecology, Evolution, Behavior and Systematics | field Biochemistry, Genetics and Molecular Biology → Agricultural and Biological Sciences |
| T14052 | Galician and Iberian cultural studies | 3305 Geography, Planning and Development | 3316 Cultural Studies | same |
| T14053 | Dengue and Mosquito Control Research | 3312 Sociology and Political Science | 2739 Public Health, Environmental and Occupational Health | field Social Sciences → Medicine; domain Social Sciences → Health Sciences |
| T14056 | Safety Warnings and Signage | 3207 Social Psychology | 3307 Human Factors and Ergonomics | field Psychology → Social Sciences |
| T14068 | Organic and Inorganic Chemical Reactions | 1607 Spectroscopy | 1605 Organic Chemistry | same |
| T14070 | Knowledge Societies in the 21st Century | 3317 Demography | 3312 Sociology and Political Science | same |
| T14079 | Mathematics Education and Programs | 2611 Modeling and Simulation | 3304 Education | field Mathematics → Social Sciences; domain Physical Sciences → Social Sciences |
| T14089 | Nanotechnology research and applications | 2204 Biomedical Engineering | 2500 General Materials Science | field Engineering → Materials Science |
| T14093 | Global Health and Epidemiology | 3605 Health Information Management | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T14095 | Literature, Musicology, and Cultural Analysis | 3304 Education | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T14101 | Financial Crisis of the 21st Century | 2003 Finance | 1202 History | field Economics, Econometrics and Finance → Arts and Humanities |
| T14114 | Digital Media and Philosophy | 1706 Computer Science Applications | 3315 Communication | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14118 | Social and Demographic Issues in Germany | 3600 General Health Professions | 3317 Demography | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T14119 | Agricultural and Environmental Management | 3317 Demography | 3303 Development | same |
| T14121 | Business Logistics and Inventory Control | 1404 Management Information Systems | 1803 Management Science and Operations Research | field Business, Management and Accounting → Decision Sciences |
| T14124 | Food, Nutrition, and Cultural Practices | 1106 Food Science | 3314 Anthropology | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T14125 | Education, Sociology, Communication Studies | 3316 Cultural Studies | 3304 Education | same |
| T14130 | Healthcare, Law, Governance, and Management Studies | 3600 General Health Professions | 1406 Marketing | field Health Professions → Business, Management and Accounting; domain Health Sciences → Social Sciences |
| T14131 | Giambattista Vico and Joyce | 1207 History and Philosophy of Science | 1208 Literature and Literary Theory | same |
| T14137 | Agriculture, Soil, Plant Science | 1105 Ecology, Evolution, Behavior and Systematics | 1102 Agronomy and Crop Science | same |
| T14138 | Life Cycle Costing Analysis | 1402 Accounting | 2215 Building and Construction | field Business, Management and Accounting → Engineering; domain Social Sciences → Physical Sciences |
| T14151 | Literary Analysis and Cultural Studies | 1207 History and Philosophy of Science | 1208 Literature and Literary Theory | same |
| T14152 | Healthcare Facilities Design and Sustainability | 3322 Urban Studies | 2216 Architecture | field Social Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T14160 | Water management and technologies | 1105 Ecology, Evolution, Behavior and Systematics | 1202 History | field Agricultural and Biological Sciences → Arts and Humanities; domain Life Sciences → Social Sciences |
| T14162 | Historical and Literary Studies | 3314 Anthropology | 1204 Archeology (arts and humanities) | field Social Sciences → Arts and Humanities |
| T14163 | Astronomical Observations and Instrumentation | 2206 Computational Mechanics | 3103 Astronomy and Astrophysics | field Engineering → Physics and Astronomy |
| T14171 | Education, Law, and Society | 3320 Political Science and International Relations | 3308 Law | same |
| T14173 | Education, Healthcare and Sociology Research | 3207 Social Psychology | 3312 Sociology and Political Science | field Psychology → Social Sciences |
| T14180 | Law, logistics, and international trade | 1402 Accounting | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T14184 | Metallurgy and Material Science | 2505 Materials Chemistry | 2506 Metals and Alloys | same |
| T14185 | Research, Science, and Academia | 1802 Information Systems and Management | 1405 Management of Technology and Innovation | field Decision Sciences → Business, Management and Accounting |
| T14186 | Healthcare Systems and Practices | 3600 General Health Professions | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T14190 | Military history and social perspectives | 3316 Cultural Studies | 1202 History | field Social Sciences → Arts and Humanities |
| T14191 | Historical Art and Architecture Studies | 1206 Conservation | 1213 Visual Arts and Performing Arts | same |
| T14194 | Bioactive Compounds in Plants | 1110 Plant Science | 3004 Pharmacology | field Agricultural and Biological Sciences → Pharmacology, Toxicology and Pharmaceutics |
| T14198 | Philosophical Thought and Analysis | 3300 General Social Sciences | 1211 Philosophy | field Social Sciences → Arts and Humanities |
| T14210 | Historical and Linguistic Studies | 3312 Sociology and Political Science | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T14215 | Chemical and Environmental Engineering Research | 1710 Information Systems | 1508 Process Chemistry and Technology | field Computer Science → Chemical Engineering |
| T14219 | Local Economic Development and Planning | 3320 Political Science and International Relations | 3305 Geography, Planning and Development | same |
| T14222 | Knowledge Management and Technology | 1803 Management Science and Operations Research | 1802 Information Systems and Management | same |
| T14223 | Ayn Rand and Brontë studies | 2002 Economics and Econometrics | 1208 Literature and Literary Theory | field Economics, Econometrics and Finance → Arts and Humanities |
| T14226 | Migration, Racism, and Human Rights | 3306 Health | 3308 Law | same |
| T14229 | Physical education and sports games research | 3207 Social Psychology | 3304 Education | field Psychology → Social Sciences |
| T14230 | Occupational and Professional Licensing Regulation | 2002 Economics and Econometrics | 3308 Law | field Economics, Econometrics and Finance → Social Sciences |
| T14235 | Linguistic, Cultural, and Literary Studies | 3312 Sociology and Political Science | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T14236 | Educational Tools and Methods | 3311 Safety Research | 3304 Education | same |
| T14241 | Evasion and Academic Success Factors | 3317 Demography | 3304 Education | same |
| T14248 | Social impacts of COVID-19 | 3311 Safety Research | 3312 Sociology and Political Science | same |
| T14250 | Energy and Environmental Systems | 3313 Transportation | 1705 Computer Networks and Communications | field Social Sciences → Computer Science; domain Social Sciences → Physical Sciences |
| T14252 | Water and Wastewater Treatment | 2206 Computational Mechanics | 2312 Water Science and Technology | field Engineering → Environmental Science |
| T14262 | Extenics and Innovation Methods | 2206 Computational Mechanics | 1803 Management Science and Operations Research | field Engineering → Decision Sciences; domain Physical Sciences → Social Sciences |
| T14263 | Professional Masters Programs Analysis | 1802 Information Systems and Management | 3304 Education | field Decision Sciences → Social Sciences |
| T14265 | Social and Behavioral Studies | 3306 Health | 3207 Social Psychology | field Social Sciences → Psychology |
| T14275 | Historical Medical Research and Treatments | 2741 Radiology, Nuclear Medicine and Imaging | 2736 Pharmacology (medical) | same |
| T14285 | Biopolymer Synthesis and Applications | 1312 Molecular Biology | 2402 Applied Microbiology and Biotechnology | field Biochemistry, Genetics and Molecular Biology → Immunology and Microbiology |
| T14288 | Law, Rights, and Freedoms | 3312 Sociology and Political Science | 3308 Law | same |
| T14291 | Indonesian Legal and Regulatory Studies | 3320 Political Science and International Relations | 3308 Law | same |
| T14292 | Migration, Policy, and Dickens Studies | 3317 Demography | 1208 Literature and Literary Theory | field Social Sciences → Arts and Humanities |
| T14293 | Biotechnology and Related Fields | 2739 Public Health, Environmental and Occupational Health | 1405 Management of Technology and Innovation | field Medicine → Business, Management and Accounting; domain Health Sciences → Social Sciences |
| T14295 | Families in Therapy and Culture | 3207 Social Psychology | 3308 Law | field Psychology → Social Sciences |
| T14297 | Plant-Derived Bioactive Compounds | 1605 Organic Chemistry | 1110 Plant Science | field Chemistry → Agricultural and Biological Sciences; domain Physical Sciences → Life Sciences |
| T14304 | Transport Systems and Technology | 2210 Mechanical Engineering | 2205 Civil and Structural Engineering | same |
| T14306 | Technology Assessment and Management | 2213 Safety, Risk, Reliability and Quality | 1405 Management of Technology and Innovation | field Engineering → Business, Management and Accounting; domain Physical Sciences → Social Sciences |
| T14307 | Bioethics and Human Rights Issues | 1710 Information Systems | 1207 History and Philosophy of Science | field Computer Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T14309 | Employee Performance and Management | 3307 Human Factors and Ergonomics | 1407 Organizational Behavior and Human Resource Management | field Social Sciences → Business, Management and Accounting |
| T14311 | Electrical and Electromagnetic Research | 3107 Atomic and Molecular Physics, and Optics | 2208 Electrical and Electronic Engineering | field Physics and Astronomy → Engineering |
| T14320 | Optics and Image Analysis | 1404 Management Information Systems | 3309 Library and Information Sciences | field Business, Management and Accounting → Social Sciences |
| T14335 | Educational Robotics and Engineering | 1702 Artificial Intelligence | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14336 | Land Use and Management | 3320 Political Science and International Relations | 3305 Geography, Planning and Development | same |
| T14341 | Education, Technology, and Ethics | 2308 Management, Monitoring, Policy and Law | 1207 History and Philosophy of Science | field Environmental Science → Arts and Humanities; domain Physical Sciences → Social Sciences |
| T14343 | Hispanic-African Historical Relations | 1212 Religious studies | 1202 History | same |
| T14345 | Scientific Research and Philosophical Inquiry | 1710 Information Systems | 1405 Management of Technology and Innovation | field Computer Science → Business, Management and Accounting; domain Physical Sciences → Social Sciences |
| T14346 | Scientific Innovation and Industrial Efficiency | 1800 General Decision Sciences | 1405 Management of Technology and Innovation | field Decision Sciences → Business, Management and Accounting |
| T14350 | Innovation, Sustainability, Human-Machine Systems | 3312 Sociology and Political Science | 2308 Management, Monitoring, Policy and Law | field Social Sciences → Environmental Science; domain Social Sciences → Physical Sciences |
| T14357 | Architecture, Design, and Social History | 1206 Conservation | 2216 Architecture | field Arts and Humanities → Engineering; domain Social Sciences → Physical Sciences |
| T14359 | Wetland Management and Conservation | 2212 Ocean Engineering | 2309 Nature and Landscape Conservation | field Engineering → Environmental Science |
| T14362 | Diverse Legal and Medical Studies | 1408 Strategy and Management | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T14367 | Logistics and Infrastructure Analysis | 1107 Forestry | 3313 Transportation | field Agricultural and Biological Sciences → Social Sciences; domain Life Sciences → Social Sciences |
| T14371 | David Hume Studies | 3300 General Social Sciences | 1211 Philosophy | field Social Sciences → Arts and Humanities |
| T14373 | Securities Regulation and Market Practices | 1406 Marketing | 3308 Law | field Business, Management and Accounting → Social Sciences |
| T14382 | Electrophoretic Deposition in Materials Science | 2208 Electrical and Electronic Engineering | 2508 Surfaces, Coatings and Films | field Engineering → Materials Science |
| T14390 | Real estate and construction management | 2216 Architecture | 2215 Building and Construction | same |
| T14391 | Forest, Soil, and Plant Ecology in China | 3304 Education | 1107 Forestry | field Social Sciences → Agricultural and Biological Sciences; domain Social Sciences → Life Sciences |
| T14396 | Healthcare Regulation | 3605 Health Information Management | 2739 Public Health, Environmental and Occupational Health | field Health Professions → Medicine |
| T14403 | Information Security Education | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14409 | Educational Systems and Policies | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14410 | Safety and Risk Management | 1407 Organizational Behavior and Human Resource Management | 3311 Safety Research | field Business, Management and Accounting → Social Sciences |
| T14411 | Undergraduate Neuroscience Education and Research | 2805 Cognitive Neuroscience | 3304 Education | field Neuroscience → Social Sciences; domain Life Sciences → Social Sciences |
| T14414 | Artificial Intelligence in Education | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14415 | Biomedical Research and Pathophysiology | 2734 Pathology and Forensic Medicine | 2727 Nephrology | same |
| T14419 | Banking Systems and Strategies | 1402 Accounting | 2003 Finance | field Business, Management and Accounting → Economics, Econometrics and Finance |
| T14427 | Environmental Monitoring and Data Management | 1907 Geology | 2308 Management, Monitoring, Policy and Law | field Earth and Planetary Sciences → Environmental Science |
| T14430 | Higher Education and Teaching Methods | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14441 | Religion, Theology, History, Judaism, Christianity | 3320 Political Science and International Relations | 1212 Religious studies | field Social Sciences → Arts and Humanities |
| T14445 | Transportation Safety and Impact Analysis | 2205 Civil and Structural Engineering | 2203 Automotive Engineering | same |
| T14447 | Trade Secret Protection Methods | 3605 Health Information Management | 3308 Law | field Health Professions → Social Sciences; domain Health Sciences → Social Sciences |
| T14454 | Polymer Science and Applications | 2210 Mechanical Engineering | 2507 Polymers and Plastics | field Engineering → Materials Science |
| T14457 | Intellectual Property Rights and Media | 3320 Political Science and International Relations | 3308 Law | same |
| T14458 | Education and Work Dynamics | 3317 Demography | 3312 Sociology and Political Science | same |
| T14469 | Renaissance Literature and Culture | 1205 Classics | 1208 Literature and Literary Theory | same |
| T14479 | Freezing and Crystallization Processes | 2211 Mechanics of Materials | 1506 Filtration and Separation | field Engineering → Chemical Engineering |
| T14485 | Language Acquisition and Education | 3204 Developmental and Educational Psychology | 3304 Education | field Psychology → Social Sciences |
| T14490 | Human Rights and Immigration | 3312 Sociology and Political Science | 3308 Law | same |
| T14498 | Educational Technology in Learning | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14499 | Livestock Farming and Management | 1102 Agronomy and Crop Science | 1103 Animal Science and Zoology | same |
| T14504 | Diverse Academic Research Analysis | 3312 Sociology and Political Science | 2216 Architecture | field Social Sciences → Engineering; domain Social Sciences → Physical Sciences |
| T14507 | History, Culture, and Society | 3616 Speech and Hearing | 1202 History | field Health Professions → Arts and Humanities; domain Health Sciences → Social Sciences |
| T14509 | demographic modeling and climate adaptation | 1803 Management Science and Operations Research | 3305 Geography, Planning and Development | field Decision Sciences → Social Sciences |
| T14511 | Medicine, History, and Philosophy | 2738 Psychiatry and Mental health | 1207 History and Philosophy of Science | field Medicine → Arts and Humanities; domain Health Sciences → Social Sciences |
| T14516 | English Language Learning and Teaching | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |
| T14519 | Innovations in Education and Learning Technologies | 1710 Information Systems | 3304 Education | field Computer Science → Social Sciences; domain Physical Sciences → Social Sciences |

## Subfields renamed (3 November 2026)

| Subfield | Old name | New name |
|---|---|---|
| 1204 | Archeology | Archeology (arts and humanities) |
| 2704 | Biochemistry | Biochemistry (medical) |
| 2716 | Genetics | Genetics (clinical) |
| 2726 | Microbiology | Microbiology (medical) |
| 2728 | Neurology | Clinical Neurology |
| 2736 | Pharmacology | Pharmacology (medical) |
| 2737 | Physiology | Physiology (medical) |

## Subfield descriptions rewritten (3 November 2026)

These descriptions had come from wrong Wikidata matches.

| Subfield | Description today |
|---|---|
| 1802 Information Systems and Management | organisational activity concerning information lifecycle |
| 2100 General Energy | study of energy in physical systems, its sources, technology, management, and impacts |
| 2215 Building and Construction | economic activity that consists of the building or assembling of a building or infrastructure |
| 2506 Metals and Alloys | mixture or metallic solid solution composed of two or more elements |
| 2911 Leadership and Management | ability or activity of an individual or organization to guide other individuals, teams, or entire organizations |
| 3303 Development | multidisciplinary branch of social science which addresses issues of concern to developing countries |
| 3310 Linguistics and Language | scientific study of language |

## Related pages

- [Topics](/data/topics/): what a topic is and how works get them
- [Subfields](/data/subfields/): the level above topics, and the cohort for FWCI