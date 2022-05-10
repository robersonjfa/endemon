import * as React from 'react';

const Mapa = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "U58GocWLCYbZ6pBZJoatbZRB1ZYpr59quEEKWx6YZis"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: -26.723521652117125, lng: -53.538743881231866 },
      zoom: 5,
      pixelRatio: window.devicePixelRatio || 1
    });

    var smoMarker = new H.map.Marker({lat: -26.723521652117125, lng: -53.538743881231866});
    hMap.addObject(smoMarker);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};

export default Mapa;