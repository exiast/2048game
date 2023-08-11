import React from 'react';
import Tile from './Tile';

export default function GridArray({ data }) {
  // prettier-ignore
  return data?.map((row) => row.map((item, index) => (
    <Tile
      // eslint-disable-next-line react/no-array-index-key
      key={`${item}_${index}`}
      number={item}
    />
  )));
}
