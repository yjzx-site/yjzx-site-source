/**
 * 
 * @typedef {Object} ResolvedMap
 * @param {ObjectURL} wall - 墙壁图片的引用，下同
 * @param {ObjectURL} floor
 * @param {ObjectURL} start
 * @param {ObjectURL} end
 * @param {Array<String>} maps - 每个 map 文件的内容的字符串，包括换行（最后文件尾也有换行）
 */

/**
 * 
 * @param {File} zipFile 
 * @returns {ResolvedMap}
 */
async function resolveFileToObject(zipFile) {
    /** waiting for further update */

    const zip = await JSZip.loadAsync(zipFile) // 1) read the Blob

    const assetsName = ['wall', 'floor', 'start', 'end'];
    let assetsObjectURLs = {};

    for (let i = 0; i < assetsName.length; i++) {
        const asset = assetsName[i];

        const assetBlob = await zip.file(`${asset}.png`).async('blob');
        assetsObjectURLs[asset] = URL.createObjectURL(assetBlob);
    }

    const mapReg = /^mp\d.txt$/;
    const maps = zip.file(mapReg);

    let mapContents = [];

    for (let i = 0; i < maps.length; i++) {
        const map = maps[i];

        const content = await map.async("string");
        mapContents.push(content);
    }

    /**@type {ResolvedMap} */
    let returnObject = assetsObjectURLs;
    returnObject.maps = mapContents;

    return returnObject;
}
