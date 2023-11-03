import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './CountryPage.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ids, paths } from '../../data';
import { countryData } from '../../types/countryData';

const CountryPage = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const { id } = useParams();
    const index = ids.indexOf(id!);
    const pathData = paths[index];
    const [countryData, setCountryData] = useState<countryData>();
    const [box, setBox] = useState<DOMRect>();

    useEffect(() => {
        setBox(pathRef?.current?.getBBox());

        (async () => {
            const { data } = await axios.get<countryData[]>(
                `https://restcountries.com/v3.1/alpha?codes=${id}`,
            );
            setCountryData(data[0]);
        })();
    }, []);

    useEffect(() => {
        if (box) {
            svgRef?.current?.setAttribute(
                'viewBox',
                `${box?.x} ${box?.y} ${box?.width} ${box?.height}`,
            );
        }
    }, [box]);

    return (
        <div className={styles.countryPage}>
            <Navbar />
            <div className={styles.countryPage__inner}>
                <div className={styles.countryPage__body}>
                    <div className={styles.countryPage__visual}>
                        <svg ref={svgRef} className={styles.countryPage__svg}>
                            <path d={pathData} ref={pathRef} className={styles.countryPage__path} />
                        </svg>
                        <div className={styles.countryPage__flag}>
                            {countryData && (
                                <img
                                    className={styles.countryPage__img}
                                    src={countryData.flags.svg}
                                    alt={countryData.flags.alt}
                                />
                            )}
                        </div>
                    </div>
                    <ul className={styles.countryPage__list}>
                        <li className={styles.countryPage__row}>
                            <h1 className={styles.countryPage__title}>
                                {countryData?.name.common}
                            </h1>
                        </li>
                        <li className={styles.countryPage__row}>
                            <span className={styles.countryPage__field}>Capital: </span>
                            <span className={styles.countryPage__value}>
                                {countryData?.capital[0]}
                            </span>
                        </li>
                        <li className={styles.countryPage__row}>
                            <span className={styles.countryPage__field}>Population: </span>
                            <span className={styles.countryPage__value}>
                                {countryData?.population}
                            </span>
                        </li>
                        <li className={styles.countryPage__row}>
                            <span className={styles.countryPage__field}>Timezones: </span>
                            <span className={styles.countryPage__value}>
                                {countryData?.timezones.map((el, i) =>
                                    i !== countryData?.timezones.length - 1 ? el + ', ' : el,
                                )}
                            </span>
                        </li>
                        <li className={styles.countryPage__row}>
                            <span className={styles.countryPage__field}>Code: </span>
                            <span className={styles.countryPage__value}>
                                {countryData?.idd.root}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CountryPage;
