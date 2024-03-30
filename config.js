const SERVER_ROOT_PATH =
  window.location.hostname === "localhost"
    ? "http://localhost:6300"
    : "https://elysium-231i.onrender.com";

export default SERVER_ROOT_PATH;
