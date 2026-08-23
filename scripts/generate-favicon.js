const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPng(width, height, renderPixel) {
  const rowSize = 1 + width * 4;
  const buffer = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    buffer[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = renderPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      buffer[pxOffset] = r;
      buffer[pxOffset + 1] = g;
      buffer[pxOffset + 2] = b;
      buffer[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(buffer);

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT Chunk
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(8 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);

  const crcBuf = Buffer.concat([Buffer.from(type), data]);
  const crc = crc32(crcBuf);
  chunk.writeUInt32BE(crc, 8 + length);
  return chunk;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ -1) >>> 0;
}

function renderPixel(x, y, w, h) {
  const radius = w * 0.22;
  let inBox = true;

  if (x < radius && y < radius) {
    if ((x - radius) ** 2 + (y - radius) ** 2 > radius ** 2) inBox = false;
  } else if (x > w - radius && y < radius) {
    if ((x - (w - radius)) ** 2 + (y - radius) ** 2 > radius ** 2) inBox = false;
  } else if (x < radius && y > h - radius) {
    if ((x - radius) ** 2 + (y - (h - radius)) ** 2 > radius ** 2) inBox = false;
  } else if (x > w - radius && y > h - radius) {
    if ((x - (w - radius)) ** 2 + (y - (h - radius)) ** 2 > radius ** 2) inBox = false;
  }

  if (!inBox) return [0, 0, 0, 0];

  const pad = w * 0.15;
  const nx = (x - pad) / (w - 2 * pad);
  const ny = (y - pad) / (h - 2 * pad);

  let isWhite = false;

  if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
    const shieldWidth = 0.08;
    let shieldDist = 1.0;
    
    if (ny >= 0.15 && ny <= 0.25 && nx >= 0.15 && nx <= 0.85) {
      shieldDist = Math.abs(ny - 0.18);
    }
    if (ny >= 0.18 && ny <= 0.55) {
      if (Math.abs(nx - 0.15) < shieldDist) shieldDist = Math.abs(nx - 0.15);
      if (Math.abs(nx - 0.85) < shieldDist) shieldDist = Math.abs(nx - 0.85);
    }
    if (ny > 0.55 && ny <= 0.9) {
      const progress = (ny - 0.55) / 0.35;
      const targetLeft = 0.15 + 0.35 * progress;
      const targetRight = 0.85 - 0.35 * progress;
      if (Math.abs(nx - targetLeft) < shieldDist) shieldDist = Math.abs(nx - targetLeft);
      if (Math.abs(nx - targetRight) < shieldDist) shieldDist = Math.abs(nx - targetRight);
    }

    if (shieldDist <= shieldWidth / 2) {
      isWhite = true;
    }

    const checkWidth = 0.09;
    const d1 = distToSegment(nx, ny, 0.32, 0.5, 0.45, 0.65);
    const d2 = distToSegment(nx, ny, 0.45, 0.65, 0.7, 0.38);

    if (d1 <= checkWidth / 2 || d2 <= checkWidth / 2) {
      isWhite = true;
    }
  }

  if (isWhite) {
    return [255, 255, 255, 255];
  }

  return [215, 24, 31, 255];
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

const png32 = createPng(32, 32, renderPixel);
const png64 = createPng(64, 64, renderPixel);

const appDir = path.join(__dirname, '..', 'app');
const publicDir = path.join(__dirname, '..', 'public');

fs.writeFileSync(path.join(appDir, 'icon.png'), png64);
fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png64);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), png32);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), png32);
fs.writeFileSync(path.join(publicDir, 'icon.png'), png64);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png64);

console.log('Successfully generated icon.png, apple-icon.png, and favicon.ico in app/ and public/!');
