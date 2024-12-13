import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
import {fromLonLat} from "ol/proj"
import { useEffect } from "react";
import { useRef } from "react";
import { Layer } from "iconsax-react";
import "./OLComponent.css"

function OLComponent() {
    const mapRef = useRef(null);

    useEffect(()=>{
        if(!mapRef.current) return;

        const wmsLayers = [
            new TileLayer({
                source: new OSM()
            }),
            new TileLayer({
                source: new TileWMS({
                    url : "http://localhost:8585/geoserver/webgis/wms",
                    params: {
                        LAYERS: "webgis:ostan",
                        TILED: true,
                        FORMAT: "image/png"
                    },
                    serverType: "geoserver",
                    crossOrigin: "ananymous"
                }),
            }),
            new TileLayer({
                source : new TileWMS({
                    url:"http://localhost:8585/geoserver/topp/wms",
                    params: {
                        LAYERS: "topp:states",
                        TILED: true,
                        FORMAT: "image/png"
                    },
                    serverType: "geoserver",
                    crossOrigin: "ananymous"
                }) 
            })
        ]

        const map = new Map({
            target: mapRef.current,
            view: new View({
                center: fromLonLat([51.389, 35.6892]),
                zoom: 5
            })
        })

        wmsLayers.forEach((lyr)=>{
            map.addLayer(lyr)
        })

        return () => {
            map.setTarget(null);
        }
    }, [])

    return (
        <>
        <div className="layer-switcher">
            <Layer size="28" color="#FF8A65"/>
            <div className="layer-switcher__content" />
        </div>
        <div ref={mapRef} style={{width: "100%", height: "100vh"}} tabIndex={0}></div>
        </>
    );
}

export default OLComponent;