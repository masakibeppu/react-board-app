import styles from '../boards.module.scss';
import { useRouter } from 'next/router';
import Modal from "react-modal";
import { useState } from 'react';
import PostForm from '../../../component/PostForm';
import DeleteForm from '../../../component/DeleteForm';

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

export async function getStaticProps({ params }) {
  const req = await fetch(`https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app`)
  const pre_data = await req.json();
  const data = await pre_data.Items.find(val => val.id === params.id)
  
  return {
    props: {
      detail: data,
      layout: 'main'
    }
  }
}

export async function getStaticPaths() {
    const req = await fetch(`https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app`)
    const pre_data = await req.json();
    const data = await pre_data.Items.map(val => (val.id));

    const paths = data.map((detail_id) => {
      return {
        params : {
          id: detail_id,
        }
      }
    })

    return {
      paths,
      fallback: false
    }
}

export default function Home({ detail }) {
  const router = useRouter();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


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

    router.push('/boards');
  }

  return (
    <div className={styles.App}>
        <div className={styles.title}>投稿詳細</div>
        <div className={styles.displayPosts} >
          <div className="post">
            <h1 className={styles.postName}>{detail.title}</h1>
            <h1 className={styles.postContent}>{detail.content}</h1>
          </div>
          <div className={styles.buttonWrapper}>
              <button onClick={() => setEditModalIsOpen(true)}>編集</button>
              <button onClick={() => setDeleteModalIsOpen(true)}>削除</button>
          </div>
          <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
            <PostForm isOpen={setEditModalIsOpen} id={detail.id} title={detail.title} content={detail.content} label={"編集完了"}/>
          </Modal>
          <Modal isOpen={deleteModalIsOpen} style={customStyles} ariaHideApp={false}>
            <DeleteForm delete={() => handleClickDelete(detail.id)} cancel={() => setDeleteModalIsOpen(false)}/>
          </Modal>
        </div>
        <div
            className={styles.helpMessage}
            onClick={() => router.push('/boards')}
        >
            掲示板一覧に戻る
        </div>
    </div>
  );
}