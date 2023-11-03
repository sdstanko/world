import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryCard from '../CountryCard/CountryCard';
import styles from './Country.module.scss';

interface CountryProps {
    d: string;
    id: string;
    setCountryId: Dispatch<SetStateAction<string>>;
    wasClickToNav: boolean;
}

const Country: FC<CountryProps> = ({ d, id, setCountryId, wasClickToNav }) => {
    const navigate = useNavigate();
    const pathRef = useRef<SVGPathElement>(null);
    const [origin, setOrigin] = useState<number[]>([0, 0]);

    const getCoords = () => {
        const bbox = pathRef.current?.getBBox();
        if (bbox) {
            const { x, y, width, height } = bbox;
            const xOrigin = x + width / 2;
            const yOrigin = y + height / 2;
            setOrigin([xOrigin, yOrigin]);
        }
    };

    useEffect(() => {
        getCoords();
    }, []);

    const clickHandler = (e: React.MouseEvent) => {
        if (wasClickToNav) {
            navigate(`/country/${id}`);
        }
    };

    return (
        <path
            d={d}
            id={id}
            ref={pathRef}
            className={styles.country}
            onMouseOver={() => setCountryId(id)}
            style={{ transformOrigin: `${origin[0]}px ${origin[1]}px` }}
            onClick={(e) => clickHandler(e)}
        />
    );
};

export default Country;
