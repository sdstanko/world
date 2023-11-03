import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './CountryList.module.scss';
import { ids } from '../../data';
import { countryData } from '../../types/countryData';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountryList = () => {
    const [countryData, setCountryData] = useState<countryData[]>();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get<countryData[]>(
                `https://restcountries.com/v3.1/all?fields=name,flags`,
            );
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountryData(data);
        })();
    }, []);

    return (
        <div className={styles.countryList}>
            <Navbar />
            <div className={styles.countryList__body}>
                {countryData &&
                    countryData.map((el, i) => (
                        <div className={styles.countryList__item} key={i}>
                            <span className={styles.countryList__num}>{i + 1}</span>
                            <div className={styles.countryList__country}>
                                <Link
                                    to={`/world/country/${ids[i]}`}
                                    className={styles.countryList__name}
                                >
                                    {el.name.common}
                                </Link>
                                <img
                                    className={styles.countryList__flag}
                                    src={el.flags.svg}
                                    alt={el.flags.alt}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CountryList;
