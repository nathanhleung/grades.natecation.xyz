/**
 * Gets the long name of a short `subjectArea` (e.g. "A&O SCI")
 *
 * @param subjectArea the short subject area
 * @returns the long name for the subject area
 */
export function getSubjectAreaLongName(subjectArea: string) {
  return (
    {
      "A&O SCI": "Atmospheric and Oceanic Sciences",
      "AERO ST": "Aerospace Studies",
      "AF AMER": "African American Studies",
      "AM IND": "American Indian Studies",
      "AN N EA": "Ancient Near East",
      ANTHRO: "Anthropology",
      ARABIC: "Arabic",
      "ARCH&UD": "Architecture and Urban Design",
      ARMENIA: "Armenian",
      ART: "Art",
      "ART HIS": "Art History",
      "ART&ARC": "Arts and Architecture",
      "ARTS ED": "Arts Education",
      "ASIA AM": "Asian American Studies",
      ASIAN: "Asian Languages and Cultures",
      ASL: "American Sign Language",
      ASTR: "Astronomy",
      BIOENGR: "Bioengineering",
      BIOINFO: "Bioinformatics",
      "BIOL CH": "Biological Chemistry",
      BIOMATH: "Biomathematics",
      BIOSTAT: "Biostatistics",
      "BMD RES": "Biomedical Research",
      "C&EE": "Civil and Environmental Engineering",
      "C&EE ST": "Central and East European Studies",
      "C&S BIO": "Computational and Systems Biology",
      CCAS: "Chicana/o and Central American Studies",
      CESC: "Community Engagement and Social Change",
      "CH ENGR": "Chemical Engineering",
      CHEM: " Chemistry and Biochemistry",
      CHIN: "Chinese",
      CLASSIC: "Classics",
      CLUSTER: "Clusters",
      "COM HLT": "Community Health Sciences",
      "COM LIT": "Comparative Literature",
      "COM SCI": "Computer Science",
      COMM: "Communication",
      COMPTNG: "Program in Computing",
      DANCE: "Dance",
      DESMA: "Design / Media Arts",
      "DGT HUM": "Digital Humanities",
      "DIS STD": "Disability Studies",
      DUTCH: "Dutch",
      "EC ENGR": "Electrical and Computer Engineering",
      ECON: "Economics",
      EDUC: "Education",
      "EE BIOL": "Ecology and Evolutionary Biology",
      ENGCOMP: "English Composition",
      ENGL: "English",
      ENGR: "Engineering",
      "ENV HLT": "Environmental Health Sciences",
      ENVIRON: "Environment",
      EPIDEM: "Epidemiology",
      "EPS SCI": "Earth, Planetary, and Space Sciences",
      ESL: "English as A Second Language",
      ETHNMUS: "Ethnomusicology",
      FILIPNO: "Filipino",
      "FILM TV": "Film and Television",
      FRNCH: "French",
      GENDER: "Gender Studies",
      GEOG: "Geography",
      GERMAN: "German",
      "GJ STDS": "Global Jazz Studies",
      "GLBL ST": "Global Studies",
      "GRAD PD": "Graduate Student Professional Development",
      GREEK: "Greek",
      HEBREW: "Hebrew",
      "HIN-URD": "Hindi-Urdu",
      HIST: "History",
      "HLT ADM": "Healthcare Administration",
      "HLT POL": "Health Policy and Management",
      HNRS: "Honors Collegium",
      "HUM GEN": "Human Genetics",
      "I A STD": "International and Area Studies",
      "I E STD": "Indo-European Studies",
      "I M STD": "International Migration Studies",
      INDO: "Indonesian",
      "INF STD": "Information Studies",
      "INTL DV": "International Development Studies",
      IRANIAN: "Iranian",
      "ISLM ST": "Islamic Studies",
      ITALIAN: "Italian",
      JAPAN: "Japanese",
      JEWISH: "Jewish Studies",
      KOREA: "Korean",
      LATIN: "Latin",
      LAW: "Law",
      "LBR STD": "Labor Studies",
      LGBTQS: "Lesbian, Gay, Bisexual, Transgender, and Queer Studies",
      LIFESCI: "Life Sciences",
      LING: "Linguistics",
      "M E STD": "Middle Eastern Studies",
      "M PHARM": "Molecular and Medical Pharmacology",
      "MAT SCI": "Materials Science and Engineering",
      MATH: "Mathematics",
      "MC&IP": "Molecular, Cellular, and Integrative Physiology",
      "MCD BIO": "Molecular, Cell, and Developmental Biology",
      "MECH&AE": "Mechanical and Aerospace Engineering",
      MED: "Medicine",
      MGMT: "Management",
      MGMTEX: "Management-Executive MBA",
      MGMTFE: "Management-Fully Employed MBA",
      MGMTFT: "Management-Full-Time MBA",
      MGMTGEX: "Management-Global Executive MBA Asia Pacific",
      MGMTMFE: "Management-Master of Financial Engineering",
      MGMTMSA: "Management-Master of Science in Business Analytics",
      "MIL SCI": "Military Science",
      MIMG: "Microbiology, Immunology, and Molecular Genetics",
      "MOL TOX": "Molecular Toxicology",
      "MSC IND": "Music Industry",
      MUSC: "Music",
      MUSCLG: "Musicology",
      NEURO: "Neuroscience (Graduate)",
      NEUROSC: "Neuroscience",
      "NR EAST": "Near Eastern Languages",
      NURSING: "Nursing",
      OBGYN: "Obstetrics and Gynecology",
      "ORL BIO": "Oral Biology",
      PBMED: "Physics and Biology in Medicine",
      PEDS: "Pediatrics",
      PHILOS: "Philosophy",
      PHYSCI: "Physiological Science",
      PHYSICS: "Physics",
      "POL SCI": "Political Science",
      PORTGSE: "Portuguese",
      PSYCH: "Psychology",
      PSYCTRY: "Psychiatry and Biobehavioral Sciences",
      "PUB AFF": "Public Affairs",
      "PUB HLT": "Public Health",
      "PUB PLC": "Public Policy",
      RELIGN: "Study of Religion",
      RUSSN: "Russian",
      SCAND: "Scandinavian",
      "SCI EDU": "Science Education",
      SLAVC: "Slavic",
      "SOC GEN": "Society and Genetics",
      "SOC SC": "Social Science",
      "SOC WLF": "Social Welfare",
      SOCIOL: "Sociology",
      SPAN: "Spanish",
      STATS: "Statistics",
      SURGERY: "Surgery",
      SWAHILI: "Swahili",
      THAI: "Thai",
      THEATER: "Theater",
      "UNIV ST": "University Studies",
      "URBN PL": "Urban Planning",
      VIETMSE: "Vietnamese",
      "WL ARTS": "World Arts and Cultures",
      ARCHEOL: "Archaeology",
      ELTS: "European Languages and Transcultural Studies",
      "GLB HLT": "Global Health",
      MGMTPHD: "Management-PhD",
      "MOL BIO": "Molecular Biology",
      "NAV SCI": "Naval Science",
      NEURBIO: "Neurobiology",
      "S ASIAN": "South Asian",
      SEASIAN: "Southeast Asian",
      SEMITIC: "Semitic",
      "SRB CRO": "Serbian/Croatian",
      "FOOD ST": "Food Studies",
      GRNTLGY: "Gerontology",
      PATH: "Pathology and Laboratory Medicine",
      "RES PRC": "Research Practice",
      "UG-LAW": "Law (Undergraduate)",
      YIDDSH: "Yiddish",
    }[subjectArea] ?? ""
  );
}

