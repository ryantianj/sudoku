import React, {useContext, useState} from "react";
import "./SudokuImage.css"
import Cropper from "react-easy-crop";
import getCroppedImg from "./Logic/cropImage";
import driver from "./Logic/scanImage";
import SudokuContext from "../SudokuContext";

const SudokuImage = ({setTab}) => {
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
        isLoading(true)
        const croppedImage = await getCroppedImg(image, croppedArea)
        const values = await driver(croppedImage, croppedArea)
        console.log(values)
        // set board context here
        boardCtx.setFullBoard(values)
        isLoading(false)
        setTab(1)
    }

    const cleanResults = (array) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

            }
        }
    }


    return (
        <div className="imageWrapper">
            <input type="file" accept="image/*" onChange={onSelectFile}/>
            <div className="cropperWrapper">
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
            <button onClick={handleClick} disabled={loading}>
                done
            </button>
        </div>
    )
}
export default SudokuImage
