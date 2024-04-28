function find_paginated(page, limit) {
  page = Math.abs(parseInt(page)) || 1;
  limit = Math.abs(parseInt(limit)) || 10;

  limit = limit > 50 ? 50 : limit;
  page = page >= 1 ? page - 1 : 0;

  const offset = page * limit;

  return { limit, offset, page };
}

module.exports = {
  find_paginated,
};
