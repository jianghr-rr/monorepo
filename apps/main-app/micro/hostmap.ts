const hostMapping = {
  '//localhost:4001/': '//localhost:4000/knowledge/',
};

export default function hostMap(host: keyof typeof hostMapping): string {
  if (process.env.NODE_ENV === 'production') return hostMapping[host];
  return host;
}
