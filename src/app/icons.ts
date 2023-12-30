const icons = [48, 72, 96, 128, 192, 256, 384, 512].flatMap((size) => [
  {
    contentType: 'image/png',
    size,
    maskable: false,
    id: String(size),
  },
  {
    contentType: 'image/png',
    size,
    id: size + '-maskable',
    maskable: true,
  },
]);

export { icons };
