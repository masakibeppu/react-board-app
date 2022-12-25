import styles from './PostForm.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const PostForm = (props) => {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [id, setId] = useState(props.id);
  const [posts, setPosts] = useState([])
  const router = useRouter();

  const handleClick = (props) => {
    const AddData = {
        "id": id,
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
    setPosts([...posts, AddData]);
    router.push(`/boards`);
  }


  return (
      <div className={styles.addPost}>
        <div className={styles.title}>投稿フォーム</div>
        <TextField 
            label="タイトルを入力してください" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            margin = 'normal'
            multiline
            rows={1}    
        />
        <TextField 
            label="本文を入力してください" 
            onChange={(e) => setContent(e.target.value)}
            value={content}
            variant="outlined"
            fullWidth
            margin = 'normal'
            multiline
            rows={4}                        
        />
        <Button 
          disabled={!title || !content}
          variant="contained" 
          onClick={() => {
            handleClick()
            props.isOpen(false)
          }}
        >
          {props.label}
        </Button>
        <Button 
          variant="contained" 
          onClick={() => props.isOpen(false)}
        >
          モーダルを閉じる
        </Button>
      </div>
  )
}

export default PostForm;