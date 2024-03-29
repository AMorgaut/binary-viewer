# binary-viewer
[![CodeQL](https://github.com/AMorgaut/binary-viewer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AMorgaut/binary-viewer/actions/workflows/codeql-analysis.yml)

Allow to display binary content using hex-editor like interface

![image](https://user-images.githubusercontent.com/49318/140663548-87d637eb-f6fd-4228-99ce-e216e0f1c325.png)

## Usage

### Example with a fetched response
```html
<!DOCTYPE html>
<html>
  <body>
  </body>
</html>
```

```javascript 
const content = await (await fetch(dataApiUrl)).blob(); 
const viewer = new HexaViewer('my-viewer', { content });
document.body.append(viewer.table);
```

### Example with an HTML5 file `<input>`
```html
<!DOCTYPE html>
<html>
  <body>
    <input type="file" id=myFile>
    <hr>
  </body>
</html>
```

```javascript 
var viewer;

myFile.addEventListener('change', function (event) {

  if (!viewer) {
    viewer = new HexaViewer('my-viewer');
    document.body.append(viewer.table);
  }

  const [file] = event.target.files;
  if (!file) return;

  viewer.reset();
  viewer.load(file);    

});
```


## HexaViewer API Doc
**Kind**: global class  

* [HexaViewer](#HexaViewer)
        
    * [new HexaViewer(id, [options])](#new_HexaViewer_new)
    * _instance_
        * [.load([content], [base64], [mime])](#HexaViewer+load) ⇒ <code>Promise</code>
        * [.reset()](#HexaViewer+reset)
    * _static_
        * [.TABLE_STYLE](#HexaViewer+TABLE_STYLE) : <code>object</code>
        * [.bytesToHexa(byte)](#HexaViewer.bytesToHexa) ⇒ <code>string</code>
        * [.bytesToAscii(byte)](#HexaViewer.bytesToAscii) ⇒ <code>string</code>

<a name="new_HexaViewer_new"></a>

### new HexaViewer(id, [options])

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Viewer DOM id, to ease CSS styling |
| [options] | <code>object</code> | Optional properties |
| [options.style] | <code>object</code> | Default to `{fontFamily: 'Source Code Pro,Menlo,Consolas,PT Mono,Liberation Mono,monospace', fontSize: 14, lineHeight: 20, whiteSpace: 'pre'}` |
| [options.content] | <code>File</code> \| <code>Blob</code> \| <code>string</code> | binary content to display, may be a base64 encoded string |
| [options.base64] | <code>boolean</code> | flag to declare the content as base64 encoded |
| [options.mime] | <code>string</code> | Binary content media type. default to `application/octet-stream` |

<a name="HexaViewer+load"></a>

### hexaViewer.load([content], [base64], [mime]) ⇒ <code>Promise</code>
Load the binary content and build the Viewer table

**Kind**: instance method of [<code>HexaViewer</code>](#HexaViewer)  

| Param | Type | Description |
| --- | --- | --- |
| [content] | <code>Blob</code> \| <code>string</code> | binary content to display, may be a base64 encoded string |
| [base64] | <code>boolean</code> | flag to declare the content as base64 encoded |
| [mime] | <code>string</code> | Binary content media type. default to application/octet-stream |
 
<a name="HexaViewer+reset"></a>

### hexaViewer.reset()
Clear the viewer table

**Kind**: instance method of [<code>HexaViewer</code>](#HexaViewer)  
<a name="HexaViewer+TABLE_STYLE"></a>

### hexaViewer.TABLE\_STYLE : <code>object</code>
Table style used by default by the constructor

Default to `{fontFamily: 'Source Code Pro,Menlo,Consolas,PT Mono,Liberation Mono,monospace', fontSize: 14, lineHeight: 20, whiteSpace: 'pre'}`
<a name="HexaViewer.bytesToHexa"></a>

### HexaViewer.bytesToHexa(byte) ⇒ <code>string</code>
**Kind**: static method of [<code>HexaViewer</code>](#HexaViewer)  

| Param | Type |
| --- | --- |
| byte | <code>number</code> | 

<a name="HexaViewer.bytesToAscii"></a>

### HexaViewer.bytesToAscii(byte) ⇒ <code>string</code>
**Kind**: static method of [<code>HexaViewer</code>](#HexaViewer)  

| Param | Type |
| --- | --- |
| byte | <code>number</code> | 



## License

MIT
