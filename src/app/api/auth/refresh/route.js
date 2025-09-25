let isRefreshing = false;
let refreshPromise = null;

const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = fetch("/api/refresh", { method: "POST" })
        .then((refreshRes) => {
          if (!refreshRes.ok) throw new Error("Refresh failed");
          return refreshRes.json();
        })
        .then(({ accessToken: newToken }) => {
          localStorage.setItem("accessToken", newToken);
          return newToken;
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          window.location.href = "/login"; // force logout
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    const newToken = await refreshPromise;

    // retry original request with new token
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res.json();
};
