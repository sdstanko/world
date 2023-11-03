import React, { FC } from 'react';
import Card from 'react-bootstrap/Card';
import styles from './CountryCard.module.scss';

export interface CountryCardProps {
    name?: string;
    capital?: string;
    flag?: string;
    className?: string;
}

const CountryCard: FC<CountryCardProps> = ({ name, capital, flag, className }) => {
    return (
        <Card className={[styles.card, className].join(' ')}>
            <Card.Body className={styles.card__body}>
                <div>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{capital}</Card.Subtitle>
                </div>
                <img className={styles.card__flag} src={flag} alt="" />
            </Card.Body>
        </Card>
    );
};

export default CountryCard;
