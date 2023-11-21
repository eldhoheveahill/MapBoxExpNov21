import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Location {
  coordinates: [number, number];
  name: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  locations: Location[] = [
    { coordinates: [-74.0059, 40.7128], name: 'New York City, NY' },
    { coordinates: [-77.0369, 38.9072], name: 'Washington, D.C.' },
    { coordinates: [-118.2437, 34.0522], name: 'Los Angeles, CA' },
    { coordinates: [-122.4194, 37.7749], name: 'San Francisco, CA' },
    { coordinates: [-87.6298, 41.8781], name: 'Chicago, IL' },
    { coordinates: [-95.3698, 29.7604], name: 'Houston, TX' },
    { coordinates: [-80.1917902, 25.7616798], name: 'Miami, FL' },
    { coordinates: [-71.0589, 42.3601], name: 'Boston, MA' },
    { coordinates: [-77.0366, 38.8951], name: 'Arlington, VA' },
    { coordinates: [-96.8067, 32.7767], name: 'Dallas, TX' },
    { coordinates: [-117.1611, 32.7157], name: 'San Diego, CA' },
    { coordinates: [-84.3880, 33.7490], name: 'Atlanta, GA' },
    { coordinates: [-95.9928, 36.1538], name: 'Tulsa, OK' },
    { coordinates: [-104.9903, 39.7392], name: 'Denver, CO' },
    { coordinates: [-73.9352, 40.7306], name: 'Brooklyn, NY' },
    { coordinates: [-111.8910, 40.7608], name: 'Salt Lake City, UT' },
    { coordinates: [-73.9866, 40.7488], name: 'Manhattan, NY' },
    { coordinates: [-90.0715, 29.9511], name: 'New Orleans, LA' },
    { coordinates: [-112.0740, 33.4484], name: 'Phoenix, AZ' },
    { coordinates: [-80.8431, 35.2271], name: 'Charlotte, NC' },
    // Add more locations as needed
  ];

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXJ2aW5kcDA5IiwiYSI6ImNsbzg0ZGk2YzBjOHIycW9la2pkOWpxNzgifQ.niGIq75jSXqP1AP_OQsdNg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    this.markLocations(map, this.locations);
  }

  private markLocations(map: mapboxgl.Map, locations: Location[]): void {
    // Convert coordinates to objects with lng and lat properties
    const coordinatesWithProps = locations.map(coord => ({ lng: coord.coordinates[0], lat: coord.coordinates[1] }));

    // Calculate the bounding box
    const bounds = coordinatesWithProps.reduce((bounds, coord) => {
      return bounds.extend([coord.lng, coord.lat]);
    }, new mapboxgl.LngLatBounds(coordinatesWithProps[0], coordinatesWithProps[0]));

    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker()
        .setLngLat(location.coordinates as mapboxgl.LngLatLike)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
        .addTo(map);
    });

    // Fit the map to the bounds
    map.fitBounds(bounds, { padding: 20 });
  }
}
