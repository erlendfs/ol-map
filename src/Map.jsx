import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Icon, Circle as CircleStyle } from 'ol/style';

// Define styles for the layers
const lineStyle = new Style({
  stroke: new Stroke({
    color: '#D90347',
    width: 2,
  }),
});

// Define the point style with an image marker
const pointStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: '/cell_img.png', // Replace with the path to your image
      scale: 0.3, // Adjust the scale as needed
    }),
  });

const MapComponent = () => {
  const mapRef = useRef();

  useEffect(() => {
    // Initialize the map only once
    const map = new Map({
      target: mapRef.current,
      layers: [],
      view: new View({
        center: fromLonLat([5.31, 60.39]), // Replace with your desired center
        zoom: 10,
      }),
    });

    // Add ArcGIS REST Tile Layer as the basemap
    const arcgisTileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles © ArcGIS Enterprise', // Optional attribution
      }),
    });
    map.addLayer(arcgisTileLayer);

    // Add GeoJSON Layers
    const addGeoJsonLayer = (url, style) => {
      console.log("adding layer", style)
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: url,
          format: new GeoJSON(),
        }),
        style: style, // Optional: Pass custom styling function or object
      });
      map.addLayer(vectorLayer);
    };
    // Add the point GeoJSON layer
    addGeoJsonLayer('/tunnel_sim1.geojson', lineStyle);
    // Add the line GeoJSON layer
    addGeoJsonLayer('/masts.json', pointStyle);
    
    

    return () => map.setTarget(null); // Cleanup map on component unmount
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
