import styles from '../boards.module.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect} from 'react';

export async function getStaticProps({ params }) {
  const req = await fetch(`https://picogbipw8.execute-api.ap-northeast-1.amazonaws.com/board-app/board-app`)
  const pre_data = await req.json();
  const data = await pre_data.Items.find(val => val.id === params.id)
  
  return {
    props: {
      detail: data,
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
  const { id } = router.query
  const handleClick = () => {
    router.push('/boards');
  }

  return (
    <div className={styles.App}>
        <div className={styles.title}>
          <h1>react 掲示板</h1>
        </div>
        <div className="post">
          <h1 className={styles.postName}>{detail.title}</h1>
          <h1 className={styles.postContent}>{detail.content}</h1>
        </div>
        <div
            className={styles.helpMessage}
            onClick={handleClick}
        >
            掲示板一覧に戻る
        </div>
    </div>
  );
}