export function getTermLongName(term: string) {
  if (!term) {
    return "";
  }

  const year = term.slice(0, 2);
  const quarterAbbreviation = term.slice(2);
  const quarterLongName = {
    "1": "Summer",
    "2": "Summer",
    F: "Fall",
    W: "Winter",
    S: "Spring",
  }[quarterAbbreviation];

  return `${quarterLongName} 20${year}`;
}

/**
 * Compares two terms
 *
 * @param a the first term
 * @param b the second term
 * @returns a positive value if the first term is chronologically after
 *  the second, 0 if they are equal, negative if the first term is
 *  chronologically before the second.
 * @example compareTerms("22S", "22W") would return a positive value.
 */
export function compareTerms(a: string, b: string) {
  const quarterOrdering = ["W", "S", "1", "2", "F"];
  const yearA = a.slice(0, 2);
  const quarterIndexA = quarterOrdering.indexOf(a.slice(2));
  const yearB = b.slice(0, 2);
  const quarterIndexB = quarterOrdering.indexOf(b.slice(2));

  if (yearA > yearB) {
    return 1;
  }
  else if (yearA < yearB) {
    return -1;
  }
  if (quarterIndexA === -1) {
    return 1;
  }
  else if (quarterIndexB === -1)  {
    return -1;
  }
  return quarterIndexA - quarterIndexB;
}

/**
 * Compares two letter grades
 *
 * @param a the first grade to compare
 * @param b the second grade to compare
 * @returns a positive value if the first grade is worse than the second,
 *  0 if they are equal, negative if the first grade is better than the
 *  second. Example: `compareGrades("A+", "B+")` would return a negative
 * value.
 */
export function compareGrades(a: string, b: string) {
  const gradeOrdering = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
    "P",
    "NP",
    "I",
  ];
  const indexOfA = gradeOrdering.indexOf(a);
  const indexOfB = gradeOrdering.indexOf(b);

  if (indexOfA === -1) {
    return 1;
  }
  if (indexOfB === -1) {
    return -1;
  }
  return indexOfA - indexOfB;
}
