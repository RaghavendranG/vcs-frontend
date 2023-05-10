import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import DashBoard from "./DashBoard";
import "../styles/cssFiles/EditFile.css";
function EditFile() {
  const [dataToEdit, setDataToEdit] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    retriveData();
  }, []);
  const retriveData = async () => {
    try {
      const res = await fetch(`https://vcs-backend.vercel.app/${id}`, {
        method: "GET",
      });
      const response = await res.json();
      if (response) {
        setDataToEdit(response.file);
      }
    } catch (error) {
      console.log(error);
      swal("error retriving data");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(`https://vcs-backend.vercel.app/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({ file: dataToEdit, commitedby: "User" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      swal("SuccessFully Updated");
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      swal("error updating data");
    }
  };

  return (
    <DashBoard>
      <div className="container-lg">
        <h4>Edit Your Code :</h4>
        <form className="row" onSubmit={(event) => handleSubmit(event)}>
          <textarea
            className="col-lg-10 inputBar form-control"
            value={dataToEdit}
            onChange={(event) => setDataToEdit(event.target.value)}
          />
          <button className="col-lg-3 btn btn-success mt-3" type="submit">
            Update
          </button>
        </form>
      </div>
    </DashBoard>
  );
}
export default EditFile;
