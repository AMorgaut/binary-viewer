# binary-viewer
Allow to display binary content using hex-editor like interface

## Usage

```javascript
const viewer = new HexaViewer('my-viewer');
document.body.append(viewer);

// anytime we want to display a new content
viewer.reset();
viewer.load(someBlobOrBase64);
```

## Lisence

MIT
