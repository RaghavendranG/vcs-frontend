import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function DashBoard({ title, description, children }) {
  const navigate = useNavigate();

  const logoutMethod = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("AuthToken");
    swal("Logged Out");
    navigate("/");
  };

  return (
    <div className="main-component base-component">
      <AppBar position="static" style={{ background: "#000000" }}>
        <Toolbar variant="dense">
          <Button color="inherit" onClick={() => navigate("/homepage")}>
            <span className="nav-name">Home</span>
          </Button>
          <Button color="inherit" onClick={() => navigate("/create")}>
            <span className="nav-name">New Repository</span>
          </Button>

          <Button color="inherit" onClick={logoutMethod}>
            <span className="nav-name">Logout</span>
          </Button>
          <h1 className="title">CodeHub</h1>
        </Toolbar>
      </AppBar>
      <main className="main-segment">
        <h2 className="description">{description}</h2>

        <div>{children}</div>
        <br />
      </main>
    </div>
  );
}

export default DashBoard;
