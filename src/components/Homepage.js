import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./All.css";
import DashBoard from "./DashBoard";
const HomePage = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");
  const [createdby, setcreatedby] = useState("sample mw");
  const [commitedby, setCommitedby] = useState("sample mw");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!(localStorage.getItem("AuthToken"))){
      navigate("/")
      swal("Login to Continue")
    }
    retriveAllData();
  }, []);

  const retriveAllData = async () => {
    try {
      const res = await fetch("https://vcs-backend.vercel.app/all/", {
        method: "GET",
      });
      const response = await res.json();
      setAllRepositories(response);
    } catch (error) {
      console.log(error);
      swal({title:"error retriving data",dangerMode:true});
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://vcs-backend.vercel.app/remove/${id}`, {
        method: "DELETE",
      });
      swal("SuceessFully Removed");
      retriveAllData();
    } catch (error) {
      console.log(error);
      swal({title:"error removing data",dangerMode:true});
    }
  };

  const handleMove = async (id) => {
    try {
      const res = await fetch(`https://vcs-backend.vercel.app/previous/${id}`, {
        method: "PUT",
      });
      retriveAllData();
      const responseReceieved = await res.json();
      swal({title:responseReceieved.response,dangerMode:true});
    } catch (error) {
      console.log(error);
      swal("error reverting data");
    }
  };

  return (
    <DashBoard 
      description = "Repository List"
    >
    <div className="container-xl">
      <div className="row">
        {allRepositories.map((value, index) => {
           var responseTime =value.createdat
           var time = new Date(responseTime)
           var localTime =(new Date(time.getTime() + ( time.getTimezoneOffset() * 60000 ))).toString()
          return (
            <div
              className="col-lg-5 card box text-center "
              key={index}
              style={{ backgroundColor: "whitesmoke" }}
            >
              <h4 className="heading">
                <b>{value.repositoryName}</b>
              </h4>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  createdBy :{" "}
                  <u>
                    <i>
                      <b>{value.createdby}</b>
                    </i>
                  </u>
                </h6>
                <h6 className="card-subtitle mb-2 text-muted ">
                  createdAt :{" "}
                  <u>
                    <i>
                      <b>{localTime}</b>
                    </i>
                  </u>
                </h6>
                <p className="card-text">{value.file}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(`/editFile/${value._id}`)}
                >
                  Edit
                </button>                
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => navigate(`/commits/${value._id}`)}
                >
                  View Commit History
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(value._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
          );
        })}
      </div>
    </div>
    </DashBoard>
  );
};
export default HomePage;