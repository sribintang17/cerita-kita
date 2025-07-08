const getActiveRoute = () => {
  const hash = window.location.hash.toLowerCase(); 
  if (!hash || hash === '#') {
    return '/';
  }
  return hash.slice(1); 
};

const createUrlWithId = (urlTemplate, id) => {
  return urlTemplate.replace(':id', id);
};

const parseActiveUrlWithId = () => {
  const activeUrl = getActiveRoute(); 
  const segments = activeUrl.split('/').filter(Boolean); 

  return {
    resource: segments[0] || null,
    id: segments[1] || null,
  };
};

export { getActiveRoute, createUrlWithId, parseActiveUrlWithId };
