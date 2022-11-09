import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './PizzaDetails.module.scss';
import { selectItemsList } from '../../redux/slices/itemsSlice';

import {ErrorGetItems} from '../../components';
import Skeleton from './Skeleton';

const PizzaDetails: React.FC = () => {
  const { id } = useParams();
  const { itemsList, status } = useSelector(selectItemsList);
  const item = itemsList.find((obj) => obj.id === id);

  if (!item) {
    return <div><h2>Error 404</h2></div>
  }

  const { imageUrl, name } = item;

  return (
    <div className={styles.root}>
      {status === 'error' ? (
        <ErrorGetItems />
      ) : status === 'loading' ? (
        <Skeleton />
      ) : (
        <>
          <img className={styles.image} src={imageUrl} alt="Pizza" />
          <div className={styles.description}>
            <h2>{name}</h2>
            <p>Опис: надзвичайно смачна піца!</p>
            <p>Склад: тісто, начинка.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PizzaDetails;
