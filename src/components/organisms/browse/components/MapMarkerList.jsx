import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import Link from 'next/link';

export default function MapMarkerList({ markerDataList }) {
  return markerDataList.map(({ marker, popup }, index) => {
    return (
      <Marker {...marker} key={index}>
        <Popup>
          <Link href={`/fridge/${popup.link}`}>{popup.name}</Link>
        </Popup>
      </Marker>
    );
  });
}
MapMarkerList.propTypes = PropTypes.exact({
  markerDataList: PropTypes.array,
}).isRequired;
