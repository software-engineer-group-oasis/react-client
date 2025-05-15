"use client";

import React from 'react';
import { Map, APILoader, Marker } from '@uiw/react-baidu-map';

const BaiduMap = ({width="100%", height="500px", center="中南大学"}) => (
  <div style={{ width, height, overflow: 'auto' }}>
    <APILoader akay="s8zb8xxc5roTjEZuyQZc0lkBpZJAL1ph">
      <Map center={center}>
        <Marker position={center} />
      </Map>
      
    </APILoader>
  </div>
);

export default BaiduMap;