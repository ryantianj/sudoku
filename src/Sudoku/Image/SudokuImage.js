import React, {useContext, useState} from "react";
import "./SudokuImage.css"
import Cropper from "react-easy-crop";
import getCroppedImg from "./Logic/cropImage";
import driver from "./Logic/scanImage";
import SudokuContext from "../SudokuContext";

const SudokuImage = ({setTab, setLoading}) => {
    const boardCtx = useContext(SudokuContext)
    const [crop, setCrop] = useState({x:0, y:0})
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState(null)
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [loading, isLoading] = useState(false)

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const handleClick = async () => {
        setLoading(true)
        isLoading(true)
        const croppedImage = await getCroppedImg(image, croppedArea)
        const values = await driver(croppedImage, croppedArea)
        // set board context here
        setTab(1)
        boardCtx.clearBoard()
        boardCtx.setFullBoard(values, false)
        isLoading(false)
        setLoading(false)
    }

    return (
        <div className="imageWrapper">
            <input type="file" accept="image/*" onChange={onSelectFile}/>
            <div className="cropperWrapper">
                {loading && <p>Processing Image...</p>}
                <Cropper
                    image={image}
                    zoom={zoom}
                    onZoomChange={setZoom}
                    aspect={1}
                    onCropChange={setCrop}
                    crop={crop}
                    onCropComplete={onCropComplete}
                />
            </div>
            <button onClick={handleClick} disabled={loading} className="imageButtons">
                Done
            </button>
        </div>
    )
}
export default SudokuImage
