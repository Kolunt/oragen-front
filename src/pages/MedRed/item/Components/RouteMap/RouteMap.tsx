import React, { useState, useEffect, useRef, FC, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Tooltip,
  Circle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import { IGeolocation } from '../../../../../api/geolocationApi';

// center for MapContainer
const center = [55.77614, 37.58409];

// пример positions
const polyline = [
  [55.77614, 37.58409],
  [55.77569, 37.58421],
  [55.77182, 37.57869],
];

interface IRouteMap {
  geotargeting: [number, number][];
  geotargetingData: IGeolocation[];
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export const RouteMap: FC<IRouteMap> = ({ geotargeting, geotargetingData }) => {
  const startDate = useMemo(() => {
    if (geotargetingData && geotargetingData.length > 0) {
      return dayjs(geotargetingData[0].created_at).format(
        DateFormats.FULL_DATE_FORMAT
      );
    }
  }, [geotargetingData]);
  const endDate = useMemo(() => {
    if (geotargetingData && geotargetingData.length > 0) {
      return dayjs(geotargetingData[1].created_at).format(
        DateFormats.FULL_DATE_FORMAT
      );
    }
  }, [geotargetingData]);

  const newGeotargetingData = useMemo(() => {
    return geotargetingData.slice(1, geotargetingData.length - 1);
  }, [geotargetingData]);

  return geotargeting && geotargeting.length > 0 ? (
    <MapContainer
      className='example-map fz-0'
      center={geotargeting[0]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Polyline pathOptions={{ color: 'lime' }} positions={geotargeting} />

      <Marker position={geotargeting[0]}>
        {/*<Tooltip permanent >{startDate}</Tooltip>*/}
        <Popup>{startDate}</Popup>
      </Marker>
      {newGeotargetingData.map(({ created_at, geotag, id }, index) => (
        <div key={id}>
          <Circle
            center={[
              Number(geotag.split(' ')[0]),
              Number(geotag.split(' ')[1]),
            ]}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={1}
          >
            <Popup>
              {dayjs(created_at).format(DateFormats.FULL_DATE_FORMAT)}
            </Popup>
          </Circle>
        </div>
      ))}
      <Marker position={geotargeting[geotargeting.length - 1]}>
        {/*<Tooltip permanent >{endDate}</Tooltip>*/}
        <Popup>{endDate}</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <div className='fz-14'>Координат для карты нет</div>
  );
};
