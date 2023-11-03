interface flags {
    alt: string;
    png: string;
    svg: string;
}

interface name {
    common: string;
    official: string;
}

interface idd {
    root: string;
}

export interface countryData {
    capital: string[];
    flags: flags;
    name: name;
    population: number;
    timezones: string[];
    idd: idd;
}