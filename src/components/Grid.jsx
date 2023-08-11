import React from 'react';
import GridArray from './GridArray';

export default function Grid({ data }) {
  return (
    <div className="grid grid-cols-[repeat(4,minmax(0,_100px))] bg-white">
      <GridArray data={data} />
    </div>
  );
}
