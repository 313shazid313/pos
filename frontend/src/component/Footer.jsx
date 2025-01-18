

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        padding: "1rem 0",
        borderTop: "1px solid #dee2e6",
      }}
    >
      <p style={{ margin: 0, color: "#6c757d", fontSize: "0.875rem" }}>
        Made with <span style={{ color: "#e25555", fontSize: "1rem" }}>❤️</span>{" "}
        by{" "}
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontWeight: "bold",
          }}
        >
          Shazid
        </a>
      </p>
    </footer>
  );
};

export default Footer;
