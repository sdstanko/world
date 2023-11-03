import React, { useEffect, useRef, useState } from 'react';
import { ids, paths } from '../../data';
import Country from '../../components/Country/Country';
import styles from './Map.module.scss';
import CountryCard from '../../components/CountryCard/CountryCard';
import { countryData } from '../../types/countryData';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const Map = () => {
    const svg = useRef<SVGSVGElement>(null);
    const group = useRef<SVGGElement>(null);
    const [zoomTransform, setZoomTransform] = useState<DOMMatrix | undefined>();
    const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
    const [movedDistance, setMovedDistance] = useState({ x: 0, y: 0 });
    const [wasClickToNav, setWasClickToNav] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [countryId, setCountryId] = useState('');
    const [countryData, setCountryData] = useState({ name: '', capital: '', flag: '' });

    useEffect(() => {
        if (svg.current) {
            setZoomTransform(svg.current.createSVGMatrix());
        }
    }, []);

    useEffect(() => {
        (async function () {
            if (countryId) {
                const { data } = await axios.get<countryData[]>(
                    `https://restcountries.com/v3.1/alpha?codes=${countryId}&fields=name,capital,flags`,
                );

                setCountryData({
                    name: data[0]?.name?.common,
                    capital: data[0]?.capital[0],
                    flag: data[0]?.flags?.svg,
                });
            }
        })();
    }, [countryId]);

    const startMoving = (event: React.MouseEvent) => {
        const coords = convertScreenCoordsToSvgCoords(event.clientX, event.clientY);
        setIsMouseDown(true);
        setStartCoords({ x: coords.x, y: coords.y });
    };

    const endMoving = () => {
        setIsMouseDown(false);
        if (
            movedDistance.x < -10 ||
            movedDistance.x > 10 ||
            movedDistance.y < -10 ||
            movedDistance.y > 10
        ) {
            setWasClickToNav(false);
        } else {
            setWasClickToNav(true);
        }

        setMovedDistance({ x: 0, y: 0 });
    };

    function clickMove(event: React.MouseEvent) {
        const coords = convertScreenCoordsToSvgCoords(event.clientX, event.clientY);
        if (isMouseDown) {
            const movedDistanceVar = {
                x: coords.x - startCoords.x,
                y: coords.y - startCoords.y,
            };

            setMovedDistance((prev) => ({
                x: (prev.x += movedDistanceVar.x),
                y: (prev.y += movedDistanceVar.y),
            }));

            if (svg.current && zoomTransform) {
                let varMatrix = zoomTransform;
                setZoomTransform((prev) => prev?.translate(movedDistanceVar.x, movedDistanceVar.y));
                varMatrix = varMatrix.translate(movedDistanceVar.x, movedDistanceVar.y);
                const transform = svg.current.createSVGTransform();
                transform.setMatrix(varMatrix);
                group?.current?.transform.baseVal.initialize(transform);
            }
        }
    }

    function wheelZoom(event: React.WheelEvent) {
        let coords = convertScreenCoordsToSvgCoords(event.clientX, event.clientY);
        let scale = 1.0 + -event.deltaY * 0.001;

        if (svg.current && zoomTransform) {
            setZoomTransform((prev) => prev?.translate(coords.x, coords.y));
            setZoomTransform((prev) => prev?.scale(scale, scale));
            setZoomTransform((prev) => prev?.translate(-coords.x, -coords.y));
            const transform = svg.current.createSVGTransform();
            transform.setMatrix(zoomTransform);
            group?.current?.transform.baseVal.initialize(transform);
        }
    }

    function convertScreenCoordsToSvgCoords(x: number, y: number): { x: number; y: number } {
        let pt = new DOMPoint();
        pt.x = x;
        pt.y = y;
        if (group.current) {
            pt = pt.matrixTransform(group.current.getScreenCTM()?.inverse());
        }
        return { x: pt.x, y: pt.y };
    }

    return (
        <div className={styles.map__page}>
            <Navbar />
            <div className={styles.map__inner}>
                <div className={styles.map__body}>
                    <svg
                        width="1010"
                        height="666"
                        className={styles.map__svg}
                        onWheel={(e) => wheelZoom(e)}
                        onMouseDown={(e) => startMoving(e)}
                        onMouseMove={(e) => clickMove(e)}
                        onMouseUp={endMoving}
                        onMouseLeave={endMoving}
                        ref={svg}
                    >
                        <g ref={group}>
                            {ids.map((el, i) => (
                                <Country
                                    id={el}
                                    d={paths[i]}
                                    key={i}
                                    setCountryId={setCountryId}
                                    wasClickToNav={wasClickToNav}
                                />
                            ))}
                        </g>
                    </svg>
                    <CountryCard
                        className={styles.map__card}
                        name={countryData?.name}
                        capital={countryData?.capital}
                        flag={countryData?.flag}
                    />
                </div>
            </div>
        </div>
    );
};

export default Map;
