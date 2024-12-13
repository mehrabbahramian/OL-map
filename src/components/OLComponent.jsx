import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
import {fromLonLat} from "ol/proj"
import { useEffect } from "react";
import { useRef } from "react";
import { Layer } from "iconsax-react";
import "./OLComponent.css"
import { useState } from "react";

function OLComponent() {
    const mapRef = useRef(null);

    const wmsLayers = [
        new TileLayer({
            name: "ostan",
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
            visible: true
        }),
        new TileLayer({
            name : "states",
            source : new TileWMS({
                url:"http://localhost:8585/geoserver/topp/wms",
                params: {
                    LAYERS: "topp:states",
                    TILED: true,
                    FORMAT: "image/png"
                },
                serverType: "geoserver",
                crossOrigin: "ananymous"
            }),
            visible: true
        })
    ]
    useEffect(()=>{
        if(!mapRef.current) return;

        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
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

    const ToggleLayerSwitch = (layer)=>{
        const newVisibility = !layer.get("visible");
        layer.setVisible(newVisibility);
    }

    return (
        <>
        <div className="layer-switcher">
            <Layer size="28" color="#FF8A65"/>
            <div className="layer-switcher__content">
                {wmsLayers.length > 0 && (
                    wmsLayers.map((lyr, index)=>{
                        return(
                            <div key={index}>
                                <label style={{color: "black"}}>
                                    <input 
                                        type={"checkbox"}
                                        id={lyr.get("name")}
                                        onChange = {()=> ToggleLayerSwitch(lyr)}
                                    />
                                    {lyr.get("name")}
                                </label>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
        <div ref={mapRef} style={{width: "100%", height: "100vh"}} tabIndex={0}></div>
        </>
    );
}

export default OLComponent;