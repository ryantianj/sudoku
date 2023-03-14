const { createWorker } = require('tesseract.js');




const driver = async (image, croppedAreaPixels) => {
    const width = croppedAreaPixels.width
    const height = croppedAreaPixels.height

    const rectangles = []
    for (let i = 0; i < 9; i++) {
        const row = []
        for (let j = 0; j < 9; j++) {
            row.push({
                left: j * width / 9,
                top: i * height / 9,
                width: width / 9,
                height: height / 9
            })
        }
        rectangles.push(row)
    }

    const worker = await createWorker();
    const doOCR = async () => {
        console.log("OCR") // TODO: make parallel
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            tessedit_char_whitelist: '123456789',
        });
        const values = []
        for (let i = 0; i < 9; i++) {
            const row = []
            for (let j = 0; j < 9; j++) {
                const { data: { text } } = await worker.recognize(image, {rectangle: rectangles[i][j]});
                row.push(text)
            }
            values.push(row)
        }
        // const { data: { text } } = await worker.recognize(image);
        // console.log(text)
        return values
    };
    return await doOCR()
}

export default driver