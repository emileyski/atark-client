import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import axios from "axios";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({
  originPosition,
  destinationPosition,
  setOriginName,
  setDestinationName,
  setOriginCoordinates,
  setDestinationCoordinates,
  setPrice,
  setDistance,
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        {
          latLng: L.latLng(originPosition.latitude, originPosition.longitude),
          name: "Origin City",
          id: "origin",
        },
        {
          latLng: L.latLng(
            destinationPosition.latitude,
            destinationPosition.longitude
          ),
          name: "Destination City",
          id: "destination",
        },
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      show: false,
      createMarker: function (waypointIndex, waypoint, number, isVia) {
        const marker = L.marker(waypoint.latLng, {
          draggable: true,
        });

        // Add popup with city name
        marker.bindPopup(waypoint.name);

        // Update popup content while dragging
        marker.on("dragend", async function (event) {
          const newLatLng = event.target.getLatLng();
          const newCityName = await getCityNameForLatLng(newLatLng); // Replace this with your logic to get city name

          if (waypointIndex === 0) {
            setOriginName(newCityName);
            setOriginCoordinates({
              latitude: newLatLng.lat,
              longitude: newLatLng.lng,
            });
          } else {
            setDestinationName(newCityName);
            setDestinationCoordinates({
              latitude: newLatLng.lat,
              longitude: newLatLng.lng,
            });
          }

          marker.openPopup().setPopupContent(newCityName);
        });

        return marker;
      },
    }).addTo(map);

    // Handle routesfound event
    routingControl.on("routesfound", async function (event) {
      const route = event.routes[0];
      const routeLength = route.summary.totalDistance; // Distance in meters
      //   console.log("Route Length:", alert(routeLength / 1000));

      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/orders/estimated-price?distance=${
          routeLength / 1000
        }&tariffId=2`
      );

      setPrice(res.data);
      setDistance(routeLength / 1000);
    });
    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

async function getCityNameForLatLng(newLatLng: any) {
  const url = `https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${newLatLng.lat}%2C${newLatLng.lng}&language=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9fc976c5bemshf7e9dacfab36645p14ef8ajsn49294716680d",
      "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result.results[0].formatted_address;
  } catch (error) {
    console.error(error);
  }
}
