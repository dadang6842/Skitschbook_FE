import { Alert } from "react-bootstrap";

function AlertBox({ children }) {
  return (
    <Alert
      key="secondary"
      variant="secondary"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
      }}
    >
      {children}
    </Alert>
  );
}

export default AlertBox;
