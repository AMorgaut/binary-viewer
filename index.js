
class HexaViewer {

    /**
     * @param {string} id Viewer DOM id, to ease CSS styling
     * @param {File|Blob|string} [content] binary content to display, may be a base64 encoded string
     * @param {boolean} [base64] flag to declare the content as base64 encoded
     * @param {string} [mime] Binary content media type. default to application/octet-stream
     **/
    constructor(id, content, base64, mime) {
        this.table = Object.assign(document.createElement('TABLE'), {
            id,
            style, {
                fontFamily: 'Source Code Pro,Menlo,Consolas,PT Mono,Liberation Mono,monospace',
                fontSize: 14,
                lineHeight: 20,
                whiteSpace: 'pre'
            }
        );
        this.table.setAttribute('class', 'hexa-viewer');
        this.table.addEventListener('click', ({ target }) => this.focus(target.dataset && target.dataset.offset));
        if (content) {
            this.load(content, base64, mime);
        }
    }

    /**
     * Load the binary content and build the Viewer table
     *
     * @param {Blob|string} [content] binary content to display, may be a base64 encoded string
     * @param {boolean} [base64] flag to declare the content as base64 encoded
     * @param {string} [mime] Binary content media type. default to application/octet-stream
     * @return {Promise}
     **/
    async load(rawData, base64, mime = 'application/octet-stream') {
        const blob = base64
            ? await (await fetch(`data:${mime};base64,${rawData}`)).blob()
            : rawData;
        const fileReader = new FileReader();
        fileReader.addEventListener(
            'load',
            loadedEvent => this.fillTable(loadedEvent.target.result)
        );
        fileReader.readAsBinaryString(blob);
    }

    /**
     * Focus an offset content (both the Hexa and ASCII cells are focused)
     **/
    focus() {
        // TODO
    }

    /**
     * Clear the viewer table
     **/
    reset() {
        this.table.innerHTML = '';
    }

    // ====================================== PRIVATE API ====================================== //

    /**
     * @private
     * @param {string} data
     */
    fillTable(data) {
        const hexaLine = [];
        const asciiLine = [];
        let currentLine;
        for (let offset = 0, size = data.length; offset < size; offset += 1) {
            const newLine = !(offset % 16);
            if (newLine) {
                if (currentLine) {
                    currentLine.append(...hexaLine, ...asciiLine);
                    this.table.append(currentLine);
                    hexaLine.length = 0;
                    asciiLine.length = 0;
                }
                currentLine = this.createLine(offset.toString(16).padStart(8, '0'));
            }
            const byte = data.charCodeAt(offset);
            hexaLine.push(this.createByteCell(offset, byte));
            asciiLine.push(this.createByteCell(offset, byte, true));
        }
    }

    /**
     * @private
     * @param {string} address
     * @return {HTMLTableRowElement}
     */
    createLine(address) {
        const addressCol = document.createElement('TH');
        addressCol.append(address);
        const line = document.createElement('TR');
        line.id = `${this.table.id}-row-${address}`;
        line.append(addressCol);
        return line;
    }

    /**
     * @private
     * @param {number} offset
     * @param {number} byte
     * @param {boolean} [ascii]
     * @return {HTMLTableCellElement}
     */
    createByteCell(offset, byte, ascii = false) {
        const byteCol = document.createElement('TD');
        byteCol.setAttribute('data-offset', String(offset));
        const format = ascii ? HexaViewer.bytesToAscii : HexaViewer.bytesToHexa;
        byteCol.append(format(byte));
        return byteCol;
    }


    /**
     * @param {number} byte
     * @return {string}
     */
    static bytesToHexa(byte) {
        return byte.toString(16).padStart(2, '0');
    }

    /**
     * @param {number} byte
     * @return {string}
     */
    static bytesToAscii(byte) {
        // use '.' for "Non Printable" characters & Non Visible characters (exception for the SPACE)
        // see https://web.itu.edu.tr/sgunduz/courses/mikroisl/ascii.html
        return (byte < 32 || byte === 127 || byte === 160 || byte === 173)
            ? '.'
            : String.fromCharCode(byte);
    }
}
