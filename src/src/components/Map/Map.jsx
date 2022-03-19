import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from 'react';
import styles from './Map.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { hideMap, setUserLat, setUserLng, setUserAddress } from '../../appSlice';


mapboxgl.accessToken = 'pk.eyJ1IjoidGltYWExMjMiLCJhIjoiY2t4MXNmZzVtMDEwNDJvbnhyNHByZWlzdyJ9.oMtL_4Qj7bSnF-pxB2AZ7g';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(30.3168);
    const [lat, setLat] = useState(59.9389);
    const [address, setAddress] = useState("");
    const [zoom, setZoom] = useState(16.00);
    const [adr1, setAdr1] = useState("");
    const [adr2, setAdr2] = useState("");
    const [userLat2, setUserLat2] = useState();
    const [userLng2, setUserLng2] = useState();
    const dispatch = useDispatch()
    const isMapShown = useSelector((state) => state.app.isMapShown)

    const userLat = useSelector((state) => state.app.userLat)

    const userLng = useSelector((state) => state.app.userLng)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
    })

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    useEffect(() => {
        navigator.permissions &&
            navigator.permissions
                .query({ name: 'geolocation' })
                .then(function (PermissionStatus) {
                    if ('denied' === PermissionStatus.state) {
                        map.current = new mapboxgl.Map({
                            container: mapContainer.current,
                            style: 'mapbox://styles/mapbox/dark-v10',
                            center: [30.3609, 59.9311],
                            zoom: 16,
                        });
                    } else {
                        if (map.current) return;
                        try {
                            navigator.geolocation.getCurrentPosition(success, error, options);
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                });
    }, []);

    function success(pos) {
        const crd = pos.coords;
        console.log('Ваше текущее местоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);
        dispatch(setUserLat(crd.latitude));
        dispatch(setUserLng(crd.longitude));
        setUserLat2(crd.latitude);
        setUserLng2(crd.longitude);
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [crd.longitude, crd.latitude],
                zoom: zoom,
            });
        }
    }

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    useEffect(() => {
        if (map.current) {
            map.current.flyTo({ center: [userLng, userLat] });
        }
    }, [userLng2, userLat2, isMapShown])

    useEffect(() => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setAdr1(data.features[0]?.place_name ?? "")
                setAdr2(data.features[0]?.address ?? "")
                if (!adr1 && !adr2) {
                    setAddress("can not define")
                }
                setAddress(adr1)
            });
    }, [lat, lng])


    return (
        <div>
            <div ref={mapContainer} className={styles.mapContainer}>
                <button className={styles.closeMapButton} onClick={() => { dispatch(hideMap()) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M9.37112 7.17407L14.6085 2.1643C14.857 1.92696 14.9969 1.60489 14.9972 1.26894C14.9975 0.932989 14.8583 0.61068 14.6101 0.372918C14.362 0.135156 14.0253 0.00141557 13.6741 0.00111888C13.3229 0.000822195 12.9859 0.133993 12.7374 0.371336L7.5 5.3811L2.26263 0.371336C2.01407 0.133574 1.67694 0 1.32542 0C0.973897 0 0.636771 0.133574 0.388207 0.371336C0.139642 0.609098 0 0.931574 0 1.26782C0 1.60407 0.139642 1.92654 0.388207 2.1643L5.62557 7.17407L0.388207 12.1838C0.139642 12.4216 0 12.7441 0 13.0803C0 13.4166 0.139642 13.739 0.388207 13.9768C0.636771 14.2146 0.973897 14.3481 1.32542 14.3481C1.67694 14.3481 2.01407 14.2146 2.26263 13.9768L7.5 8.96704L12.7374 13.9768C12.9859 14.2146 13.3231 14.3481 13.6746 14.3481C14.0261 14.3481 14.3632 14.2146 14.6118 13.9768C14.8604 13.739 15 13.4166 15 13.0803C15 12.7441 14.8604 12.4216 14.6118 12.1838L9.37112 7.17407Z" fill="black" fillOpacity="0.3" />
                    </svg>
                </button>
                <button onClick={() => { dispatch(setUserAddress(adr1)); dispatch(hideMap()) }} className={styles.acceptAddress}><svg xmlns="http://www.w3.org/2000/svg" width="353" height="289" viewBox="0 0 353 289" fill="none">
                    <path d="M336.698 16.4331L112.698 272.433L16.6982 176.433" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <div className={styles.mapPinContainer}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="41" viewBox="0 0 18 41" fill="none">
                            <path d="M17.4375 7.06246C17.4374 5.7912 16.9843 4.54605 16.131 3.47164C15.2776 2.39723 14.059 1.53765 12.6166 0.992745C11.1742 0.447839 9.5673 0.239969 7.98248 0.393277C6.39766 0.546586 4.89998 1.05478 3.6634 1.85884C2.42682 2.6629 1.50208 3.72981 0.996602 4.93567C0.49112 6.14153 0.425637 7.43684 0.807759 8.67115C1.18988 9.90546 2.00392 11.0281 3.15534 11.9087C4.30675 12.7893 5.74829 13.3917 7.3125 13.646V37.4279C7.31269 37.7849 7.40196 38.1383 7.57512 38.4676L8.63719 40.4832C8.67278 40.5351 8.72525 40.5784 8.78908 40.6085C8.85292 40.6387 8.92578 40.6546 9 40.6546C9.07422 40.6546 9.14708 40.6387 9.21092 40.6085C9.27476 40.5784 9.32722 40.5351 9.36281 40.4832L10.4249 38.4676C10.598 38.1383 10.6873 37.7849 10.6875 37.4279V13.646C12.5919 13.3344 14.3032 12.5094 15.5328 11.3101C16.7624 10.1108 17.4351 8.61065 17.4375 7.06246ZM11.5313 7.06246C11.0306 7.06246 10.5412 6.94425 10.125 6.72277C9.7087 6.50129 9.38427 6.18649 9.19268 5.81818C9.0011 5.44988 8.95097 5.0446 9.04864 4.65361C9.14631 4.26261 9.38739 3.90346 9.74139 3.62157C10.0954 3.33968 10.5464 3.14771 11.0374 3.06994C11.5284 2.99217 12.0374 3.03208 12.4999 3.18464C12.9624 3.3372 13.3578 3.59555 13.6359 3.92701C13.914 4.25848 14.0625 4.64818 14.0625 5.04684C14.0625 5.58141 13.7958 6.0941 13.3211 6.4721C12.8464 6.8501 12.2026 7.06246 11.5313 7.06246Z" fill="black" />
                        </svg>
                    </div>
                </div>
                <div className={styles.sidebar}>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | {address}
                </div>
            </div>
        </div>
    );
}
