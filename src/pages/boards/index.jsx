import styles from './boards.module.scss';
import { useSelector, useDispatch } from "react-redux"
import { addPost, deletePost } from '../../features/Posts';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from "../../component/Account"
import shortid from "shortid"


export default function Home() {
    const { getSession, logout } = useContext(AccountContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([])
    // const postList = useSelector((state) => state.posts.value);
    const router = useRouter();
  
    const dispatch = useDispatch();

    useEffect(() => {
      getSession()
          .then(session => {
              console.log("session: ", session)
          })
          .catch(err => {
              console.error(err)
              router.push('/login');
          })
    }, [])

    useEffect(() => {
        fetch('https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data.Items)
        })
    },[])

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

  const handleClickDetail = (id) => {
    router.push(`/boards/detail/${id}`);
  }

  const handleClickDelete = (id) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id": id
            })
    };
    fetch('https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app-delete', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

    setPosts(
        posts.filter((post, index) => (post.id !== id))
    )
  }

  return (
    <div className={styles.App}>
        <button onClick={logout}>ログアウト</button>
      <div className={styles.title}>
        <h1>react 掲示板</h1>
      </div>
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
      <div className={styles.displayPosts} >
        {posts.map((post)=> (
          <div key={post.id} className="post">
            <h1 className={styles.postName}>{post.title}</h1>
            <h1 className={styles.postContent}>{post.content}</h1>
            <div className={styles.buttonWrapper}>
                <button onClick={() => handleClickDetail(post.id)}>詳細</button>
                <button onClick={() => handleClickDelete(post.id)}>削除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
