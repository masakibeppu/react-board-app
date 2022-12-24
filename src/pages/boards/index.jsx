import styles from './boards.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from "../../component/Account"
import PostForm from '../../component/PostForm';

export default function Home() {
    const { getSession } = useContext(AccountContext);
    const [posts, setPosts] = useState([])
    const router = useRouter();

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
    },[posts])

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
        posts.filter((post) => (post.id !== id))
    )
  }

  return (
    <div className={styles.App}>
      <div className={styles.title}>
        <h1>react 掲示板</h1>
      </div>
      <PostForm/>
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
