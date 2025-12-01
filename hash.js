const fingerprintEmail = (value = "") => {
  const normalized = value.trim().toLowerCase();
  let hash = 2166136261;
  for (const ch of normalized) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
};

console.log(fingerprintEmail("appdostofficial@gmail.com"));
