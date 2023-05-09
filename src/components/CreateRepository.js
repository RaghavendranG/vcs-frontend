import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DashBoard from "./DashBoard";
import "./cssFiles/CreateRepository.css";

const CreateRepository = () => {
  const [file, setFile] = useState();
  const [repositoryName, setRepositoryName] = useState("");

  const [allRepositories, setAllRepositories] = useState([]);
  const navigate = useNavigate();
  const resetForm = () => {
    setFile("");
    setRepositoryName("");
    swal("Repository successfully created");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://vcs-backend.vercel.app/createRepo", {
        method: "POST",
        body: JSON.stringify({
          repositoryName,
          createdby: localStorage.getItem("userName"),
          file,
          commitedby: localStorage.getItem("userName"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      navigate("/homepage");
      resetForm();
    } catch (error) {
      console.log(error);
      swal("Error occured");
    }
  };
  return (
    <DashBoard>
      <div className="createRepo">
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>Create a New Repository</h1>
          <div className="input-group mb-3 inputBox">
            <div className="input-group-prepend inputBox">
              <span className="input-group-text" id="basic-addon1">
                <h5>Repository Name :</h5>
              </span>
            </div>
            <input
              type="text"
              className="form-control "
              placeholder="Repository Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={repositoryName}
              onChange={(event) => setRepositoryName(event.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend inputBox">
              <span className="input-group-text">
                <h5>Code :</h5>
              </span>
            </div>
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="Code Goes Here..."
              value={file}
              onChange={(event) => setFile(event.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-success" type="submit">
            Add Repository
          </button>
        </form>
      </div>
    </DashBoard>
  );
};
export default CreateRepository;
