"use client";

import React from 'react';
import { Map, APILoader, Marker, NavigationControl } from '@uiw/react-baidu-map';


const BaiduMap = ({width="100%", height="500px", center="中南大学"}) => (
  <div style={{ width, height, overflow: 'auto' }}>
    <APILoader akay="s8zb8xxc5roTjEZuyQZc0lkBpZJAL1ph">
      <Map center={center}>
        
        <NavigationControl />
      </Map>
      
    </APILoader>
  </div>
);

export default BaiduMap;