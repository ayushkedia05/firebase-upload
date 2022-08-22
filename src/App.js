import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [name,setname]=useState([]);

  const predict=()=>{
    const getdata=axios.post('http://localhost:3001/',name);
    console.log(getdata);
    console.log('hgh')
  };




  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    let vid=`${imageUpload.name + v4()}`
    const imageRef = ref(storage, `images/${vid}`);
    console.log(vid);
    setname(vid);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {/* {imageUrls.map((url) => {
        return <img src={url} />;
      })} */}


      <button onClick={predict}>predict</button>
    </div>
  );
}

export default App;
