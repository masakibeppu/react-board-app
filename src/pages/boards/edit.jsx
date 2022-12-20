import styles from './edit.module.scss';
import {useSelector, useDispatch} from "react-redux"
import { addPost, deletePost } from '../../features/Posts';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const postList = useSelector((state) => state.posts.value);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addPost(
      {
        id: postList.length,
        name: name,
        content: content
      }
    ))

    setName("");
    setContent("");
  }

  const handleClickBoards = () => {
    router.push('/boards');
  }
  const handleClickDetail = (id) => {
    router.push(`/boards/detail/${id}`);
  }

  return (
    <div className={styles.App}>
      <div className={styles.title}>
        <h1>react-redux掲示板</h1>
      </div>
      <div className={styles.addPost}>
        <input 
          type="text" 
          placeholder='お名前' 
          onChange={(e) => setName(e.target.value)}
          value={name}
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
      <div className={styles.displayPosts} >
        {postList.map((post)=> (
          <div key={post.id} className="post">
            <h1 className={styles.postName}>{post.name}</h1>
            <h1 className={styles.postContent}>{post.content}</h1>
            <button onClick={() => handleClickDetail(post.id)}>詳細</button>
            <button onClick={() => dispatch(deletePost({id: post.id}))}>削除</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleClickBoards}>画面移動</button>
      </div>
    </div>
  );
}