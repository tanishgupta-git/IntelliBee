import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './addEditArticle.css';

const AddEditArticle = ({history,match,user}) => {

    const [title,Settitle] = useState('');
    const [image,Setimage] = useState('');
    const [imagename,Setimagename] = useState('')
    const [description,Setdescription] = useState('');
    const [editImageUrl,SeteditImageUrl] = useState('')
    const [error,Seterror] = useState('');
    const types = ['image/png','image/jpeg','image/jpg'];
    // run when the edit and article id is present
    useEffect(() => {
      if (match.params.articleId) {
      axios.get(`http://localhost:8080/articles/article/${match.params.articleId}`,{
         headers : 
         {
             Authorization : 'Bearer ' + user.token         
           } 
      }).then( (res) => {
        Settitle(res.data.article.title);
        SeteditImageUrl(res.data.article.imageUrl);
        Setdescription(res.data.article.content);
      }).catch((err) => {
        Seterror("Error From Server");
      })
    }
     },[user,match.params.articleId])
    // function for handling the chnages in image
   const handleChange = (e) => {
    let selected = e.target.files[0];
    if(selected && types.includes(selected.type)){
        if((selected.size / 1000000) > 2) {
            Setimage(null);
            Seterror('Image file should be less than 2MB'); 
            return;  
        }
        Setimagename(selected.name);
        Setimage(selected);
        Seterror('');
    }else{
        Setimage(null);
        Seterror('Please select an image of type png,jpeg,jpg'); 
    }
 }
 // function for handling the form
const handleForm = (e) => {
    e.preventDefault();
    if(!title  && !description) {
        Seterror('All Fields Are Required')
        return;
    }
    if(title.length < 5){
      Seterror('Title Should Be Between 5 and 50 Characters');
      return;
    }
    if(description.length <= 20){
      Seterror('Description Should Be Greater Than 20 Characters');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content',description);
    if(match.params.articleId) {
      if (!image) {
        formData.append('image', editImageUrl);
      }else{
        formData.append('image', image);
      }
      axios.put(`http://localhost:8080/articles/article/${match.params.articleId}`,formData,{
        headers : {
          Authorization : 'Bearer ' + user.token         
        }
      }).then( resData => {
          history.push('/dashboard');
        }
      ).catch(err => {
        console.log(err);
        Seterror('Error From Server');
      })

    }else{
      formData.append('image', image);
      axios.post('http://localhost:8080/articles/article',formData,{
        headers : {
          Authorization : 'Bearer ' + user.token         
        }
      }).then( resData => {
          history.push('/');
        }
      ).catch(err => {
        console.log(err);
        Seterror('Error From Server');
      })

  }
  }
    return (
        <div className='add-edit-article'>
         <span className='add-edit-error'>{error}</span>
         <form className='add-edit-form' onSubmit={handleForm}>
             <div className='add-edit-input'>
               <p>Title:</p>
               <input type="text" value={title} onChange={(e) => { Settitle(e.target.value)}}/>
             </div>
             <div className='add-edit-input'>
               <p>Description:</p>
               <textarea rows="8" value={description} onChange={(e) => { Setdescription(e.target.value)}}>
               </textarea>
             </div>
             <div className='add-edit-input'>
             <label className='add-edit-customfile'>
              <input type='file' name="image" onChange={handleChange} />
              Upload Image
              </label>
              {imagename}
             </div>
             {editImageUrl && <div className="add-edit-existingimage"><p>Existing Image:</p><img src={`http://localhost:8080/`+editImageUrl} alt=""/> </div>}
             <input type='submit'/>
         </form>
        </div>
    )
}

export default AddEditArticle;