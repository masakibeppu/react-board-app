import styles from './boards.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from "../../component/Account"
import PostForm from '../../component/PostForm';
import { Button } from "@mui/material";
import Modal from "react-modal";
import shortid from "shortid"
import DeleteForm from '../../component/DeleteForm';

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

export const getStaticProps = async () => {
  return {
    props: {
      layout: 'main'
    },
  };
};

export default function Home() {
    const { getSession } = useContext(AccountContext);
    const [posts, setPosts] = useState([])
    const router = useRouter();
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    // const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    //新規作成用のidを事前に作成し、モーダルに渡す。（今後修正）
    const uid = shortid.generate();

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
    // setDeleteModalIsOpen(false)
  }

  return (
    <div className={styles.App}>
      <div className={styles.title}>react 掲示板</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditModalIsOpen(true)}
      >
        投稿する
      </Button>
      <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
        <PostForm isOpen={setEditModalIsOpen} id={uid} label={"投稿"} />
      </Modal>
      <div className={styles.displayPosts} >
        {posts.map((post)=> (
          <div key={post.id} className="post">
            <h1 className={styles.postName}>{post.title}</h1>
            <h1 className={styles.postContent}>{post.content}</h1>
            <div className={styles.buttonWrapper}>
                <button onClick={() => handleClickDetail(post.id)}>詳細</button>
                {/* <button onClick={() => setDeleteModalIsOpen(true)}>削除</button> */}
            </div>
            {/* <Modal isOpen={deleteModalIsOpen} style={customStyles} ariaHideApp={false}>
              <DeleteForm delete={() => handleClickDelete(post.id)} cancel={() => setDeleteModalIsOpen(false)}/>
            </Modal> */}
          </div>
        ))}
      </div>
    </div>
  );
}
