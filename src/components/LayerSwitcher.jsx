import {Layer} from "iconsax-react"

function LayerSwitcher({layers, visibility, onToggleVisibility}) {

    return (
        <div className="layer-switcher">
            <Layer size="28" color="#FF8A65"/>
            <div className="layer-switcher__content" >
                {
                    layers.map((lyr, index)=>{
                        return(
                            <div key={index}>
                                <label>
                                    <input 
                                        type={"checkbox"}
                                        checked={visibility[index]}
                                        onChange={()=>onToggleVisibility(index)}
                                    />
                                    {lyr.get("title") || `Layer ${index + 1}`}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default LayerSwitcher;