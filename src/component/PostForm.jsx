import styles from './PostForm.module.scss';
import { useState } from 'react';
import shortid from "shortid"

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([])

const handleClick = () => {
  const uid = shortid.generate();
  const AddData = {
      "id": uid,
      "title": title,
      "content": content
      }
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(AddData)
  };
  fetch('https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

  setTitle("");
  setContent("");
  setPosts([...posts, AddData])
}

    return (
        <div className={styles.addPost}>
          <input 
            type="text" 
            placeholder='タイトル' 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input 
            type="text" 
            placeholder='投稿内容'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            />
          <button onClick={() => handleClick()}>投稿</button>
          <hr/>
        </div>
    )
}

export default PostForm;